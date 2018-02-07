package com.cloudpick.yunna.controller;

import android.app.Activity;
import android.content.Context;
import android.text.TextUtils;

import com.alipay.sdk.app.PayTask;
import com.cloudpick.yunna.model.Coupon;
import com.cloudpick.yunna.model.Order;
import com.cloudpick.yunna.model.TradeInfo;
import com.cloudpick.yunna.model.User;
import com.cloudpick.yunna.R;
import com.cloudpick.yunna.utils.Constants;
import com.cloudpick.yunna.utils.MapUtils;
import com.cloudpick.yunna.utils.Tools;
import com.cloudpick.yunna.utils.WXApi;
import com.cloudpick.yunna.utils.enums.PayType;
import com.cloudpick.yunna.utils.enums.TransStatus;
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
    private static final String TAG = "CloudPick";
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
        if(!Tools.isAppInstalled(context, Constants.PACKAGE_NAME_ALIPAY)){
            showMessage(context.getString(R.string.message_pay_client_not_installed, PayType.ALIPAY.getName()));
            return;
        }
        try{
            Map<String, String> data = getRequestData(order.getOrderId(), PayType.ALIPAY.getCode());
            Type objectType = new TypeToken<Response<TradeInfo>>(){}.getType();
            Response<TradeInfo> resp = Requests.post(Constants.URL_TRADE_PAY, data, objectType);
            if(!resp.isSuccess()){
                showMessage(resp.getMessage());
                return;
            }
            PayTask alipay = new PayTask(activity);
            Map<String, String> rslt = alipay.payV2(resp.getData().getOrderInfo(), true);
            handler.post(()-> action.finish());
            //支付宝返回后，开启一个任务循环查询订单状态
            queryOrderStatus(resp.getData().getTransId(), 1, action);
        }
        catch (IOException ioex){
            ioex.printStackTrace();
            showMessage(context.getString(R.string.network_error));
        }catch (Exception ex){
            ex.printStackTrace();
            showMessage(context.getString(R.string.message_pay_fail));
        }
    }

    private void payByWechat(Order order, PayAction action){
        if(!WXApi.getInstance(context).isAppInstalled()){
            showMessage(context.getString(R.string.message_pay_client_not_installed, PayType.WECHAT_PAY.getName()));
            return;
        }
        try{
            Map<String, String> data = getRequestData(order.getOrderId(), PayType.WECHAT_PAY.getCode());
            Type objectType = new TypeToken<Response<TradeInfo>>(){}.getType();
            Response<TradeInfo> resp = Requests.post(Constants.URL_TRADE_PAY, data, objectType);
            if(!resp.isSuccess()){
                showMessage(resp.getMessage());
                return;
            }
            WXPayEntryActivity.wxPayResp = (errCode)->{
                //返回后，开启一个任务循环查询订单状态
                handler.post(() -> action.finish());
                queryOrderStatus(resp.getData().getTransId(), 1, action);
            };
            WXApi.getInstance(context).pay(resp.getData());
        }catch (IOException ioex){
            ioex.printStackTrace();
            showMessage(context.getString(R.string.network_error));
        }catch (Exception ex){
            ex.printStackTrace();
            showMessage(context.getString(R.string.message_pay_fail));
        }
    }

    /**
     * 根据times延迟查询订单信息 times分别未1，2，4，8秒
     * @param tradeId
     * @param times
     */
    private void queryOrderStatus(String tradeId, int times, PayAction action){
        Tools.Sleep(times * 1000);
        String url = String.format(Constants.TRADE_INFO, tradeId);
        Requests.getAsync(url, null,
                new Callback<Response<Map<String, String>>>() {
                    @Override
                    public void error(Exception e) {
                        e.printStackTrace();
                        if(times < 8){
                            queryOrderStatus(tradeId, times * 2, action);
                        }
                    }
                    @Override
                    public void ok(Response<Map<String, String>> r) {
                        if(r.isSuccess()){
                            String status = MapUtils.getAsString(r.getData(), Constants.KEY_TRADE_STATUS, "");
                            if(!TextUtils.isEmpty(status)){
                                showMessage(TransStatus.isSuccess(status)?
                                        R.string.message_pay_success:R.string.message_pay_fail);
                                handler.post(()->action.finish());
                                return;
                            }
                        }
                        if(times < 8){
                            queryOrderStatus(tradeId, times * 2, action);
                        }
                    }
                });
    }

    private Map<String, String> getRequestData(String orderId, String payType){
        Map<String, String> data = new HashMap<>();
        data.put(Constants.KEY_USER_ID, User.getUser().getUserId());
        data.put(Constants.KEY_ORDER_ID, orderId);
        data.put(Constants.KEY_PAY_TYPE, payType);
        return data;
    }

    public interface PayAction{
        void finish();
    }
}
