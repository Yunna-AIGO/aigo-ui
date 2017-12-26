package com.cloudpick.yunna.controller;

import android.app.Activity;
import android.content.Context;

import com.alipay.sdk.app.PayTask;
import com.cloudpick.yunna.model.Order;
import com.cloudpick.yunna.model.User;
import com.cloudpick.yunna.ui.R;
import com.cloudpick.yunna.utils.Constants;
import com.cloudpick.yunna.utils.Tools;
import com.cloudpick.yunna.utils.enums.AlipayResultStatus;
import com.cloudpick.yunna.utils.enums.PayType;
import com.cloudpick.yunna.utils.http.Callback;
import com.cloudpick.yunna.utils.http.Requests;
import com.cloudpick.yunna.utils.http.Response;
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
                break;
            case CP_PAY:
                break;
        }
    }

    private void payByAlipay(Order order, Activity activity, PayAction action){
        if(payHandling){
            handler.post(()->{
                action.failure("支付处理中...");
            });
            return;
        }
        if(!Tools.isAppInstalled(context, Constants.PACKAGE_NAME_ALIPAY)){
            handler.post(()->{
                action.failure(context.getResources().getString(R.string.message_alipay_not_installed));
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
                System.out.println(e.getMessage());
                payHandling = false;
            }

            @Override
            public void ok(Response<TradeInfo> r) {
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
                        action.failure(r.getMessage());
                    });
                }
                payHandling = false;
            }
        });
    }

    public interface PayAction{
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
