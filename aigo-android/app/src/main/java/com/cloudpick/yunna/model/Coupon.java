package com.cloudpick.yunna.model;

import android.text.TextUtils;

import com.cloudpick.yunna.utils.DateUtil;
import com.cloudpick.yunna.utils.enums.CouponType;

/**
 * Created by maxwell on 17-12-20.
 */

public class Coupon {

    private String amount = "";
    private String fromDate = "";
    private String toDate = "";
    private String couponType = CouponType.CASH_DISCOUNT.getCode();
    private String couponDesc = "";
//    private CouponType couponType = CouponType.CASH_DISCOUNT;

    public String getCouponAmt() {
        if(TextUtils.isEmpty(amount)){
            return "0";
        }
        return amount;
    }

    public String getFromDate() {
        return DateUtil.getDate(fromDate);
    }

    public String getToDate() {
        return DateUtil.getDate(toDate);
    }

    public String getCouponType() {
        return couponType;
    }

    public String getCouponDesc(){
        return couponDesc;
    }


    public String getCouponCategory(){
        CouponType ct = CouponType.CASH_DISCOUNT;
        try{
            ct = CouponType.valueOf(couponType);
        }catch (Exception e){
        }

        switch (ct){
            case CASH_DISCOUNT:
                return "通用券";
            default:
                return "通用券";
        }
    }

    public String getCouponLongDesc(){
        return getCouponAmt() + "元" + getCouponDesc();
    }

    public String getCouponInstructions(){
        return "无使用门槛";
    }

    public String getCouponExpiredIn(){
        return "有效期：" + getFromDate() + " 至 " + getToDate();
    }

    public Coupon(){

    }
}
