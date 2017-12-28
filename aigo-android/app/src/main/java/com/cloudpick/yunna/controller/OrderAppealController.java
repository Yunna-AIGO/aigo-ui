package com.cloudpick.yunna.controller;

import android.content.Context;

import com.cloudpick.yunna.model.Order;
import com.cloudpick.yunna.model.User;
import com.cloudpick.yunna.ui.R;
import com.cloudpick.yunna.utils.Constants;
import com.cloudpick.yunna.utils.enums.FeedbackType;
import com.cloudpick.yunna.utils.http.Callback;
import com.cloudpick.yunna.utils.http.Requests;
import com.cloudpick.yunna.utils.http.Response;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by maxwell on 17-12-28.
 */

public class OrderAppealController extends BaseController {

    public OrderAppealController(Context context){
        super(context);
    }


    public void commitAppeal(Order order, String appealDesc, commitAppealAction action){
        Map<String, String> data = new HashMap<>();
        data.put("userId", User.getUser().getUserId());
        data.put("desc", appealDesc);
        data.put("orderNo", order.getOrderId());
        data.put("feedbackType", FeedbackType.APPEAL.getCode());
        Requests.postAsync(Constants.URL_FEEDBACK_INSERT, data, new Callback<Response<Object>>() {
            @Override
            public void error(Exception e) {
                System.out.println(e.getMessage());
                handler.post(()->{action.failure(context.getResources().getString(R.string.network_error));});
            }
            @Override
            public void ok(Response<Object> r) {
                if(r.isSuccess()){
                    handler.post(()->{action.ok();});
                }else{
                    handler.post(()->{action.failure(r.getMessage(context.getResources().getString(R.string.commit_failed)));});
                }
            }
        });
    }

    public interface commitAppealAction{
        void failure(String msg);
        void ok();
    }
}
