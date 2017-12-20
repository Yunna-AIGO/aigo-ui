package com.cloudpick.yunna.utils.enums;

/**
 * Created by maxwell on 17-12-13.
 */

public enum ThirdType{
    ALIPAY("ALIPAY"), WECHAT("WECHAT");

    private final String value;

    ThirdType(String value){
        this.value = value;
    }

    public String getValue(){
        return value;
    }
}