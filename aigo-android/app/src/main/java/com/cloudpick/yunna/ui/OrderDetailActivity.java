package com.cloudpick.yunna.ui;

import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.TextView;

import com.cloudpick.yunna.model.Order;
import com.cloudpick.yunna.utils.Constants;
import com.cloudpick.yunna.utils.Resp;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.io.IOException;
import java.lang.reflect.Type;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class OrderDetailActivity extends AppCompatActivity {

    private static final String LOG_TAG = "OrderDetailActivity";
    private static final String ORDER_ID = "com.cloudpick.com.cloudpick.yunna.ui.orderId";

    private Order orderInfo = null;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_order_detail);

        initComponent();
    }

    private void initComponent(){
        Toolbar toolbar = (Toolbar)findViewById(R.id.tb_order_detail);
        setSupportActionBar(toolbar);
        toolbar.setNavigationIcon(R.drawable.back);
        toolbar.setNavigationOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                OrderDetailActivity.this.finish();
            }
        });

        loadOrderDetail(getIntent().getStringExtra(ORDER_ID));
    }

    private void loadOrderDetail(String orderId){
        if(orderId == ""){
            setOrderInfo(null);
        }else{
            String url = String.format(Constants.URL_ORDER_INFO, orderId);
            Request request = new Request.Builder().url(url).build();
            Call call = new OkHttpClient().newCall(request);
            call.enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {
                    System.out.println(e.getMessage());
                }
                @Override
                public void onResponse(Call call, Response response) throws IOException {
                    String json = response.body().string();
                    Type objectType = new TypeToken<Resp<Order>>(){}.getType();
                    Resp<Order> resp = new Gson().fromJson(json, objectType);
                    if(resp.getCode().equals(Constants.RESP_SUCCESS)){
                        orderInfo = resp.getData();
                        runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                setOrderInfo(orderInfo);
                            }
                        });
                    }
                }
            });
        }
    }

    private void setOrderInfo(Order orderInfo){
        if(orderInfo == null){
            ((TextView)findViewById(R.id.tv_storeName)).setText("门店：");
            ((TextView)findViewById(R.id.tv_date)).setText("日期：");
            ((TextView)findViewById(R.id.tv_orderAmount)).setText("金额：");
            ((TextView)findViewById(R.id.tv_orderStatus)).setText("状态：");
        }else{
            ((TextView)findViewById(R.id.tv_storeName)).setText("门店：" + orderInfo.getOrderDesc());
            ((TextView)findViewById(R.id.tv_date)).setText("日期：" + orderInfo.getPayTime());
            ((TextView)findViewById(R.id.tv_orderAmount)).setText("金额：" + orderInfo.getOrderAmount());
            ((TextView)findViewById(R.id.tv_orderStatus)).setText("状态：" + orderInfo.getFormattedStatus());

            ListView goodsListView = (ListView)findViewById(R.id.lv_goods);
            GoodsListViewAdapter adapter = new GoodsListViewAdapter(
                    R.layout.goods_item, this,orderInfo.getGoodsList());
            goodsListView.setAdapter(adapter);
            goodsListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                    Log.d(LOG_TAG, i+"");
                }
            });
            setListViewHeightBasedOnChildren(goodsListView);
        }
    }

    public void setListViewHeightBasedOnChildren(ListView lv){
        if (lv == null) {
            return;
        }
        ListAdapter listAdapter = lv.getAdapter();
        if (listAdapter == null) {
            return;
        }
        int totalHeight = 0;
        for (int i = 0; i < listAdapter.getCount(); i++) {
            View listItem = listAdapter.getView(i, null, lv);
            listItem.measure(0, 0);
            totalHeight += listItem.getMeasuredHeight();
        }
        ViewGroup.LayoutParams params = lv.getLayoutParams();
        params.height = totalHeight + (lv.getDividerHeight() * (listAdapter.getCount() - 1));
        lv.setLayoutParams(params);
    }



    public static Intent newIntent(Context packageContext, String orderId){
        Intent intent = new Intent(packageContext, OrderDetailActivity.class);
        intent.putExtra(ORDER_ID, orderId);
        return intent;
    }
}
