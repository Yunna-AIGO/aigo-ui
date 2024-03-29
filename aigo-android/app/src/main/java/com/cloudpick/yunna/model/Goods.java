package com.cloudpick.yunna.model;

import android.os.Parcel;
import android.os.Parcelable;

/**
 * Created by maxwell on 17-12-8.
 */

public class Goods extends BaseModel implements Parcelable {

    private String goodsId;
    private String goodsName;
    private String goodsNum;
    private String goodsUnit;
    private String goodsPrice;
    private String goodsPhotoUrl;

    public String getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(String goodsId) {
        this.goodsId = goodsId;
    }

    public String getGoodsName() {
        return goodsName;
    }

    public void setGoodsName(String goodsName) {
        this.goodsName = goodsName;
    }

    public String getGoodsNum() {
        return goodsNum;
    }

    public void setGoodsNum(String goodsNum) {
        this.goodsNum = goodsNum;
    }

    public String getGoodsUnit() {
        return goodsUnit;
    }

    public void setGoodsUnit(String goodsUnit) {
        this.goodsUnit = goodsUnit;
    }

    public String getGoodsPrice() {
        return goodsPrice;
    }

    public void setGoodsPrice(String goodsPrice) {
        this.goodsPrice = goodsPrice;
    }

    public String getGoodsPhotoUrl() {
        return goodsPhotoUrl;
    }

    public void setGoodsPhotoUrl(String goodsPhotoUrl) {
        this.goodsPhotoUrl = goodsPhotoUrl;
    }

    public Goods(){

    }

    public String getGoodsAmtInfo(){
        return "数量: " + goodsNum + goodsUnit + "   |   价格: "+ goodsPrice + "元";
    }



    //implement Parcelable

    public int describeContents()
    {
        return 0;
    }

    public void writeToParcel(Parcel out, int flags)
    {
        out.writeString(goodsId);
        out.writeString(goodsName);
        out.writeString(goodsNum);
        out.writeString(goodsUnit);
        out.writeString(goodsPrice);
        out.writeString(goodsPhotoUrl);
    }

    private Goods(Parcel in)
    {
        goodsId = in.readString();
        goodsName = in.readString();
        goodsNum = in.readString();
        goodsUnit = in.readString();
        goodsPrice = in.readString();
        goodsPhotoUrl = in.readString();
    }

    public static final Parcelable.Creator<Goods> CREATOR = new Parcelable.Creator<Goods>()
    {
        public Goods createFromParcel(Parcel in)
        {
            return new Goods(in);
        }

        public Goods[] newArray(int size)
        {
            return new Goods[size];
        }
    };
}
