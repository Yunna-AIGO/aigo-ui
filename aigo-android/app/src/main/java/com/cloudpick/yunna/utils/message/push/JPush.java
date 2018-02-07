package com.cloudpick.yunna.utils.message.push;

import android.app.ActivityManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;

import com.cloudpick.yunna.BuildConfig;
import com.cloudpick.yunna.R;
import com.cloudpick.yunna.ui.MainActivity;
import com.cloudpick.yunna.utils.message.MessageCenter;

import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Field;
import java.util.Iterator;
import java.util.List;

import cn.jpush.android.api.CustomPushNotificationBuilder;
import cn.jpush.android.api.JPushInterface;


/**
 * Created by maxwell on 18-1-25.
 */

public class JPush extends PushPlugins {

    private final static String TAG = "CloudPick";
    private final static String KEY_APP_KEY = "JPUSH_APPKEY";

    @Override
    public void init(){
        JPushInterface.setDebugMode(BuildConfig.DEBUG); 	// 设置开启日志,发布时请关闭日志
        JPushInterface.init(this);     		        // 初始化 JPush
        JPushInterface.setPowerSaveMode(this, true);
        resume();
        getSubscriberId();
        setNotificationLayout();
    }

    @Override
    protected void getSubscriberId(){
        //异步获取SubscriberId,规定次数内获取不到的话停止推送
        int tryCount = 30;
        new Thread(()->{
            int ct = 0;
            try{
                while(TextUtils.isEmpty(SubscriberId()) && ct < tryCount){
                    String rid = JPushInterface.getRegistrationID(this);
                    if(!TextUtils.isEmpty(rid)){
                        setSubscriberId(rid);
                        break;
                    }
                    ct += 1;
                    Thread.sleep(2000);
                }
            }catch (Exception ex){
                ex.printStackTrace();
            }
            if(TextUtils.isEmpty(SubscriberId())){
                stop();
            }
        }).start();
    }

    @Override
    public String getPushPluginsName(){
        return "JPush";
    }

    @Override
    public void stop(){
        super.stop();
        JPushInterface.stopPush(this);
    }

    @Override
    public void resume(){
        super.resume();
        JPushInterface.resumePush(this);
    }

    @Override
    public boolean isStopped(){
        return JPushInterface.isPushStopped(this);
    }


    public JPush(Context context){
        super(context);
    }

    private void setNotificationLayout(){
        CustomPushNotificationBuilder builder = new CustomPushNotificationBuilder(this,
                R.layout.notification_layout,
                R.id.notification_icon,
                R.id.notification_title,
                R.id.notification_text);
        setNotificationReceivedTime(builder, R.id.notification_time);

        builder.layoutIconDrawable = R.drawable.notification_icon;
        builder.developerArg0 = "developerArg2";
        builder.statusBarDrawable = R.drawable.notification_icon;
        JPushInterface.setPushNotificationBuilder(1, builder);
    }

    private void setNotificationReceivedTime(CustomPushNotificationBuilder builder, int notificationTimeId){
        try{
            Class<?> obj = builder.getClass();
            Field[] fields = obj.getDeclaredFields();
            for (int i = 0; i < fields.length; i++) {
                fields[i].setAccessible(true);
                if(fields[i].getName().equals("b")){
                    fields[i].set(builder, notificationTimeId);
                }
            }
        }catch (Exception ex){
        }
    }

    private String getAppKey(){
        Bundle metaData = null;
        String appKey = null;
        try {
            ApplicationInfo ai = getPackageManager().getApplicationInfo(getPackageName(), PackageManager.GET_META_DATA);
            if (null != ai)
                metaData = ai.metaData;
            if (null != metaData) {
                appKey = metaData.getString(KEY_APP_KEY);
                if ((null == appKey) || appKey.length() != 24) {
                    appKey = null;
                }
            }
        } catch (PackageManager.NameNotFoundException e) {
        }
        return appKey;
    }

    @Override
    public String toString(){
        StringBuilder sb = new StringBuilder();
        sb.append(getPushPluginsName() + " service status:");
        sb.append("\nStatus - " + (isStopped()? "Stopped":"Running"));
        String appKey = getAppKey();
        sb.append("\nAppKey - " + (appKey == null?"N/A":appKey));
        String subscriberId = SubscriberId();
        sb.append("\nRegId - " + (TextUtils.isEmpty(subscriberId)?"N/A":subscriberId));
        return sb.toString();
    }




    public static class Receiver extends BroadcastReceiver {
        private final String Extra_Title = "title";
        private final String Extra_Content = "content";
        private final String Extra_Action = "action";

        @Override
        public void onReceive(Context context, Intent intent){
            try {
                Bundle bundle = intent.getExtras();
                String action = intent.getAction();
                if(BuildConfig.DEBUG){
                    Log.d(TAG, "[Receiver] onReceive - " + action + ", extras: " + printBundle(bundle));
                }

                if (JPushInterface.ACTION_REGISTRATION_ID.equals(action)) {
                    String regId = bundle.getString(JPushInterface.EXTRA_REGISTRATION_ID);
                    Log.d(TAG, "regId - " + regId + "   from receiver");
                    //send the Registration Id to server...
                } else if (JPushInterface.ACTION_MESSAGE_RECEIVED.equals(action)) {
                    //接收到推送下来的自定义消息
                    processCustomMessage(context, bundle);
                } else if (JPushInterface.ACTION_NOTIFICATION_RECEIVED.equals(action)) {
                    //接收到推送下来的通知
                    //int notifactionId = bundle.getInt(JPushInterface.EXTRA_NOTIFICATION_ID);
                } else if (JPushInterface.ACTION_NOTIFICATION_OPENED.equals(action)) {
                    //用户点击打开了通知
                    JSONObject json = getExtraData(bundle);
                    String act = json.optString(Extra_Action);
                    if(!TextUtils.isEmpty(act)){
                        MessageCenter.getInstance().handleNotificationOpened(act, MainActivity.isAlive);
                    }
                } else if (JPushInterface.ACTION_RICHPUSH_CALLBACK.equals(action)) {
                    //用户收到到RICH PUSH CALLBACK  bundle.getString(JPushInterface.EXTRA_EXTRA))
                    //在这里根据 JPushInterface.EXTRA_EXTRA 的内容处理代码，比如打开新的Activity， 打开一个网页等..
                } else if(JPushInterface.ACTION_CONNECTION_CHANGE.equals(action)) {
                    //boolean connected = intent.getBooleanExtra(JPushInterface.EXTRA_CONNECTION_CHANGE, false);
                } else {
                    Log.d(TAG, "Unhandled intent - " + action);
                }
            } catch (Exception e){

            }
        }

        /**
         * 打印所有的 intent extra 数据
         * @param bundle
         * @return
         */
        private String printBundle(Bundle bundle) {
            StringBuilder sb = new StringBuilder();
            for (String key : bundle.keySet()) {
                if (key.equals(JPushInterface.EXTRA_NOTIFICATION_ID)) {
                    sb.append("\nkey:" + key + ", value:" + bundle.getInt(key));
                }else if(key.equals(JPushInterface.EXTRA_CONNECTION_CHANGE)){
                    sb.append("\nkey:" + key + ", value:" + bundle.getBoolean(key));
                } else if (key.equals(JPushInterface.EXTRA_EXTRA)) {
                    if (TextUtils.isEmpty(bundle.getString(JPushInterface.EXTRA_EXTRA))) {
                        Log.i(TAG, "This message has no Extra data");
                        continue;
                    }

                    try {
                        JSONObject json = new JSONObject(bundle.getString(JPushInterface.EXTRA_EXTRA));
                        Iterator<String> it =  json.keys();
                        while (it.hasNext()) {
                            String myKey = it.next();
                            sb.append("\nkey:" + key + ", value: [" +
                                    myKey + " - " +json.optString(myKey) + "]");
                        }
                    } catch (JSONException e) {
                        Log.e(TAG, "Get message extra JSON error!");
                    }

                } else {
                    sb.append("\nkey:" + key + ", value:" + bundle.getString(key));
                }
            }
            return sb.toString();
        }

        /**
         * 极光推送处理自定义消息
         * @param context
         * @param bundle
         */
        private void processCustomMessage(Context context, Bundle bundle) {
            JSONObject json = getExtraData(bundle);
            if(json == null){
                return;
            }
            try {
                String title = "", content = "", action = "";
                title = json.optString(Extra_Title);
                content = json.optString(Extra_Content);
                action = json.optString(Extra_Action);
                MessageCenter.getInstance().handleCustomMessage(title, content, action);
            } catch (Exception ex) {
                ex.printStackTrace();
                Log.e(TAG, "Extra JSON data structure error!");
            }
        }

        public JSONObject getExtraData(Bundle bundle){
            try {
                String extras = bundle.getString(JPushInterface.EXTRA_EXTRA);
                return new JSONObject(extras);
            } catch (JSONException e) {
                Log.e(TAG, "Get message extra JSON error!");
                return null;
            }
        }

        public boolean isAppAlive(Context context, String packageName){
            ActivityManager activityManager =
                    (ActivityManager)context.getSystemService(Context.ACTIVITY_SERVICE);
            List<ActivityManager.RunningAppProcessInfo> processInfos
                    = activityManager.getRunningAppProcesses();
            for(int i = 0; i < processInfos.size(); i++){
                if(processInfos.get(i).processName.equals(packageName)){
                    Log.i("NotificationLaunch",
                            String.format("the %s is running, isAppAlive return true", packageName));

                    return true;
                }
            }
            Log.i("NotificationLaunch",
                    String.format("the %s is not running, isAppAlive return false", packageName));
            return false;
        }

    }
}
