package com.cloudpick.yunna.ui;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.WindowManager;

import com.cloudpick.yunna.R;
import com.cloudpick.yunna.model.User;
import com.cloudpick.yunna.ui.base.BaseActivity;
import com.cloudpick.yunna.utils.message.AppAction;
import com.nostra13.universalimageloader.core.ImageLoader;
import com.nostra13.universalimageloader.core.ImageLoaderConfiguration;

public class WelcomeActivity extends BaseActivity {

    private AppAction appAction = null;

    @Override
    protected int getContentViewId(){
        return R.layout.activity_welcome;
    }

    @Override
    protected void initView(Bundle savedInstanceState){
        //init imageLoader
        ImageLoaderConfiguration config = new ImageLoaderConfiguration
                .Builder(getApplicationContext())
                .writeDebugLogs()
                .build();
        ImageLoader.getInstance().init(config);
        Intent intent = getIntent();
        if(intent != null){
            appAction = intent.getParcelableExtra(MainActivity.APP_ACTION_KEY);
        }
    }

    @Override
    protected void beforeViewCreate(Bundle savedInstanceState){
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);
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
                        //用户token续期
                        User.getUser().updateExpiredIn();
                        startActivity(MainActivity.newIntent(WelcomeActivity.this, true, appAction));
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

    public static Intent newIntent(Context packageContext, AppAction action){
        Intent intent = new Intent(packageContext, WelcomeActivity.class);
        intent.putExtra(MainActivity.APP_ACTION_KEY, action);
        return intent;
    }
}
