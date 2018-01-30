package com.cloudpick.yunna.utils;

import android.content.Context;
import android.content.ContextWrapper;
import android.util.Log;

import com.tencent.mm.opensdk.modelbiz.OpenWebview;
import com.tencent.mm.opensdk.modelpay.PayReq;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;

/**
 * Created by maxwell on 18-1-26.
 */

public class WXApi extends ContextWrapper {

    private static final String TAG = "CloudPick";
    public static final int PAY_RESULT_CANCELED = -2;
    public static final int PAY_RESULT_ERROR = -1;
    public static final int PAY_RESULT_SUCCESSED = 0;

    private volatile static WXApi instance = null;

    public static WXApi getInstance(Context ctx){
        if(instance == null){
            synchronized(WXApi.class){
                if(instance == null){
                    instance = new WXApi(ctx);
                }
            }
        }
        return instance;
    }

    private final String appId = "wx7e01d7abf18c5e11";
    private IWXAPI api;

    private WXApi(Context ctx){
        super(ctx);
        api = WXAPIFactory.createWXAPI(ctx, appId);
        //api.registerApp(appId);
    }

    public boolean isAppInstalled(){
        try{
            if(api.isWXAppInstalled() && api.isWXAppSupportAPI()) {
                return true;
            } else {
                return Tools.isAppInstalled(this, Constants.PACKAGE_NAME_WECHAT);
            }
        }catch (Exception ex){
            ex.printStackTrace();
            Log.d(TAG,  "check wechat installed error!");
            return false;
        }
    }

    public boolean pay(TradeInfo tradeInfo){
        PayReq request = new PayReq();
        request.appId = appId;
        request.partnerId = tradeInfo.partnerId;
        request.prepayId= tradeInfo.prepayId;
        request.packageValue = tradeInfo.wxPackage;
        request.nonceStr= tradeInfo.noncestr;
        request.timeStamp= tradeInfo.timestamp;
        request.sign= tradeInfo.sign;
        return api.sendReq(request);
    }

    public void sign(String signRequestInfo){
        OpenWebview.Req req = new OpenWebview.Req();
        req.url = signRequestInfo;
        api.sendReq(req);
    }



    public IWXAPI getApi(){
        return api;
    }


    public class TradeInfo{


        private String appId;
        private String noncestr;
        private String partnerId;
        private String prepayId;
        private String sign;
        private String timestamp;
        private String transId;
        private String wxPackage;

        public TradeInfo(){
        }
    }

}
