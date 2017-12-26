package com.cloudpick.yunna.utils.enums;


/**
 * Created by maxwell on 17-12-26.
 */

public enum AlipayResultStatus {
    SUCCEEDED("9000", "订单支付成功"),
    DEALING("8000", "正在处理中..."),
    FAILED("4000", "订单支付失败"),
    CANCEL("6001", "操作已经取消"),
    ERROR("6002", "订单支付错误，请检查网络是否连接"),
    UNKNOWN("6004", "订单支付错误，请检查网络是否连接");

    private final String code;
    private final String name;


    AlipayResultStatus(String code, String name){
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
