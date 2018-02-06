package com.cloudpick.yunna;

import android.app.Application;
import android.util.Log;

import com.cloudpick.yunna.utils.NotificationHelper;
import com.cloudpick.yunna.utils.message.MessageCenter;

import static com.cloudpick.yunna.utils.Constants.LOG_TAG;

/**
 * Created by maxwell on 18-1-24.
 */

public class App extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        initApp();
    }

    private void initApp(){
        Log.d(LOG_TAG, getApplicationContext().getPackageName());
        //init notification
        NotificationHelper.getInstance().init(getApplicationContext());
//        //init message center
//        MessageCenter.getInstance().init(getApplicationContext());
    }
}
