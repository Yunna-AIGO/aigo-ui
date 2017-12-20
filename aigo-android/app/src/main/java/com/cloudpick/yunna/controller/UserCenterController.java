package com.cloudpick.yunna.controller;

import android.content.Context;

import com.cloudpick.yunna.model.User;
import com.cloudpick.yunna.utils.Constants;
import com.cloudpick.yunna.utils.http.Callback;
import com.cloudpick.yunna.utils.http.Requests;
import com.cloudpick.yunna.utils.http.Response;

import java.util.Map;


/**
 * Created by maxwell on 17-12-20.
 */

public class UserCenterController extends BaseController {

    public UserCenterController(Context context){
        super(context);
    }

    public void loadUserInfo(final loadUserInfoAction action){
        String url = String.format(Constants.URL_USER_INFO, User.getUser().getUserId());
        Requests.getAsync(url, new Callback<Response<Map<String, String>>>() {
            @Override
            public void error(Exception e) {
                System.out.println(e.getMessage());
            }

            @Override
            public void ok(Response<Map<String, String>> r) {
                if(r.isSuccess()){
                    User.getUser().setUserInfo(
                            r.getUserInfo().get(Constants.KEY_NICKNAME),
                            r.getUserInfo().get(Constants.KEY_MOBILE),
                            r.getUserInfo().get(Constants.KEY_PIC_URL));
                    handler.post(()->{action.ok();});
                }else{
                    handler.post(()->{action.failure();});
                }
            }
        });
    }

    public interface loadUserInfoAction{
        void failure();
        void ok();
    }

    public void signout(){
        User.getUser().signout();
    }
}
