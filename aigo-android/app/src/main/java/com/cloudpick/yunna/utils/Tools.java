package com.cloudpick.yunna.utils;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.res.Resources;

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

}