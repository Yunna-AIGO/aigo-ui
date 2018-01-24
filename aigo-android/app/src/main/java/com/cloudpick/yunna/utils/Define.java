package com.cloudpick.yunna.utils;

import com.cloudpick.yunna.BuildConfig;

/**
 * Created by maxwell on 17-12-19.
 */

public class Define {

    public static AppEnv getAppEnv(){
        switch(BuildConfig.APP_ENV){
            case 0:
                return AppEnv.DEV;
            case 1:
                return AppEnv.TEST;
            case 2:
                return AppEnv.PROD;
            default:
                return AppEnv.DEV;
        }
    }

    public static String getUrlPrefix(){
        return BuildConfig.BASE_URL;
    }

    public static boolean showSkipInBindingPayment(){
        if(getAppEnv() == AppEnv.PROD){
            return false;
        }else{
            return true;
        }
    }

    public static String getAppVersion(){
        return BuildConfig.VERSION_NAME;
    }

    public enum AppEnv{
        DEV(0, "DEV"), TEST(1, "TEST"), PROD(2, "PROD");

        private final int code;
        private final String name;

        AppEnv(int code, String name){
            this.code = code;
            this.name = name;
        }

        public int getCode(){
            return code;
        }

        public String getName(){
            return name;
        }
    }
}
