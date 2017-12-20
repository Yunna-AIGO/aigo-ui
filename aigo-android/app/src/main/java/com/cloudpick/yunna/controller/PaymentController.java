package com.cloudpick.yunna.controller;

import android.content.Context;
import android.net.Uri;

import com.cloudpick.yunna.model.User;
import com.cloudpick.yunna.ui.R;
import com.cloudpick.yunna.utils.Constants;
import com.cloudpick.yunna.utils.Tools;
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

    public PaymentController(Context context){
        super(context);
    }

    public void bindAlipay(final bindAlipayAction action){
        if(!Tools.isAppInstalled(context, Constants.PACKAGE_NAME_ALIPAY)){
            handler.post(()->{
                action.failure(context.getResources().getString(R.string.message_alipay_not_installed));
            });
            return;
        }
        Map<String, String> data = new HashMap<>();
        data.put("userId", User.getUser().getUserId());
        data.put("terminalChannel", TerminalChannel.ALIPAYAPP.getValue());
        data.put("thirdType", ThirdType.ALIPAY.getValue());
        try{
            Response<Map<String, String>> resp = Requests.post(Constants.URL_DUT_SIGN, data, Response.class);
            if(resp.isSuccess()){
                String signRequestInfo = resp.getData().get(Constants.KEY_SIGN_REQUEST_INFO);
                signRequestInfo = URLEncoder.encode(signRequestInfo, "utf-8");
                Uri uri = Uri.parse(Constants.ALIPAY_URL_PREFIX + signRequestInfo);
                handler.post(()->{action.ok(uri);});
            }else{
                handler.post(()->{
                    action.failure(resp.getMessage(context.getResources().getString(R.string.message_alipay_sign_failure)));
                });
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            handler.post(()->{
                action.failure(context.getResources().getString(R.string.message_alipay_unsign_failure));
            });
        }
    }

    public interface bindAlipayAction{
        void failure(String msg);
        void ok(Uri uri);
    }

    public void unBindAlipay(final unBindAlipayAction action){
        Map<String, String> data = new HashMap<>();
        data.put("userId", User.getUser().getUserId());
        data.put("thirdType", ThirdType.ALIPAY.getValue());
        try{
            Response<Map<String, String>> resp = Requests.post(Constants.URL_DUT_UNSIGN, data, Response.class);
            if(resp.isSuccess()){
                handler.post(()->{
                    action.ok(context.getResources().getString(R.string.message_alipay_unsign_success));
                });
            }else{
                handler.post(()->{
                    action.failure(resp.getMessage(context.getResources().getString(R.string.message_alipay_unsign_failure)));
                });
            }
        }catch(Exception e){
            System.out.println(e.getMessage());
            handler.post(()->{
                action.failure(context.getResources().getString(R.string.message_alipay_unsign_failure));
            });
        }
    }

    public interface unBindAlipayAction{
        void failure(String msg);
        void ok(String msg);
    }


    public static boolean isBindingPayment(ThirdType thirdType){
        String url = String.format(Constants.URL_DUT_QUERY, User.getUser().getUserId(), thirdType.getValue());
        try{
            Response<Map<String, Object>> resp =  Requests.get(url, Response.class);
            return resp.isSuccess() && (boolean)resp.getData().get(Constants.KEY_SIGNED) &&
                    resp.getData().get(Constants.KEY_AGREEMENT_STATUS).toString().equals(AgreementStatus.NORMAL.getValue());
        }catch(Exception e){
            return false;
        }
    }
}
