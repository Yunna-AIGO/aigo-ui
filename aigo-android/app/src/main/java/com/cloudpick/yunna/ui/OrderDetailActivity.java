package com.cloudpick.yunna.ui;

import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.TextView;

import com.cloudpick.yunna.controller.OrderDetailController;
import com.cloudpick.yunna.model.Order;
import com.cloudpick.yunna.ui.adapter.GoodsListViewAdapter;

import butterknife.BindView;
import butterknife.ButterKnife;

public class OrderDetailActivity extends AppCompatActivity {

    private static final String ORDER_ID = "com.cloudpick.yunna.ui.orderId";

    private OrderDetailController controller = null;

    @BindView(R.id.tb_order_detail)
    Toolbar toolbar;
    @BindView(R.id.tv_storeName)
    TextView tv_storeName;
    @BindView(R.id.tv_date)
    TextView tv_date;
    @BindView(R.id.tv_orderAmount)
    TextView tv_orderAmount;
    @BindView(R.id.tv_orderStatus)
    TextView tv_orderStatus;
    @BindView(R.id.lv_goods)
    ListView lv_goods;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_order_detail);
        controller = new OrderDetailController(OrderDetailActivity.this);
        ButterKnife.bind(this);
        initComponent();
    }

    private void initComponent(){
        setSupportActionBar(toolbar);
        toolbar.setNavigationIcon(R.drawable.back);
        toolbar.setNavigationOnClickListener((v)->{
            OrderDetailActivity.this.finish();
        });
        controller.loadOrderDetail(getIntent().getStringExtra(ORDER_ID),
                new OrderDetailController.loadOrderAction() {
                    @Override
                    public void failure() {
                        setOrderInfo(null);
                    }
                    @Override
                    public void ok(Order order) {
                        setOrderInfo(order);
                    }
                });
    }

    private void setOrderInfo(Order orderInfo){
        if(orderInfo == null){
            tv_storeName.setText("门店：");
            tv_date.setText("日期：");
            tv_orderAmount.setText("金额：");
            tv_orderStatus.setText("状态：");
        }else{
            tv_storeName.setText("门店：" + orderInfo.getOrderDesc());
            tv_date.setText("日期：" + orderInfo.getPayTime());
            tv_orderAmount.setText("金额：" + orderInfo.getOrderAmount());
            tv_orderStatus.setText("状态：" + orderInfo.getFormattedStatus());

            GoodsListViewAdapter adapter = new GoodsListViewAdapter(
                    R.layout.goods_item, this,orderInfo.getGoodsList());
            lv_goods.setAdapter(adapter);
            lv_goods.setOnItemClickListener((adapterView, v, i, l)->{});
            try{
                setListViewHeightBasedOnChildren(lv_goods);
            }catch (Exception e){
                System.out.println(e.getMessage());
            }
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
