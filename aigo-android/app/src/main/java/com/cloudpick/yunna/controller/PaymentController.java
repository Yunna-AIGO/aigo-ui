package com.cloudpick.yunna.controller;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;

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

import java.net.URLEncoder;
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
     * 是否已签约指定的第三方免密支付
     * @param thirdType
     * @return
     */
    public static boolean isSignedPayment(ThirdType thirdType){
        Map<String, String> queryParams = new HashMap<>();
        queryParams.put("userId", User.getUser().getUserId());
        queryParams.put("thirdType", thirdType.getCode());
        boolean rslt = false;
        try{
            Response<Map<String, Object>> resp = Requests.get(Constants.URL_DUT_QUERY, queryParams, Response.class);
            rslt = resp.isSuccess() && (boolean)resp.getData().get(Constants.KEY_SIGNED) &&
                    resp.getData().get(Constants.KEY_AGREEMENT_STATUS).toString().equals(AgreementStatus.NORMAL.getValue());
        }catch(Exception e){
            e.printStackTrace();
        }
        Log.d(TAG, String.format("Third type - %s  signed - %s", thirdType.getCode(), rslt));
        return rslt;
    }

    /**
     * 是否已经绑定过至少一种免密支付方式
     * @return
     */
    public static boolean hasSignedPayment(){
        if(isSignedPayment(ThirdType.ALIPAY)){
            return true;
        }
        if(isSignedPayment(ThirdType.WECHAT)){
            return true;
        }
        return false;
    }
}
