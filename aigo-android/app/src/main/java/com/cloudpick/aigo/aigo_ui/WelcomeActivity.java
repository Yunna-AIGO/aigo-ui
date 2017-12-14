package com.cloudpick.aigo.aigo_ui;

import android.app.ActionBar;
import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Build;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

import com.cloudpick.aigo.model.User;
import com.cloudpick.aigo.utils.Constants;
import com.nostra13.universalimageloader.core.ImageLoader;
import com.nostra13.universalimageloader.core.ImageLoaderConfiguration;

public class WelcomeActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        if (Build.VERSION.SDK_INT < 16) {
//            getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
//                    WindowManager.LayoutParams.FLAG_FULLSCREEN);
//        }else{
//            View decorView = getWindow().getDecorView();
//            int uiOptions = View.SYSTEM_UI_FLAG_FULLSCREEN;
//            decorView.setSystemUiVisibility(uiOptions);
//            ActionBar actionBar = getActionBar();
//            if(actionBar != null){
//                actionBar.hide();
//            }
//        }
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
            new Thread(new Runnable(){
                @Override
                public void run(){
                    if(!User.getUser().checkUser()){
                        runOnUiThread(new Runnable(){
                            @Override
                            public void run(){
                                startActivity(LoginActivity.newIntent(WelcomeActivity.this));
                                WelcomeActivity.this.finish();
                            }
                        });
                    }else{
                        runOnUiThread(new Runnable(){
                            @Override
                            public void run(){
                                startActivity(MainActivity.newIntent(WelcomeActivity.this));
                                WelcomeActivity.this.finish();
                            }
                        });
                    }
                }
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
        SharedPreferences sp = WelcomeActivity.this
                .getSharedPreferences(Constants.PREFERENCE_FILE_KEY, Context.MODE_PRIVATE);
        User.getUser().init(sp);

        ImageLoaderConfiguration config = new ImageLoaderConfiguration
                .Builder(getApplicationContext())
                .writeDebugLogs()
                .build();
        ImageLoader.getInstance().init(config);
    }
}
