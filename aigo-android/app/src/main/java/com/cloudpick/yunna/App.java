package com.cloudpick.yunna;

import android.app.Application;
import android.util.Log;

import com.cloudpick.yunna.utils.AppData;
import com.cloudpick.yunna.utils.NotificationHelper;
import com.cloudpick.yunna.utils.OSUtil;
import com.cloudpick.yunna.utils.message.MessageCenter;
import com.pgyersdk.crash.PgyCrashManager;



/**
 * Created by maxwell on 18-1-24.
 */

public class App extends Application {
    private static final String TAG = "CloudPick";
    @Override
    public void onCreate() {
        super.onCreate();
        initApp();
    }

    private void initApp(){
        String pidName = OSUtil.getProcessName(this);
        Log.d(TAG, "pid name " + pidName);
        //只有主进程需要初始化，服务线程不需要初始化
        if(!pidName.endsWith(":pushsvc")){
            //init app data
            AppData.getAppData().init(getApplicationContext());
            //init notification
            NotificationHelper.getInstance().init(getApplicationContext());
            //init message center
            MessageCenter.getInstance().init(getApplicationContext());
            //regist pgyer sdk
            PgyCrashManager.register(this);
        }
    }
}
