package com.cloudpick.yunna.controller;

import android.content.Context;

import com.cloudpick.yunna.model.User;
import com.cloudpick.yunna.R;
import com.cloudpick.yunna.utils.Constants;
import com.cloudpick.yunna.utils.enums.ThirdType;
import com.cloudpick.yunna.utils.http.Callback;
import com.cloudpick.yunna.utils.http.Requests;
import com.cloudpick.yunna.utils.http.Response;

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

    public SendSMSResult sendSMS(String mobile){
        SendSMSResult result = new SendSMSResult();
        try{
            Map<String, String> queryParams = new HashMap<>();
            queryParams.put("mobile", mobile);
            Response<Map<String, Object>> resp = Requests.get(Constants.URL_SENDSMS, queryParams, Response.class );
            result.setSuccess(resp.isSuccess());
            if(resp.isSuccess()){
                result.setMessage(context.getResources().getString(R.string.sms_send_success));
            }else{
                result.setMessage(context.getResources().getString(R.string.sms_send_failure) + ":" + resp.getMessage());
            }
        }catch(Exception ex){
            System.out.println(ex.getMessage());
            result.setSuccess(false);
            result.setMessage(context.getResources().getString(R.string.network_error));
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
                            System.out.println(e.getMessage());
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
                                    User.getUser().saveToken(userId, token);
                                }catch (Exception e){
                                    handler.post(()->{
                                        action.failure(context.getResources().getString(R.string.login_success_failure));
                                    });
                                    return;
                                }
                                boolean hasSignedPayment = PaymentController.hasSignedPayment();
                                handler.post(()->{
                                    boolean hasCoupon = false;
                                    String couponAmount = "";
                                    try{
                                        hasCoupon = (boolean)r.getData().get(Constants.KEY_HAS_COUPON);
                                        couponAmount = r.getData().get(Constants.KEY_COUPON_AMOUNT).toString();
                                    }catch (Exception e){
                                    }
                                    action.ok(hasSignedPayment, hasCoupon, couponAmount);
                                });
                            }else{
                                handler.post(()->{
                                    action.failure(context.getResources().getText(R.string.login_success_failure) + ":" + r.getMessage());
                                });
                            }
                        }
                    });
        }catch(Exception ex){
            System.out.println(ex.getMessage());
        }
    }

    public interface loginAction {
        void failure(String msg);
        void ok(boolean hasSignedPayment, boolean isCoupon, String couponAmt);
    }

    public boolean isValidMobile(String mobile){
        Pattern p = Pattern.compile("^1[0-9]{10}$");
        Matcher m = p.matcher(mobile);
        return m.matches();
    }

    public boolean isValidCaptcha(String captcha){
        return captcha.length() == 6;
    }

    public class SendSMSResult{
        private boolean success;
        private String message;

        public SendSMSResult(){
        }

        public boolean isSuccess() {
            return success;
        }

        public String getMessage() {
            return message;
        }

        public void setSuccess(boolean success) {
            this.success = success;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
