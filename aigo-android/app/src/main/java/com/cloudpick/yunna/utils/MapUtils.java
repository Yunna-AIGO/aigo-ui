package com.cloudpick.yunna.utils;

import android.support.annotation.NonNull;

import java.util.Map;

/**
 * Created by maxwell on 18-2-1.
 */

public class MapUtils {

    public static <T, V> String getAsString(Map<T, V> map, T key, String defaultValue){
        V val = map.get(key);
        if(val == null){
            if(defaultValue != null) return defaultValue;
            else return "";
        }else{
            return val.toString();
        }
    }

    public static <T, V> boolean getAsBoolean(Map<T, V> map, T key, @NonNull boolean defaultValue){
        try{
            V val = map.get(key);
            return (Boolean)val;
        }catch (Exception ex){
            return defaultValue;
        }
    }
}
