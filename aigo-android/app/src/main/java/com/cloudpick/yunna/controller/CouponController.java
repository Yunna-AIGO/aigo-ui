package com.cloudpick.yunna.controller;

import android.content.Context;
import android.os.Parcel;
import android.util.Log;

import com.cloudpick.yunna.model.Coupon;
import com.cloudpick.yunna.model.User;
import com.cloudpick.yunna.utils.Constants;
import com.cloudpick.yunna.utils.enums.CouponType;
import com.cloudpick.yunna.utils.http.Requests;
import com.cloudpick.yunna.utils.http.Response;
import com.google.gson.reflect.TypeToken;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by maxwell on 17-12-20.
 */

public class CouponController extends BaseController {


    public CouponController(Context context){
        super(context);
    }

    public ArrayList<Coupon> getCoupons(CouponType couponType){
        try{
            Map<String, String> queryParams = new HashMap<>();
            if(couponType != null){
                queryParams.put(Constants.KEY_COUPON_TYPE, couponType.getCode());
            }
            String url = String.format(Constants.URL_COUPON, User.getUser().getUserId());
            Type objectType = new TypeToken<Response<ArrayList<Coupon>>>(){}.getType();
            Response<ArrayList<Coupon>> resp = Requests.get(url, queryParams, objectType);
            if(resp.isSuccess()){
                ArrayList<Coupon> orderList = resp.getData();
                return orderList;
            }else{
                return new ArrayList<Coupon>();
            }
        }catch(IOException e){
            System.out.println(e.getMessage());
            return null;
        }
    }




    public void saveControllerStatus(Parcel out, int flags){

    }

    public void restoreControllerStatus(Parcel in){

    }
}
