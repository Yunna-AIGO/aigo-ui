package com.cloudpick.yunna.utils;

/**
 * Created by maxwell on 17-12-19.
 */

public class Define {

    public static boolean isDebug = true;

    public static String getUrlPrefix(){
        if(isDebug){
            return "http://10.10.10.130:8080/cloudpick/rest/api/v1/";
        }else{
            return "http://47.100.13.231/cloudpick/rest/api/v1/";
        }
    }

    public static String getAppName(){
        if(isDebug){
            return "云拿-测试";
        }else{
            return "云拿";
        }
    }
}
