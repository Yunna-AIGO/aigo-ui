package com.cloudpick.yunna.model;

import android.os.Parcel;
import android.os.Parcelable;

import com.cloudpick.yunna.utils.Constants;
import com.cloudpick.yunna.utils.DateUtil;
import com.cloudpick.yunna.utils.enums.OrderStatus;

import java.util.ArrayList;

/**
 * Created by maxwell on 17-12-8.
 */

public class Order extends BaseModel implements Parcelable{


    private String ext;
    private String gmtCreate;
    private ArrayList<Goods> goodsList;
    private Double orderAmt;
    private String couponAmt;
    private String orderDesc;//弃用，兼容老版本
    private String orderId;
    private String orderType;
    private String payTime;
    private String status;
    private String storeId;
    private Double unPaidAmt;
    private String userId;
    private String storeName;
    private String desc;//订单描述
    private ArrayList<String> goodsIdList;
    private int count;

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

    public String getStoreName() {
        return storeName;
    }

    public String getDesc() {
        return desc;
    }

    public ArrayList<String> getGoodsIdList() {
        return goodsIdList;
    }

    public int getCount() {
        return count;
    }

    public Order(){

    }

    public String getDayOfWeek(){
        try{
            return DateUtil.getDayOfWeek(gmtCreate);
        }catch(Exception e){
            return "";
        }
    }

    public String getDate(){
        try{
            return DateUtil.getShortDate(gmtCreate);
        }catch (Exception e){
            return "";
        }
    }

    public String getOrderAmount(boolean includeCurrencyTag){
        try{
            String ret = String.format("%.2f", orderAmt);
            if(includeCurrencyTag){
                ret = "¥" + ret;
            }
            return ret;
        }catch (Exception ex){
            return "";
        }
    }

    public String getDiscountPrice(boolean includeCurrencyTag){
        try{
            Double discountAmt = orderAmt - getCouponAmount();
            String ret = String.format("%.2f", discountAmt);
            if(includeCurrencyTag){
                ret = "¥" + ret;
            }
            return ret;
        }catch (Exception ex){
            return "";
        }
    }

    public boolean hasDiscount(){
        return getCouponAmount() > 0;
    }

    public String getStatusName(){
        return OrderStatus.valueOf(status.toUpperCase()).getName();
    }

    public String getUnpaidAmt(boolean includeCurrencyTag){
        try{
            if(unPaidAmt == 0){
                return "";
            }
            String ret = String.format("%.2f", unPaidAmt);
            if(includeCurrencyTag){
                ret = "¥" + ret;
            }
            return ret;
        }catch (Exception ex){
            return "";
        }
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
                status.equals(OrderStatus.TIMEOUT.getCode());
    }

    public boolean isInPayment(){
        return status.equals(OrderStatus.IN_PAYMENT.getCode());
    }

    public boolean paid(){
        return status.equals(OrderStatus.SUCCESS.getCode());
    }

    public int getGoodsImageCount(){
        if(goodsIdList == null){
            return 0;
        }else{
            return goodsIdList.size();
        }
    }

    public String getGoodsImageUrl(int goodsIdIndex){
        if(goodsIdIndex < 0 || goodsIdIndex >= getGoodsImageCount()){
            return "";
        }
        return Constants.imgUrlPrefix + goodsIdList.get(goodsIdIndex) + ".jpg";
    }

    //implement Parcelable

    public int describeContents()
    {
        return 0;
    }

    public void writeToParcel(Parcel out, int flags)
    {
        out.writeString(ext);
        out.writeString(gmtCreate);
        out.writeString(couponAmt);
        out.writeString(orderDesc);
        out.writeString(orderId);
        out.writeString(orderType);
        out.writeString(payTime);
        out.writeString(status);
        out.writeString(storeId);
        out.writeString(userId);
        out.writeDouble(orderAmt);
        out.writeDouble(unPaidAmt);
        out.writeTypedList(goodsList);
        out.writeString(desc);
        out.writeString(storeName);
        out.writeStringList(goodsIdList);
        out.writeInt(count);
    }

    private Order(Parcel in)
    {
        ext = in.readString();
        gmtCreate = in.readString();
        couponAmt = in.readString();
        orderDesc = in.readString();
        orderId = in.readString();
        orderType = in.readString();
        payTime = in.readString();
        status = in.readString();
        storeId = in.readString();
        userId = in.readString();
        orderAmt = in.readDouble();
        unPaidAmt = in.readDouble();
        goodsList = in.createTypedArrayList(Goods.CREATOR);
        desc = in.readString();
        storeName = in.readString();
        goodsIdList = in.createStringArrayList();
        count = in.readInt();
    }

    public static final Parcelable.Creator<Order> CREATOR = new Parcelable.Creator<Order>()
    {
        public Order createFromParcel(Parcel in)
        {
            return new Order(in);
        }

        public Order[] newArray(int size)
        {
            return new Order[size];
        }
    };

}
