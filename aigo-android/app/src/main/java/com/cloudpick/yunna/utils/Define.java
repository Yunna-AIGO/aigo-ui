package com.cloudpick.yunna.utils;

/**
 * Created by maxwell on 17-12-19.
 */

public class Define {

    public static AppEnv appEnv = AppEnv.PROD;

    public static String getUrlPrefix(){
        if(appEnv == AppEnv.PROD){
            return "http://47.100.13.231/cloudpick/rest/api/v1/";
        }else{
            return "http://10.10.10.130:8080/cloudpick/rest/api/v1/";
        }
    }

    public static String getAppName(){
        if(appEnv == AppEnv.DEV){
            return "云拿-开发";
        }else if(appEnv == AppEnv.TEST){
            return "云拿-测试";
        }else{
            return "云拿";
        }
    }

    public static boolean showSkipInBindingPayment(){
        if(appEnv == AppEnv.PROD){
            return false;
        }else{
            return true;
        }
    }

    public enum AppEnv{
        DEV("DEV"), TEST("TEST"), PROD("PROD");

        private final String value;

        AppEnv(String value){
            this.value = value;
        }

        public String getValue(){
            return value;
        }
    }
}
