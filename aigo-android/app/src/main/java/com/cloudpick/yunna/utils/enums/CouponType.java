package com.cloudpick.yunna.utils.enums;

/**
 * Created by maxwell on 17-12-20.
 */

public enum CouponType {
    CASH_DISCOUNT("CASH_DISCOUNT");

    private final String value;

    CouponType(String value){
        this.value = value;
    }

    public String getValue(){
        return value;
    }
}