package com.cloudpick.yunna.controller;

import android.content.Context;
import android.os.Handler;
import android.os.Looper;

/**
 * Created by maxwell on 17-12-18.
 */

public class BaseController {

    protected Context context;
    protected Handler handler = null;

    public BaseController(Context context){
        this.context = context;
        this.handler = new Handler(Looper.getMainLooper());
    }

}
