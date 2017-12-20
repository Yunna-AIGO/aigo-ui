package com.cloudpick.yunna.controller;

import android.content.Context;

import com.cloudpick.yunna.model.User;

/**
 * Created by maxwell on 17-12-20.
 */

public class SettingController extends BaseController {

    public SettingController(Context context){
        super(context);
    }

    public int getTokenExpiredIn(){
        return User.getUser().getTokenExpiredInSelection();
    }

    public void setTokenExpiredIn(String expiredInStr){
        User.getUser().setTokenExpiredIn(expiredInStr);
    }

}
