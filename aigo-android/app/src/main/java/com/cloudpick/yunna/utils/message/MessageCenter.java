package com.cloudpick.yunna.utils.message;

import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.cloudpick.yunna.BuildConfig;
import com.cloudpick.yunna.ui.MainActivity;
import com.cloudpick.yunna.ui.WelcomeActivity;
import com.cloudpick.yunna.utils.NotificationHelper;
import com.cloudpick.yunna.utils.enums.AppActionTypes;
import com.cloudpick.yunna.utils.message.push.JPush;
import com.cloudpick.yunna.utils.message.push.PushPlugins;

import java.lang.reflect.Constructor;

/**
 * Created by maxwell on 18-1-25.
 */

public class MessageCenter {

    private final static String TAG = "CloudPick";
    private volatile static MessageCenter instance = null;

    public static MessageCenter getInstance(){
        if(instance == null){
            synchronized(MessageCenter.class){
                if(instance == null){
                    instance = new MessageCenter();
                }
            }
        }
        return instance;
    }

    private Context context;
    private PushPlugins pushPlugins = null;

    private MessageCenter(){

    }

    public void init(Context ctx){
        this.context = ctx;
        //初始化推送
        pushPlugins = getPushPlugins();
        if(pushPlugins != null){
            pushPlugins.init();
            Log.i(TAG, pushPlugins.toString());
        }
    }


    private PushPlugins getPushPlugins(){
        try{
            CommonPushPluginsTypes pushType = CommonPushPluginsTypes.valueOf(BuildConfig.PUSH_PLUGINS);
            if(pushType == null){
                pushType = CommonPushPluginsTypes.AUTO;
            }

            if(pushType == CommonPushPluginsTypes.AUTO){
                //根据设备获取推送插件
                return getPushPluginsByDevice();
            }else{
                return getPushPluginsByName(pushType.getName());
            }
        }catch (Exception ex){
            ex.printStackTrace();
            return null;
        }
    }

    private PushPlugins getPushPluginsByDevice(){
        //TODO: 根据不同的设备实例化不同的推送插件类，如华为的实例化华为的插件。
        //如果设备未存在对应的推送，则根据CommonPushPluginsTypes中的优先级创建推送实例
        //暂时统一使用极光推送,
        return new JPush(context);
    }

    private PushPlugins getPushPluginsByName(String pushName){
        try{
            //根据类名获取Class对象
            Class clazz = Class.forName("com.cloudpick.yunna.utils.message.push." + pushName);
            Class[] parameterTypes = {android.content.Context.class};
            Constructor ctor = clazz.getConstructor(parameterTypes);
            Object[] parameters = {context};
            return (PushPlugins)ctor.newInstance(parameters);
        }catch (Exception ex){
            ex.printStackTrace();
            return null;
        }
    }

    public PushPlugins getRegistedPushPlugins(){
        return pushPlugins;
    }


    /**
     * 点击打开通知
     * @param action
     * @param isAppAlive
     */
    //推送相关
    public void handleNotificationOpened(String action, boolean isAppAlive){
        try{
            AppAction appAction = new AppAction(AppActionTypes.valueOf(action.toUpperCase()));
            Intent intent = null;
            if(isAppAlive){
                //MainActivity还存在，直接拉起跳转
                Log.d(TAG, "the app process is alive");
                intent = MainActivity.newIntent(context, false, appAction);
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
            }else{
                //MainActivity不存在，拉起WelcomeActivity后再跳转
                Log.d(TAG, "the app process is dead");
                intent = WelcomeActivity.newIntent(context, appAction);
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
//                intent.addCategory(Intent.CATEGORY_LAUNCHER);
            }
            context.startActivity(intent);
        }catch (Exception ex){
            ex.printStackTrace();
        }
    }

    public void handleCustomMessage(String title, String content, String action){
        NotificationHelper.getInstance().notify(title, content);
    }


    /**
     * 通用推送插件类型枚举
     */
    public enum CommonPushPluginsTypes{
        JPUSH("JPUSH", "JPush", 1),//极光推送
        MOCK_PUSH("MOCK_PUSH", "MockPush", 2),//Mock推送插件
        AUTO("AUTO", "Auto", 0);//自动选择推送插件

        private final String code;
        private final String name;
        private final int priority;

        CommonPushPluginsTypes(String code, String name, int priority){
            this.code = code;
            this.name = name;
            this.priority = priority;
        }

        public String getCode() {
            return code;
        }

        public int getPriority() {
            return priority;
        }

        public String getName(){
            return name;
        }
    }

}
