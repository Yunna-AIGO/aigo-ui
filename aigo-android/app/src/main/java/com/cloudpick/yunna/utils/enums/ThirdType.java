package com.cloudpick.yunna.utils.enums;

/**
 * Created by maxwell on 17-12-13.
 */

public enum ThirdType{
    ALIPAY("ALIPAY","支付宝"),
    WECHAT("WECHAT","微信"),
    UNKNOWN("UNKNOWN", "未知");

    private final String code;
    private final String name;

    ThirdType(String code, String name){
        this.code = code;
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }
}