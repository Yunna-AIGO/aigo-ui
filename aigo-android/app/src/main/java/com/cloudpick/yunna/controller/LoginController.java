package com.cloudpick.yunna.controller;

import android.content.Context;
import android.support.annotation.Nullable;

import com.cloudpick.yunna.model.Coupon;
import com.cloudpick.yunna.model.User;
import com.cloudpick.yunna.R;
import com.cloudpick.yunna.utils.Constants;
import com.cloudpick.yunna.utils.MapUtils;
import com.cloudpick.yunna.utils.Tools;
import com.cloudpick.yunna.utils.enums.CouponType;
import com.cloudpick.yunna.utils.http.Callback;
import com.cloudpick.yunna.utils.http.Requests;
import com.cloudpick.yunna.utils.http.Response;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by maxwell on 17-12-18.
 */

public class LoginController extends BaseController {

    public LoginController(Context context){
        super(context);
    }

    /**
     * 发送手机验证码，如果没有图片验证码的话，captchaValue一定要传入null
     * @param mobile
     * @param captchaValue
     * @return
     */
    public SendSMSResult sendSMS(String mobile, @Nullable String captchaValue){
        SendSMSResult result = new SendSMSResult();
        try{
            Map<String, String> data = new HashMap<>();
            data.put("mobile", mobile);
            if(captchaValue != null){
                data.put("captchaValue", captchaValue);
            }
            Response<Map<String, Object>> resp = Requests.post(Constants.URL_SENDSMS_V2, data, Response.class );
            if(resp.isSuccess()){
                result.setSendSMSError(SendSMSError.NONE);
            }else{
                String captchaUrl = MapUtils.getAsString(resp.getData(), Constants.KEY_CAPTCHA_URL, "");
                result.setCaptchaUrl(captchaUrl);
                if(resp.getCode().equals(SendSMSError.CAPTCHA_NEEDED.getName())){
                    result.setSendSMSError(SendSMSError.CAPTCHA_NEEDED);
                }else if(resp.getCode().equals(SendSMSError.CAPTCHA_ERROR.getName())){
                    result.setSendSMSError(SendSMSError.CAPTCHA_ERROR);
                    showMessage(R.string.message_image_captcha_error);
                }else{
                    showMessage(resp.getMessage());
                }
            }
        }catch(Exception ex){
            ex.printStackTrace();
            showMessage(R.string.network_error);
            result.setSendSMSError(SendSMSError.NETWORK_ERROR);
        }
        return result;
    }

    public void login(String mobile, String smsCode, final loginAction action){
        try{
            Map<String, String> data = new HashMap<>();
            data.put("mobile", mobile);
            data.put("smsCode", smsCode);
            Requests.postAsync(Constants.URL_ENTRY, data,
                    new Callback<Response<Map<String, Object>>>(){
                        @Override
                        public void error(Exception e){
                            e.printStackTrace();
                            handler.post(()->{
                                action.failure(context.getResources().getString(R.string.network_error));
                            });
                        }
                        @Override
                        public void ok(Response<Map<String, Object>> r){
                            if(r.isSuccess()){
                                try{
                                    //save user info
                                    String userId = r.getData().get(Constants.KEY_USER_ID).toString();
                                    String token = r.getData().get(Constants.KEY_TOKEN).toString();
                                    User.getUser().saveInfo(userId, token, mobile);
                                }catch (Exception e){
                                    handler.post(()->{
                                        action.failure(context.getResources().getString(R.string.login_success_failure));
                                    });
                                    return;
                                }
                                boolean hasSignedPayment = PaymentController.hasSignedPayment();
                                boolean hasCoupon = MapUtils.getAsBoolean(r.getData(), Constants.KEY_HAS_COUPON, false);
                                ArrayList<Coupon> coupons = hasCoupon? getCouponList(): null;
                                handler.post(()->{
                                    action.ok(hasSignedPayment, hasCoupon, coupons);
                                });
                            }else{
                                handler.post(()->{
                                    action.failure(context.getResources().getText(R.string.login_success_failure) + ":" + r.getMessage());
                                });
                            }
                        }
                    });
        }catch(Exception ex){
            ex.printStackTrace();
        }
    }

    public interface loginAction {
        void failure(String msg);
        void ok(boolean hasSignedPayment, boolean isCoupon, ArrayList<Coupon> coupons);
    }

    public boolean isValidMobile(String mobile){
        Pattern p = Pattern.compile("^1[0-9]{10}$");
        Matcher m = p.matcher(mobile);
        return m.matches();
    }

    public boolean isValidCaptcha(String captcha){
        return captcha.length() == 6;
    }

    public String refreshCaptcha(String mobile){
        try{
            Map<String, String> data = new HashMap<>();
            data.put("mobile", mobile);
            Response<Map<String, Object>> resp = Requests.post(Constants.URL_REFRESH_CAPTCHA, data, Response.class );
            if(resp.isSuccess()){
                return MapUtils.getAsString(resp.getData(), Constants.KEY_CAPTCHA_URL, "");
            }else{
                showMessage(resp.getMessage());
            }
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return "";
    }

    public class SendSMSResult{
        private SendSMSError sendSMSError;
        private String captchaUrl;

        public SendSMSResult(){
        }

        public SendSMSError getSendSMSError() {
            return sendSMSError;
        }

        public void setSendSMSError(SendSMSError sendSMSError) {
            this.sendSMSError = sendSMSError;
        }

        public String getCaptchaUrl() {
            return captchaUrl;
        }

        public void setCaptchaUrl(String captchaUrl) {
            this.captchaUrl = captchaUrl;
        }
    }

    public enum SendSMSError {
        NETWORK_ERROR("NETWORK_ERROR", "NETWORK_ERROR"),//network error
        CAPTCHA_NEEDED("CAPTCHA_NEEDED", "LGN3001003"),//captcha needed
        CAPTCHA_ERROR("CAPTCHA_ERROR", "LGN3001004"),//captcha error
        NONE("NONE", "NONE");//no error

        private final String code;
        private final String name;

        SendSMSError(String code, String name){
            this.code = code;
            this.name = name;
        }

        public String getCode(){
            return code;
        }

        public String getName(){
            return this.name;
        }
    }


    private ArrayList<Coupon> getCouponList(){
        CouponController c = new CouponController(context);
        return c.getCoupons(CouponType.CASH_DISCOUNT);
    }
}
