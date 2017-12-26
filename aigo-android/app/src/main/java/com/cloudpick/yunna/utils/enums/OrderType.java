package com.cloudpick.yunna.utils.enums;

/**
 * Created by maxwell on 17-12-25.
 */

public enum OrderType {
    CONSUME("00", "消费"),
    RECHARGE("01", "充值"),
    REFUND("02", "退款");

    private final String code;
    private final String name;

    OrderType(String code, String name){
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
