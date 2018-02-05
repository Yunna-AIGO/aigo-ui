package com.cloudpick.yunna.utils.enums;

/**
 * Created by maxwell on 17-12-20.
 */

public enum CouponType {
    CASH_DISCOUNT("CASH_DISCOUNT", "现金打折券"),

    ALL("ALL", "所有类型");

    private final String code;
    private final String name;

    CouponType(String code, String name){
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