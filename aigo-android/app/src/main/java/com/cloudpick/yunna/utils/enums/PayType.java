package com.cloudpick.yunna.utils.enums;

/**
 * Created by maxwell on 17-12-26.
 */

public enum PayType {
    ALIPAY("alipay", "支付宝"),
    WECHAT_PAY("wechat_pay", "微信"),
    CP_PAY("cp_pay", "账户支付");

    private final String code;
    private final String name;

    PayType(String code, String name){
        this.code = code;
        this.name = name;
    }

    public String getCode(){
        return code;
    }

    public String getName(){
        return name;
    }
}
