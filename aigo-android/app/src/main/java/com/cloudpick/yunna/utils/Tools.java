package com.cloudpick.yunna.utils;

import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.res.Resources;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.IBinder;
import android.view.inputmethod.InputMethodManager;
import android.widget.Toast;
import android.app.AlertDialog;

import com.cloudpick.yunna.ui.R;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by maxwell on 17-12-13.
 */

public class Tools {

    public static boolean isAppInstalled(Context context, String packageName){
        final PackageManager packageManager = context.getPackageManager();
        List<PackageInfo> pinfo = packageManager.getInstalledPackages(0);
        List<String> pName = new ArrayList<String>();
        if (pinfo != null) {
            for (int i = 0; i < pinfo.size(); i++) {
                String pn = pinfo.get(i).packageName;
                pName.add(pn);
            }
        }
        return pName.contains(packageName);
    }


    /**
     * 判断是否存在虚拟按键
     * @param context context
     * @return true or false
     */
    public static boolean checkDeviceHasNavigationBar(Context context) {
        boolean hasNavigationBar = false;
        Resources rs = context.getResources();
        int id = rs.getIdentifier("config_showNavigationBar", "bool", "android");
        if (id > 0) {
            hasNavigationBar = rs.getBoolean(id);
        }
        try {
            Class systemPropertiesClass = Class.forName("android.os.SystemProperties");
            Method m = systemPropertiesClass.getMethod("get", String.class);
            String navBarOverride = (String) m.invoke(systemPropertiesClass, "qemu.hw.mainkeys");
            if ("1".equals(navBarOverride)) {
                hasNavigationBar = false;
            } else if ("0".equals(navBarOverride)) {
                hasNavigationBar = true;
            }
        } catch (Exception e) {

        }
        return hasNavigationBar;
    }

    /**
     * 使用*隐藏手机号部分数字
     *
     * @param phone 手机号
     * @return
     */
    public static String hidePartialPhone(String phone) {
        try{
            String ret = phone.replaceAll("(\\d{3})\\d{5}(\\d{3})", "$1*****$2");
            return ret;
        }catch(Exception ex){
            System.out.println(ex.getMessage());
            return phone;
        }

    }

    /**
     * 显示Toast消息
     * @param context
     * @param msg
     */
    public static void ToastMessage(Context context, String msg){
        Toast.makeText(context, msg, Toast.LENGTH_SHORT).show();
    }

    /**
     * 显示Toast消息
     * @param context
     * @param resId
     */
    public static void ToastMessage(Context context, int resId){
        String msg = context.getResources().getString(resId);
        ToastMessage(context, msg);
    }

    /**
     * 检查是否有网络
     * @param context
     * @return
     */
    public static boolean hasNetwork(Context context, boolean alertToSetNetwork){
        boolean hasNetwork = false;
        try{
            ConnectivityManager manger = (ConnectivityManager)context.getSystemService(Context.CONNECTIVITY_SERVICE);
            NetworkInfo info = manger.getActiveNetworkInfo();
            hasNetwork = info != null && info.isConnected();
        } catch (Exception e){
            hasNetwork = false;
        }

        if(!hasNetwork && alertToSetNetwork){
            new AlertDialog.Builder(context)
                    .setTitle(R.string.message_alert)
                    .setMessage(R.string.no_network)
                    .setPositiveButton(R.string.title_ok, (d, i)->{
                        Intent intent = new Intent("android.settings.WIFI_SETTINGS");
                        context.startActivity(intent);
                    }).show();
        }
        return hasNetwork;
    }

    /**
     * 隐藏软键盘
     * @param context
     * @param token
     */
    public static void hideSoftInput(Context context, IBinder token) {
        if (token != null) {
            InputMethodManager manager = (InputMethodManager)context.getSystemService(Context.INPUT_METHOD_SERVICE);
            manager.hideSoftInputFromWindow(token, InputMethodManager.HIDE_NOT_ALWAYS);
        }
    }

    public static int dp2px(Context context, float dpValue)
    {
        float m = context.getResources().getDisplayMetrics().density;
        return (int)(dpValue * m + 0.5f);
    }

    public static int px2dp(Context context, float pxValue)
    {
        float m = context.getResources().getDisplayMetrics().density;
        return (int)(pxValue / m + 0.5f);
    }
}
