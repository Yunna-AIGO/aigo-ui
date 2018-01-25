package com.cloudpick.yunna.utils.enums;

/**
 * Created by maxwell on 18-1-25.
 */

public enum AppActionTypes{
    APP_ACTION_MAIN("APP_ACTION_MAIN", "app_action_main"),//首页
    APP_ACTION_ORDERLIST("APP_ACTION_ORDERLIST", "app_action_orderlist"),//订单列表
    APP_ACTION_COUPONLIST("APP_ACTION_COUPONLIST", "app_action_couponlist");//优惠券列表

    private final String code;
    private final String name;

    AppActionTypes(String code, String name){
        this.code = code;
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public String getName(){
        return name;
    }
}
