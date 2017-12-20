package com.cloudpick.yunna.controller;

import android.content.Context;

import com.cloudpick.yunna.model.Order;
import com.cloudpick.yunna.model.User;
import com.cloudpick.yunna.utils.Constants;
import com.cloudpick.yunna.utils.http.Requests;
import com.cloudpick.yunna.utils.http.Response;
import com.google.gson.reflect.TypeToken;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;


/**
 * Created by maxwell on 17-12-20.
 */

public class OrderListController extends BaseController {

    private boolean isPageEnd = false;
    private int pageNum = 0;

    public OrderListController(Context context){
        super(context);
    }


    public ArrayList<Order> getOrders(){
        try{
            if(isPageEnd){
                return new ArrayList<Order>();
            }
            String url = String.format(Constants.URL_ORDERS,
                    User.getUser().getUserId(),//userId
                    pageNum,//pageNum
                    Constants.ORDER_PAGE_SIZE,//pageSize
                    "success",//orderStatus
                    "00",//orderType
                    "",//startDate
                    "");//endDate
            Type objectType = new TypeToken<Response<ArrayList<Order>>>(){}.getType();
            Response<ArrayList<Order>> resp = Requests.get(url, objectType);
            if(resp.isSuccess()){
                ArrayList<Order> orderList = resp.getData();
                isPageEnd = orderList.size() < Constants.ORDER_PAGE_SIZE;
                if(orderList.size() == Constants.ORDER_PAGE_SIZE){
                    pageNum += 1;
                }
                return orderList;
            }else{
                return new ArrayList<Order>();
            }
        }catch(IOException e){
            System.out.println(e.getMessage());
            return null;
        }
    }

    public void resetPageInfo(){
        isPageEnd = false;
        pageNum = 0;
    }
}
