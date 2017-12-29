package com.cloudpick.yunna.controller;

import android.content.Context;
import android.text.TextUtils;

import com.cloudpick.yunna.model.Feedback;
import com.cloudpick.yunna.model.Order;
import com.cloudpick.yunna.model.User;
import com.cloudpick.yunna.utils.Constants;
import com.cloudpick.yunna.utils.http.Callback;
import com.cloudpick.yunna.utils.http.Requests;
import com.cloudpick.yunna.utils.http.Response;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by maxwell on 17-12-20.
 */

public class OrderDetailController extends BaseController {

    public OrderDetailController(Context context){
        super(context);
    }


    public void loadOrderDetail(String orderId, final loadOrderAction action){
        if(TextUtils.isEmpty(orderId)){
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

    public void checkOrderFeedbackStatus(String orderId, checkAction action){
        Map<String, String> data = new HashMap<>();
        data.put("orderNo", orderId);
        Requests.getAsync(String.format(Constants.URL_FEEDBACK_QUERY, User.getUser().getUserId()), data,
                new Callback<Response<ArrayList<Feedback>>>() {
                    @Override
                    public void error(Exception e) {
                        System.out.println(e.getMessage());
                        handler.post(()->{action.failure();});
                    }
                    @Override
                    public void ok(Response<ArrayList<Feedback>> r) {
                        handler.post(()->{
                            if(r.isSuccess()){
                                action.ok(r.getData().size() == 0? null: r.getData().get(0));
                            }else{
                                action.failure();
                            }
                        });
                    }
        });
    }

    public interface checkAction{
        void failure();
        void ok(Feedback fb);
    }
}
