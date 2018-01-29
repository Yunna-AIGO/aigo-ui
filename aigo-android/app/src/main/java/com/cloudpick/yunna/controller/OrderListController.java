package com.cloudpick.yunna.controller;

import android.app.Activity;
import android.content.Context;
import android.util.Log;

import com.alipay.sdk.app.PayTask;
import com.cloudpick.yunna.model.Coupon;
import com.cloudpick.yunna.model.Order;
import com.cloudpick.yunna.model.User;
import com.cloudpick.yunna.R;
import com.cloudpick.yunna.utils.Constants;
import com.cloudpick.yunna.utils.Tools;
import com.cloudpick.yunna.utils.WXApi;
import com.cloudpick.yunna.utils.enums.AlipayResultStatus;
import com.cloudpick.yunna.utils.enums.PayType;
import com.cloudpick.yunna.utils.http.Callback;
import com.cloudpick.yunna.utils.http.Requests;
import com.cloudpick.yunna.utils.http.Response;
import com.cloudpick.yunna.wxapi.WXPayEntryActivity;
import com.google.gson.reflect.TypeToken;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


/**
 * Created by maxwell on 17-12-20.
 */

public class OrderListController extends BaseController {

    private boolean isPageEnd = false;
    private int pageNum = 0;

    //正在处理支付
    private boolean payHandling = false;

    public OrderListController(Context context){
        super(context);
    }


    public ArrayList<Order> getOrders(){
        try{
            if(isPageEnd){
                return new ArrayList<Order>();
            }
            Map<String,String> queryParams = new HashMap<>();
            queryParams.put("pageNum", pageNum + "");
            queryParams.put("pageSize", Constants.ORDER_PAGE_SIZE + "");
            String url = String.format(Constants.URL_ORDERS, User.getUser().getUserId());
            Type objectType = new TypeToken<Response<ArrayList<Order>>>(){}.getType();
            Response<ArrayList<Order>> resp = Requests.get(url, queryParams, objectType);
            if(resp.isSuccess()){
                ArrayList<Order> orderList = resp.getData();
                isPageEnd = orderList.size() < Constants.ORDER_PAGE_SIZE;
                if(orderList.size() == Constants.ORDER_PAGE_SIZE){
                    pageNum += 1;
                }
                return orderList;
            }else{
                return new ArrayList<Order>();
            }
        }catch(IOException e){
            System.out.println(e.getMessage());
            return null;
        }
    }

    public String getCouponAmount(){
        try{
            String url = String.format(Constants.URL_COUPON, User.getUser().getUserId());
            Type objectType = new TypeToken<Response<ArrayList<Coupon>>>(){}.getType();
            Response<ArrayList<Coupon>> resp = Requests.get(url, null, objectType);
            if(!resp.isSuccess()){
                return "";
            }
            double couponAmount = 0;
            for (Coupon coupon : resp.getData()) {
                couponAmount += coupon.getCouponAmount();
            }
            if(couponAmount == 0){
                return "";
            }else{
                return String.format("%.2f", couponAmount);
            }
        }catch(IOException e){
            System.out.println(e.getMessage());
            return "";
        }
    }

    public void resetPageInfo(){
        isPageEnd = false;
        pageNum = 0;
    }

    public void payOrder(Order order, PayType payType, Activity activity, PayAction action){
        //Tools.hasNetwork(context, true);
        switch (payType){
            case ALIPAY:
                payByAlipay(order, activity, action);
                break;
            case WECHAT_PAY:
                payByWechat(order, action);
                break;
            case CP_PAY:
                break;
        }
    }

    private void payByAlipay(Order order, Activity activity, PayAction action){
        if(payHandling){
            handler.post(()->{
                action.terminate(context.getResources().getString(R.string.message_in_process));
            });
            return;
        }
        if(!Tools.isAppInstalled(context, Constants.PACKAGE_NAME_ALIPAY)){
            handler.post(()->{
                action.terminate(context.getResources().getString(R.string.message_alipay_not_installed));
            });
            return;
        }
        payHandling = true;
        Map<String, String> data = new HashMap<>();
        data.put("userId", User.getUser().getUserId());
        data.put("orderId", order.getOrderId());
        data.put("payType", PayType.ALIPAY.getCode());
        Requests.postAsync(Constants.URL_TRADE_PAY, data, new Callback<Response<TradeInfo>>() {
            @Override
            public void error(Exception e) {
                payHandling = false;
                System.out.println(e.getMessage());
                action.terminate(context.getResources().getString(R.string.network_error));
            }

            @Override
            public void ok(Response<TradeInfo> r) {
                payHandling = false;
                if(r.isSuccess()){
                    new Thread(()->{
                        PayTask alipay = new PayTask(activity);
                        Map<String, String> rslt = alipay.payV2(r.getData().getOrderInfo(), true);
                        handler.post(()->{
                            if(rslt.get(Constants.KEY_ALIPAY_RESULT_STATUS).equals(
                                    AlipayResultStatus.SUCCEEDED.getCode())){
                                action.ok();
                            }else{
                                action.failure(rslt.get(Constants.KEY_ALIPAY_RESULT_MEMO));
                            }
                        });
                    }).start();
                }else{
                    handler.post(()->{
                        action.terminate(r.getMessage());
                    });
                }
            }
        });
    }

    private void payByWechat(Order order, PayAction action){
        //TODO 微信支付基本完成。在返回app时的逻辑需要优化
        if(payHandling){
            handler.post(()->{
                action.terminate(context.getResources().getString(R.string.message_in_process));
            });
            return;
        }
        if(!WXApi.getInstance(context).isAppInstalled()){
            handler.post(()->{
                action.terminate(context.getResources().getString(R.string.message_wechat_not_installed));
            });
            return;
        }
        payHandling = true;
        Map<String, String> data = new HashMap<>();
        data.put("userId", User.getUser().getUserId());
        data.put("orderId", order.getOrderId());
        data.put("payType", PayType.WECHAT_PAY.getCode());
        Requests.postAsync(Constants.URL_TRADE_PAY, data, new Callback<Response<WXApi.TradeInfo>>() {
            @Override
            public void error(Exception e) {
                payHandling = false;
                System.out.println(e.getMessage());
                action.terminate(context.getResources().getString(R.string.network_error));
            }

            @Override
            public void ok(Response<WXApi.TradeInfo> r) {
                payHandling = false;
                if(r.isSuccess()){
                    new Thread(()->{
                        //set response
                        WXPayEntryActivity.wxPayResp = (errCode)->{
                            handler.post(()->{
                                action.ok();
                            });
                        };
                        WXApi.getInstance(context).pay(r.getData());
                    }).start();
                }else{
                    handler.post(()->{
                        action.terminate(r.getMessage());
                    });
                }
            }
        });

    }

    public interface PayAction{
        void terminate(String msg);//终止操作;场景：后台未生成交易单号就退出交易
        void failure(String msg);
        void ok();
    }


    public class TradeInfo{
        private String orderInfo;
        private String orderId;
        private String transId;

        public String getOrderInfo() {
            return orderInfo;
        }

        public String getOrderId() {
            return orderId;
        }

        public String getTransId() {
            return transId;
        }

        public TradeInfo(){
        }
    }


}
