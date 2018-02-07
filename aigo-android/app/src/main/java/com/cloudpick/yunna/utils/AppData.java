package com.cloudpick.yunna.utils;

import android.content.Context;
import android.os.Build;
import android.util.Log;

import java.io.File;

/**
 * Created by maxwell on 18-1-5.
 */

public class AppData {
    private volatile static AppData appData = null;

    public static AppData getAppData(){
        if(appData == null){
            synchronized(AppData.class){
                if(appData == null){
                    appData = new AppData();
                }
            }
        }
        return appData;
    }

    private ACache cache = null;
    private final String appDataFileName = "yunnaData";

    private AppData(){
    }

    public AppData init(Context ctx){
        File f = new File(ctx.getFilesDir(), appDataFileName);
        Log.d("ssss", f.toString());
        cache = ACache.get(f);
        return this;
    }

    /**
     * 读取 String数据
     *
     * @param key
     * @return String 数据
     */
    public String getAsString(String key){
        return cache.getAsString(key);
    }

    /**
     * 读取 boolean数据
     * @param key
     * @return boolean 数据
     */
    public boolean getAsBoolean(String key){
        String val = cache.getAsString(key);
        try{
            return Boolean.parseBoolean(val);
        }catch (Exception ex){
            return false;
        }
    }

    /**
     * @param key
     * @param value
     * @param expiredIn
     */
    public void put(String key, String value, int expiredIn){
        cache.put(key, value, expiredIn);
    }

    /**
     * @param key
     * @param value
     */
    public void put(String key, String value){
        cache.put(key, value);
    }

    /**
     * @param key
     * @param value
     */
    public void put(String key, boolean value){
        cache.put(key, Boolean.toString(value));
    }

    /**
     * @param key
     * @return
     */
    public boolean remove(String key) {
        return cache.remove(key);
    }

}
