package com.cloudpick.yunna.utils;

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
}
