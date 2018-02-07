package com.cloudpick.yunna.model;

/**
 * Created by maxwell on 18-2-6.
 */

public class TradeInfo extends BaseModel {

    //公共
    private String orderId;
    private String transId;

    //for alipay
    private String orderInfo;

    //for wechat
    private String appId;
    private String noncestr;
    private String partnerId;
    private String prepayId;
    private String sign;
    private String timestamp;
    private String wxPackage;

    public String getOrderInfo() {
        return orderInfo;
    }

    public String getOrderId() {
        return orderId;
    }

    public String getTransId() {
        return transId;
    }

    public String getAppId() {
        return appId;
    }

    public String getNoncestr() {
        return noncestr;
    }

    public String getPartnerId() {
        return partnerId;
    }

    public String getPrepayId() {
        return prepayId;
    }

    public String getSign() {
        return sign;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public String getWxPackage() {
        return wxPackage;
    }

    public TradeInfo(){
    }
}
