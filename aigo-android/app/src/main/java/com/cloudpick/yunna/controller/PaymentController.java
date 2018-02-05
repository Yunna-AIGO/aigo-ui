package com.cloudpick.yunna.controller;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;

import com.cloudpick.yunna.model.ThirdTypeSignInfo;
import com.cloudpick.yunna.model.User;
import com.cloudpick.yunna.R;
import com.cloudpick.yunna.utils.Constants;
import com.cloudpick.yunna.utils.Tools;
import com.cloudpick.yunna.utils.WXApi;
import com.cloudpick.yunna.utils.enums.AgreementStatus;
import com.cloudpick.yunna.utils.enums.TerminalChannel;
import com.cloudpick.yunna.utils.enums.ThirdType;
import com.cloudpick.yunna.utils.http.Requests;
import com.cloudpick.yunna.utils.http.Response;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;



/**
 * Created by maxwell on 17-12-19.
 */

public class PaymentController extends BaseController {

    private final static String TAG = "CloudPick";

    public PaymentController(Context context){
        super(context);
    }

    /**
     * 签约支付宝
     */
    public void signAlipay(){
        ThirdType thirdType = ThirdType.ALIPAY;
        if(!Tools.isAppInstalled(context, Constants.PACKAGE_NAME_ALIPAY)){
            handler.post(()->{
                Tools.ToastMessage(context, context.getString(R.string.message_pay_client_not_installed, thirdType.getName()));
            });
            return;
        }
        Map<String, String> data = new HashMap<>();
        data.put("userId", User.getUser().getUserId());
        data.put("terminalChannel", TerminalChannel.ALIPAYAPP.getCode());
        data.put("thirdType", thirdType.getCode());
        try{
            Response<Map<String, String>> resp = Requests.post(Constants.URL_DUT_SIGN, data, Response.class);
            if(resp.isSuccess()){
                String signRequestInfo = resp.getData().get(Constants.KEY_SIGN_REQUEST_INFO);
                signRequestInfo = URLEncoder.encode(signRequestInfo, "utf-8");
                Uri uri = Uri.parse(Constants.ALIPAY_URL_PREFIX + signRequestInfo);
                Intent intent = new Intent(Intent.ACTION_VIEW, uri);
                context.startActivity(intent);
            }else{
                handler.post(()->{
                    Tools.ToastMessage(context, context.getString(R.string.message_third_type_sign_failure, thirdType.getName()));
                });
            }
        }catch (Exception e){
            e.printStackTrace();
            handler.post(()->{
                Tools.ToastMessage(context, context.getString(R.string.message_third_type_unsign_failure, thirdType.getName()));
            });
        }
    }

    /**
     * 签约微信
     */
    public void signWechat(){
        ThirdType thirdType = ThirdType.WECHAT;
        if(!WXApi.getInstance(context).isAppInstalled()){
            handler.post(()->{
                Tools.ToastMessage(context, context.getString(R.string.message_pay_client_not_installed, thirdType.getName()));
            });
            return;
        }
        Map<String, String> data = new HashMap<>();
        data.put("userId", User.getUser().getUserId());
        data.put("terminalChannel", TerminalChannel.WECHAT.getCode());
        data.put("thirdType", thirdType.getCode());
        try{
            Response<Map<String, String>> resp = Requests.post(Constants.URL_DUT_SIGN, data, Response.class);
            if(resp.isSuccess()){
                String signRequestInfo = resp.getData().get(Constants.KEY_SIGN_REQUEST_INFO);
                WXApi.getInstance(context).sign(signRequestInfo);
            }else{
                handler.post(()->{
                    Tools.ToastMessage(context, context.getString(R.string.message_third_type_sign_failure, thirdType.getName()));
                });
            }
        }catch (Exception e){
            e.printStackTrace();
            handler.post(()->{
                Tools.ToastMessage(context, context.getString(R.string.message_third_type_unsign_failure, thirdType.getName()));
            });
        }
    }

    public boolean unsignPayment(ThirdType thirdType){
        Map<String, String> data = new HashMap<>();
        data.put("userId", User.getUser().getUserId());
        data.put("thirdType", thirdType.getCode());
        try{
            Response<Map<String, String>> resp = Requests.post(Constants.URL_DUT_UNSIGN, data, Response.class);
            if(resp.isSuccess()){
                handler.post(()->{
                    Tools.ToastMessage(context, context.getString(R.string.message_third_type_unsign_success, thirdType.getName()));
                });
                return true;
            }else{
                handler.post(()->{
                    Tools.ToastMessage(context, context.getString(R.string.message_third_type_unsign_failure, thirdType.getName()));
                });
            }
        }catch(Exception e){
            e.printStackTrace();
            handler.post(()->{
                Tools.ToastMessage(context, context.getString(R.string.message_third_type_unsign_failure, thirdType.getName()));
            });
        }
        return false;
    }

    /**
     * 获取签约状态
     * @return
     */
    public static Map<ThirdType, Boolean> getSignedStatus(){
        Map<ThirdType, Boolean> ret = new HashMap<>();
        ret.put(ThirdType.ALIPAY, false);
        ret.put(ThirdType.WECHAT, false);
        try{
            String url = String.format(Constants.URL_DUT_LIST, User.getUser().getUserId());
            Type objectType = new TypeToken<Response<ArrayList<ThirdTypeSignInfo>>>(){}.getType();
            Response<ArrayList<ThirdTypeSignInfo>> resp = Requests.get(url, null, objectType);
            if(resp.isSuccess()){
                for(ThirdTypeSignInfo info: resp.getData()){
                    ret.put(info.getThirdType(), info.isSigned());
                }
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return ret;
    }

    /**
     * 是否已经绑定过至少一种免密支付方式
     * @return
     */
    public static boolean hasSignedPayment(){
        Map<ThirdType, Boolean> signStatus = getSignedStatus();
        for (Boolean value : signStatus.values()) {
            if(value == true){
                return true;
            }
        }
        return false;
    }
}
