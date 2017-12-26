package com.cloudpick.yunna.controller;

import android.content.Context;

import com.cloudpick.yunna.model.Order;
import com.cloudpick.yunna.utils.Constants;
import com.cloudpick.yunna.utils.http.Callback;
import com.cloudpick.yunna.utils.http.Requests;
import com.cloudpick.yunna.utils.http.Response;

/**
 * Created by maxwell on 17-12-20.
 */

public class OrderDetailController extends BaseController {

    public OrderDetailController(Context context){
        super(context);
    }


    public void loadOrderDetail(String orderId, final loadOrderAction action){
        if(orderId.equals("")){
            handler.post(()->{action.failure();});
        }else{
            String url = String.format(Constants.URL_ORDER_INFO, orderId);
            Requests.getAsync(url, null, new Callback<Response<Order>>() {
                @Override
                public void error(Exception e) {
                    System.out.println(e.getMessage());
                    handler.post(()->{action.failure();});
                }
                @Override
                public void ok(Response<Order> r) {
                    if(r.isSuccess()){
                        handler.post(()->{action.ok(r.getData());});
                    }else{
                        handler.post(()->{action.failure();});
                    }
                }
            });
        }
    }

    public interface loadOrderAction{
        void failure();
        void ok(Order order);
    }
}
