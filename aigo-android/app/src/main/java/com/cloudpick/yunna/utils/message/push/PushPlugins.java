package com.cloudpick.yunna.utils.message.push;

import android.content.Context;
import android.content.ContextWrapper;

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


}
