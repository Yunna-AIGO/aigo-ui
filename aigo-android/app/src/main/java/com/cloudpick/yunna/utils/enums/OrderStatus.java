package com.cloudpick.yunna.utils.enums;

/**
 * Created by maxwell on 17-12-25.
 */

public enum OrderStatus {
    INIT("init", "待付款"),
    IN_PAYMENT("in_payment", "支付中"),
    SUCCESS("success", "订单支付成功"),
    TIMEOUT("timeout", "订单过期"),
    CLOSED("closed", "订单关闭"),
    REFUND_SUCCESS("refund_success", "退款成功"),
    REFUND_FAIL("refund_fail", "退款失败"),
    REFUND_INPROCESS("refund_inprocess", "退款中");



    private final String code;
    private final String name;

    OrderStatus(String code, String name){
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
