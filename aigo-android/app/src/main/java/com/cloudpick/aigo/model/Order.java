package com.cloudpick.aigo.model;

import com.cloudpick.aigo.utils.Constants;
import com.cloudpick.aigo.utils.DateUtil;
import com.cloudpick.aigo.utils.Tools;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by maxwell on 17-12-8.
 */

public class Order{

    public static final String ORDER_ID = "OrderId";


    private String ext;
    private String gmtCreate;
    private ArrayList<Goods> goodsList;
    private Double orderAmt;
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

    public void setExt(String ext) {
        this.ext = ext;
    }

    public String getGmtCreate() {
        return gmtCreate;
    }

    public void setGmtCreate(String gmtCreate) {
        this.gmtCreate = gmtCreate;
    }

    public ArrayList<Goods> getGoodsList() {
        return goodsList;
    }

    public void setGoodsList(ArrayList<Goods> goodsList) {
        this.goodsList = goodsList;
    }

    public Double getOrderAmt() {
        return orderAmt;
    }

    public void setOrderAmt(Double orderAmt) {
        this.orderAmt = orderAmt;
    }

    public String getOrderDesc() {
        return orderDesc;
    }

    public void setOrderDesc(String orderDesc) {
        this.orderDesc = orderDesc;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getOrderType() {
        return orderType;
    }

    public void setOrderType(String orderType) {
        this.orderType = orderType;
    }

    public String getPayTime() {
        return payTime;
    }

    public void setPayTime(String payTime) {
        this.payTime = payTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStoreId() {
        return storeId;
    }

    public void setStoreId(String storeId) {
        this.storeId = storeId;
    }

    public Double getUnPaidAmt() {
        return unPaidAmt;
    }

    public void setUnPaidAmt(Double unPaidAmt) {
        this.unPaidAmt = unPaidAmt;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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

    public String getOrderAmount(){
        return "¥" + orderAmt;
    }

    public String getFormattedStatus(){
        return "订单支付成功";
    }



}
