package com.cloudpick.yunna.utils;

import android.annotation.TargetApi;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import android.support.v4.app.NotificationCompat;
import android.support.v4.app.NotificationManagerCompat;
import android.util.Log;

import com.cloudpick.yunna.R;
import com.cloudpick.yunna.ui.SettingActivity;


/**
 * Created by maxwell on 18-1-3.
 *
 * 简单封装notification，统一android8.0以下及8.0以上对notification的操作
 */

public class NotificationHelper {

    public static final String NOTIFICATION_CHANNEL_ID = Constants.APP_NAMESPACE + ".notification";

    private volatile static NotificationHelper instance = null;

    public static NotificationHelper getInstance(){
        if(instance == null){
            synchronized(NotificationHelper.class){
                if(instance == null){
                    instance = new NotificationHelper();
                }
            }
        }
        return instance;
    }

    private final int NOTIFY_ID = 0;

    //android 8+使用的时NotificationChannel，通知相关操作都有所不同
    private boolean useNotificationChannel = false;
    private Context context = null;
    private NotificationManager notificationManager = null;

    private NotificationHelper(){
        useNotificationChannel = Build.VERSION.SDK_INT >= Build.VERSION_CODES.O;
    }

    public void init(Context context){
        if(this.context != null){
            return;
        }
        this.context = context;
        notificationManager = (NotificationManager)context.getSystemService(Context.NOTIFICATION_SERVICE);
        if(useNotificationChannel && notificationManager != null){
            initNotificationChannel();
        }
    }

    @TargetApi(26)
    private void initNotificationChannel(){
        NotificationChannel chan = new NotificationChannel(
                NOTIFICATION_CHANNEL_ID,
                context.getString(R.string.app_name),
                NotificationManager.IMPORTANCE_DEFAULT);
//        chan.setLightColor(Color.GREEN);
        chan.setLockscreenVisibility(Notification.VISIBILITY_PRIVATE);
        notificationManager.createNotificationChannel(chan);
    }

    /**
     * 通知
     * @param title 标题
     * @param content 内容
     */
    public void notify(String title, String content){
        if(useNotificationChannel){
            notificationManager.notify(NOTIFY_ID, getNewNotification(title, content).build());
        }else{
            notificationManager.notify(NOTIFY_ID, getNotification(title, content).build());
        }
    }

    public void notify(String content){
        notify(context.getString(R.string.app_name), content);
    }

    @TargetApi(26)
    private Notification.Builder getNewNotification(String title, String body) {
        Notification.Builder builder = new Notification.Builder(context.getApplicationContext(), NOTIFICATION_CHANNEL_ID)
                .setContentTitle(title)
                .setContentText(body)
                .setSmallIcon(getSmallIcon())
                .setAutoCancel(true);
        builder.setContentIntent(getPendingIntent());
        return builder;
    }

    private NotificationCompat.Builder getNotification(String title, String content){
        NotificationCompat.Builder builder = new NotificationCompat.Builder(context.getApplicationContext())
                .setSmallIcon(getSmallIcon())
                .setContentTitle(title)
                .setContentText(content)
                .setAutoCancel(true);
        builder.setContentIntent(getPendingIntent());
        return builder;
    }

    private PendingIntent getPendingIntent(){
        Intent notificationIntent = SettingActivity.newIntent(context.getApplicationContext());
        return PendingIntent.getActivity(
                context.getApplicationContext(),
                0,
                notificationIntent,
                PendingIntent.FLAG_UPDATE_CURRENT);
    }

    private int getSmallIcon(){
        //return R.mipmap.ic_launcher;
        return R.drawable.back;
    }

    public void setNotificationStatus(){
        if(useNotificationChannel){
            goToNewNotificationSettings();
        }else{
            goToNotificationSettings();
        }
    }

    private void goToNotificationSettings() {
        Log.d("ssss", "notification setting(android 8-)");
        if(Build.VERSION.SDK_INT == Build.VERSION_CODES.KITKAT){
            Intent intent = new Intent();
            intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
            intent.addCategory(Intent.CATEGORY_DEFAULT);
            intent.setData(Uri.parse("package:" + context.getPackageName()));
            context.startActivity(intent);
        }else{
            Intent intent = new Intent(Settings.ACTION_APP_NOTIFICATION_SETTINGS);
            intent.setAction("android.settings.APP_NOTIFICATION_SETTINGS");
            intent.putExtra("app_package", context.getPackageName());
            intent.putExtra("app_uid", context.getApplicationInfo().uid);
            context.startActivity(intent);
        }
    }

    @TargetApi(26)
    private void goToNewNotificationSettings() {
        Log.d("ssss", "notification setting(android 8+)");
        Intent intent = new Intent(Settings.ACTION_APP_NOTIFICATION_SETTINGS);
        intent.putExtra(Settings.EXTRA_APP_PACKAGE, context.getPackageName());
        intent.putExtra(Settings.EXTRA_CHANNEL_ID, NOTIFICATION_CHANNEL_ID);
        context.startActivity(intent);
    }


    /**
     * 是否已经开启通知
     * @return
     */
    public boolean isEnabled() {
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.N){
            return areNotificationsEnabled();
        }else{
            //sdk19以下使用该方法返回的都是True
            return NotificationManagerCompat.from(context).areNotificationsEnabled();
        }

    }

    @TargetApi(24)
    private boolean areNotificationsEnabled(){
        boolean rslt = notificationManager.areNotificationsEnabled();
        Log.d("ssss", "notification " + (rslt? "on":"off"));
        return notificationManager.areNotificationsEnabled();
    }
}
