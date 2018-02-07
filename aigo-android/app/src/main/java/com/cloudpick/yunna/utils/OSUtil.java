package com.cloudpick.yunna.utils;

import android.app.ActivityManager;
import android.content.Context;

/**
 * Created by maxwell on 18-2-7.
 */

public class OSUtil {

    /**
     * 获取进程名称
     * @param ctx
     * @return
     */
    public static String getProcessName(Context ctx){
        try{
            int pid = android.os.Process.myPid();//获取进程pid
            ActivityManager am = (ActivityManager)ctx.getSystemService(Context.ACTIVITY_SERVICE);//获取系统的ActivityManager服务
            for (ActivityManager.RunningAppProcessInfo appProcess : am.getRunningAppProcesses()){
                if(appProcess.pid == pid){
                    return appProcess.processName;
                }
            }
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return "";
    }
}
