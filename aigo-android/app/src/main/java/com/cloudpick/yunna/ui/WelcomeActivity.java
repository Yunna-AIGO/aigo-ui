package com.cloudpick.yunna.ui;

import android.app.Activity;
import android.os.Bundle;
import android.view.WindowManager;

import com.cloudpick.yunna.R;
import com.cloudpick.yunna.model.User;
import com.cloudpick.yunna.utils.AppData;
import com.cloudpick.yunna.utils.NotificationHelper;
import com.nostra13.universalimageloader.core.ImageLoader;
import com.nostra13.universalimageloader.core.ImageLoaderConfiguration;

public class WelcomeActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.activity_welcome);
        initApp();
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus)
    {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus)
        {
            new Thread(()->{
                runOnUiThread(()->{
                    if(!User.getUser().checkUser()){
                        startActivity(LoginActivity.newIntent(WelcomeActivity.this, true));
                    }else{
                        startActivity(MainActivity.newIntent(WelcomeActivity.this, true));
                    }
                    WelcomeActivity.this.finish();
                });
            }).start();
        }

//        Handler handler = new Handler();
//        //当计时结束,跳转至主界面
//        handler.postDelayed(new Runnable() {
//            @Override
//            public void run() {
//                Intent intent = new Intent(WelcomeActivity.this, MainActivity.class);
//                startActivity(intent);
//                WelcomeActivity.this.finish();
//            }
//        }, 3000);
    }

    private void initApp(){
        //init app data
        AppData.getAppData().init(getApplicationContext());
        //init imageLoader
        ImageLoaderConfiguration config = new ImageLoaderConfiguration
                .Builder(getApplicationContext())
                .writeDebugLogs()
                .build();
        ImageLoader.getInstance().init(config);
        //init notification
        NotificationHelper.getInstance().init(WelcomeActivity.this);
    }
}
