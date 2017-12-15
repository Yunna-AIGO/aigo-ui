package com.cloudpick.yunna.ui;

import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ListView;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;

import com.cloudpick.yunna.model.Order;
import com.cloudpick.yunna.model.User;
import com.cloudpick.yunna.utils.Constants;
import com.cloudpick.yunna.utils.Resp;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.scwang.smartrefresh.layout.SmartRefreshLayout;
import com.scwang.smartrefresh.layout.api.RefreshLayout;
import com.scwang.smartrefresh.layout.listener.OnLoadmoreListener;
import com.scwang.smartrefresh.layout.listener.OnRefreshListener;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;


public class OrdersFragment extends Fragment {

    private static final String LOG_TAG = "OrdersFragment";

    private ListView orderListView;

    private Integer pageNum = 0;
    private boolean isPageEnd = false;
    private boolean operationResult = true;
    private ArrayList<Order> orders;
    private OrderListViewAdapter adapter = null;

    private SmartRefreshLayout pullToRefreshLayout;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.fragment_orders, container, false);
        initComponent(v);
        return v;
    }

    private void initComponent(View v){
        orderListView = (ListView)v.findViewById(R.id.lv_order);
        pullToRefreshLayout = (SmartRefreshLayout)v.findViewById(R.id.layout_items);
        pullToRefreshLayout.setOnRefreshListener(new OnRefreshListener() {
            @Override
            public void onRefresh(RefreshLayout refreshlayout) {
                refreshOrders();
                refreshlayout.finishRefresh(1000, operationResult);
//                if(operationResult && !isPageEnd){
//                    refreshlayout.setEnableLoadmore(true);
//                }
            }
        });
        pullToRefreshLayout.setOnLoadmoreListener(new OnLoadmoreListener() {
            @Override
            public void onLoadmore(RefreshLayout refreshlayout) {
                loadMoreOrders();
                refreshlayout.finishLoadmore(800, operationResult);
//                if(operationResult && isPageEnd){
//                    refreshlayout.setEnableLoadmore(false);
//                }
            }
        });
        pullToRefreshLayout.setEnableLoadmoreWhenContentNotFull(true);
        refreshOrders();
    }

    private void refreshOrders(){
        Log.d("oooo", "refreshOrders");
        new Thread(new Runnable() {
            @Override
            public void run() {
                pageNum = 0;
                isPageEnd = false;
                orders = getOrders();
                getActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        boolean hasOrder = orders != null && orders.size() > 0;
                        getView().findViewById(R.id.layout_empty).setVisibility(hasOrder? View.INVISIBLE:View.VISIBLE);
                        getView().findViewById(R.id.layout_items).setVisibility(hasOrder? View.VISIBLE:View.INVISIBLE);
                        if(hasOrder){
                            adapter = new OrderListViewAdapter(R.layout.order_item, getView().getContext(), orders);
                            orderListView.setAdapter(adapter);
                            orderListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                                @Override
                                public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                                    Log.d(LOG_TAG, i+"");
                                    Intent intent = OrderDetailActivity.newIntent(
                                            getContext(), ((Order)adapter.getItem(i)).getOrderId());
                                    startActivity(intent);
                                }
                            });
                        }
                    }
                });
            }
        }).start();
    }

    private void loadMoreOrders(){
        Log.d("oooo", "loadMoreOrders");
        new Thread(new Runnable() {
            @Override
            public void run() {
                orders = getOrders();
                getActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        boolean hasOrder = orders != null && orders.size() > 0;
                        if(hasOrder){
                            adapter.addNewItems(orders);
                            adapter.notifyDataSetChanged();
                        }
                    }
                });
            }
        }).start();
    }

    private ArrayList<Order> getOrders(){
        operationResult = true;
        try{
            if(isPageEnd){
                Log.d("oooo", "page end");
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
            Request request = new Request.Builder().url(url).build();
            Response response = new OkHttpClient().newCall(request).execute();
            String json = response.body().string();
            Type objectType = new TypeToken<Resp<ArrayList<Order>>>(){}.getType();
            Resp<ArrayList<Order>> resp = new Gson().fromJson(json, objectType);
            if(resp.getCode().equals(Constants.RESP_SUCCESS)){
                ArrayList<Order> orderList = resp.getData();
                isPageEnd = orderList.size() < Constants.ORDER_PAGE_SIZE;
                if(orderList.size() == Constants.ORDER_PAGE_SIZE){
                    pageNum += 1;
                }
                return orderList;
            }else{
                return new ArrayList<Order>();
            }
        }catch (IOException ex){
            System.out.println(ex.getMessage());
            operationResult = false;
            return null;
        }
    }
}
