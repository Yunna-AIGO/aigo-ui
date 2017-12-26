package com.cloudpick.yunna.model;

import android.text.TextUtils;

import com.cloudpick.yunna.utils.DateUtil;
import com.cloudpick.yunna.utils.enums.CouponType;

/**
 * Created by maxwell on 17-12-20.
 */

public class Coupon {

    private String couponAmt = "";
    private String fromDate = "";
    private String toDate = "";
    private CouponType couponType = CouponType.CASH_DISCOUNT;

    public String getCouponAmt() {
        if(TextUtils.isEmpty(couponAmt)){
            return "0";
        }
        return couponAmt;
    }

    public String getFromDate() {
        return DateUtil.getDate(fromDate);
    }

    public String getToDate() {
        return DateUtil.getDate(toDate);
    }

    public String getCouponType() {
        return couponType.getName();
    }

    public String getCouponCategory(){
        switch (couponType){
            case CASH_DISCOUNT:
                return "通用券";
            default:
                return "通用券";
        }
    }

    public String getCouponDesc(){
        return getCouponAmt() + "元" + getCouponType();
    }

    public String getCouponInstructions(){
        return "";
    }

    public String getCouponExpiredIn(){
        return "有效期：" + getFromDate() + " 至 " + getToDate();
    }

    public Coupon(){

    }
}
