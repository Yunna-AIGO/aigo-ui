package com.cloudpick.yunna.model;

import com.cloudpick.yunna.utils.DateUtil;
import com.cloudpick.yunna.utils.enums.OrderStatus;

import java.util.ArrayList;

/**
 * Created by maxwell on 17-12-8.
 */

public class Order{

    public static final String ORDER_ID = "OrderId";


    private String ext;
    private String gmtCreate;
    private ArrayList<Goods> goodsList;
    private Double orderAmt;
    private String couponAmt;
    private String orderDesc;
    private String orderId;
    private String orderType;
    private String payTime;
    private String status;
    private String storeId;
    private Double unPaidAmt;
    private String userId;

    public String getExt() {
        return ext;
    }

    public String getGmtCreate() {
        return gmtCreate;
    }

    public ArrayList<Goods> getGoodsList() {
        return goodsList;
    }

    public Double getOrderAmt() {
        return orderAmt;
    }

    public String getCouponAmt() {
        return couponAmt;
    }

    public String getOrderDesc() {
        return orderDesc;
    }

    public String getOrderId() {
        return orderId;
    }

    public String getOrderType() {
        return orderType;
    }

    public String getPayTime() {
        return payTime;
    }

    public String getStatus() {
        return status;
    }

    public String getStoreId() {
        return storeId;
    }

    public Double getUnPaidAmt() {
        return unPaidAmt;
    }

    public String getUserId() {
        return userId;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Order(){

    }

    public String getDayOfWeek(){
        try{
            return DateUtil.getDayOfWeek(gmtCreate);
        }catch(Exception e){
            System.out.println(e.getMessage());
            return "";
        }
    }

    public String getDate(){
        try{
            return DateUtil.getShortDate(gmtCreate);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return "";
        }
    }

    public String getOrderAmount(boolean includeCurrencyTag){
        String ret = String.format("%.2f", orderAmt);
        if(includeCurrencyTag){
            ret = "¥" + ret;
        }
        return ret;
    }

    public String getDiscountPrice(boolean includeCurrencyTag){
        Double discountAmt = orderAmt - getCouponAmount();
        String ret = String.format("%.2f", discountAmt);
        if(includeCurrencyTag){
            ret = "¥" + ret;
        }
        return ret;
    }

    public boolean hasDiscount(){
        return getCouponAmount() > 0;
    }

    public String getStatusName(){
        return OrderStatus.valueOf(status.toUpperCase()).getName();
    }

    private Double getCouponAmount(){
        Double couponAmount = 0d;
        try{
            couponAmount = Double.parseDouble(getCouponAmt());
        }catch(Exception e){
            couponAmount = 0d;
        }
        return couponAmount;
    }

    public boolean unPaid(){
        return status.equals(OrderStatus.INIT.getCode()) ||
                status.equals(OrderStatus.TIMEOUT.getCode()) ||
                status.equals((OrderStatus.IN_PAYMENT.getCode()));
    }

}
