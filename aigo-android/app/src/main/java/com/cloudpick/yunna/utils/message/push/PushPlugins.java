package com.cloudpick.yunna.utils.message.push;

import android.content.Context;
import android.content.ContextWrapper;
import android.text.TextUtils;
import android.util.Log;

import com.cloudpick.yunna.model.User;
import com.cloudpick.yunna.utils.Constants;
import com.cloudpick.yunna.utils.http.Callback;
import com.cloudpick.yunna.utils.http.Requests;
import com.cloudpick.yunna.utils.http.Response;

import java.util.HashMap;
import java.util.Map;

/**
 * 推送插件基类
 * Created by maxwell on 18-1-25.
 */

public abstract class PushPlugins extends ContextWrapper {

    private static final String TAG = "CloudPick";

    private String subscriberId = "";

    protected void setSubscriberId(String subscriberId){
        this.subscriberId = subscriberId;
    }

    /**
     * 获取订阅者ID
     * @return
     */
    public String SubscriberId(){
        return subscriberId;
    }


    // Required override

    /**
     * 插件初始化
     */
    public abstract void init();

    /**
     * 获取订阅者ID
     */
    protected abstract void getSubscriberId();


    // Optional override

    /**
     * 获取推送插件名称
     * @return
     */
    public String getPushPluginsName(){
        return "Not set";
    }

    /**
     * 获取服务是否停止
     * @return
     */
    public boolean isStopped(){
        return false;
    }

    /**
     * 停止接收推送
     */
    public void stop(){

    }

    /**
     * 恢复推送
     */
    public void resume(){
    }

    public PushPlugins(Context context){
        super(context);
    }

    /**
     * 向服务器注册subscriberId
     */
    public void registSubscriberId(){
        if(!TextUtils.isEmpty(SubscriberId())){
            Log.d(TAG, "regist subscriber id " + SubscriberId());
            Map<String, String> data = new HashMap<>();
            data.put(Constants.KEY_USER_ID, User.getUser().getUserId());
            data.put(Constants.KEY_SUBSCRIBER_ID, SubscriberId());
            data.put(Constants.KEY_PUSH_TYPE, getPushPluginsName().toLowerCase());
            Requests.postAsync(Constants.URL_SKD_INFO, data,
                    new Callback<Response<Object>>(){
                        @Override
                        public void error(Exception e){
                            e.printStackTrace();
                        }
                        @Override
                        public void ok(Response<Object> r){
                        }
                    });
        }
    }


}
