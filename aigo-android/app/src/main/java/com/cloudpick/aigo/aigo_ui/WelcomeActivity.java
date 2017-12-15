package com.cloudpick.aigo.aigo_ui;

import android.app.Activity;
import android.os.Bundle;
import android.view.WindowManager;

import com.cloudpick.aigo.model.User;
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
        User.getUser().init(getApplicationContext());

        ImageLoaderConfiguration config = new ImageLoaderConfiguration
                .Builder(getApplicationContext())
                .writeDebugLogs()
                .build();
        ImageLoader.getInstance().init(config);
    }
}
