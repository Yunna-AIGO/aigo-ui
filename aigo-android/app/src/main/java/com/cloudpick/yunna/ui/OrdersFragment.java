package com.cloudpick.yunna.ui;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.view.Window;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.TextView;

import java.util.ArrayList;

import com.cloudpick.yunna.controller.OrderListController;
import com.cloudpick.yunna.model.Order;
import com.cloudpick.yunna.ui.adapter.OrderListViewAdapter;
import com.cloudpick.yunna.ui.dialog.PayTypeSelectDialog;
import com.cloudpick.yunna.ui.main.MainActivityFragment;
import com.cloudpick.yunna.utils.Tools;
import com.scwang.smartrefresh.layout.SmartRefreshLayout;
import com.scwang.smartrefresh.layout.api.RefreshLayout;

import butterknife.BindView;
import butterknife.ButterKnife;

public class OrdersFragment extends MainActivityFragment {

    private static final String LOG_TAG = "OrdersFragment";

    private OrderListController controller = null;

    @BindView(R.id.lv_order)
    ListView orderListView;
    @BindView(R.id.layout_items)
    SmartRefreshLayout pullToRefreshLayout;
    @BindView(R.id.layout_empty)
    SmartRefreshLayout emptyLayout;
    @BindView(R.id.ll_coupon_notify_layout)
    LinearLayout ll_coupon_notify_layout;
    @BindView(R.id.tv_coupon_notify)
    TextView tv_coupon_notify;


    private ArrayList<Order> orders;
    private String couponAmount = "";
    private OrderListViewAdapter adapter = null;



    @Override
    protected int getLayoutId(){
        return R.layout.fragment_orders;
    }

    @Override
    protected void initView(View view, Bundle savedInstanceState){
        controller = new OrderListController(getContext());
        this.title = getResources().getString(R.string.tab_order_title);
        ButterKnife.bind(this, view);
        initComponent(view);
    }

    private void initComponent(View v){
        adapter = new OrderListViewAdapter(R.layout.order_item, getContext(), (o)->{
            payOrder(o);
        });
        orderListView.setAdapter(adapter);
        orderListView.setOnItemClickListener((adapterView, view, i, l)->{
            Log.d(LOG_TAG, i+"");
            Intent intent = OrderDetailActivity.newIntent(
                    getContext(), ((Order)adapter.getItem(i)).getOrderId());
            startActivity(intent);
        });
        emptyLayout.setOnRefreshListener((layout)->{
            refreshOrders(layout);
        });
        pullToRefreshLayout.setOnRefreshListener((layout)->{
            refreshOrders(layout);
        });
        pullToRefreshLayout.setOnLoadmoreListener((layout)->{
            loadMoreOrders(layout);
        });
        pullToRefreshLayout.setEnableLoadmoreWhenContentNotFull(true);
        refreshOrders(null);
    }

    private void refreshOrders(final RefreshLayout layout){
        new Thread(()->{
            controller.resetPageInfo();
            orders = controller.getOrders();
            couponAmount = controller.getCouponAmount();
            getActivity().runOnUiThread(()->{
                //set order list
                boolean hasOrder = orders != null && orders.size() > 0;
                emptyLayout.setVisibility(hasOrder? View.INVISIBLE:View.VISIBLE);
                pullToRefreshLayout.setVisibility(hasOrder? View.VISIBLE:View.INVISIBLE);
                adapter.setDataSource(orders);
                //set coupon notify
                if(TextUtils.isEmpty(couponAmount)){
                    ll_coupon_notify_layout.setVisibility(View.GONE);
                }else{
                    ll_coupon_notify_layout.setVisibility(View.VISIBLE);
                    String msg = String.format(getContext().getString(R.string.message_unused_coupon_notify), couponAmount);
                    tv_coupon_notify.setText(msg);
                }
                if(layout!=null){
                    layout.finishRefresh(800, orders != null);
                }
            });
        }).start();
    }

    private void loadMoreOrders(final RefreshLayout layout){
        new Thread(()->{
            orders = controller.getOrders();
            getActivity().runOnUiThread(()->{
                boolean hasOrder = orders != null && orders.size() > 0;
                if(hasOrder){
                    adapter.addNewItems(orders);
                }
                if(layout != null){
                    layout.finishLoadmore(500, orders != null);
                }
            });
        }).start();
    }

    private void payOrder(Order order){
        PayTypeSelectDialog dlg = new PayTypeSelectDialog(getContext(), order, (payType) -> {
            controller.payOrder(order, payType, getActivity(), new OrderListController.PayAction() {
                @Override
                public void terminate(String msg){
                    Tools.ToastMessage(getContext(), msg);
                }
                @Override
                public void failure(String msg) {
                    Log.d("ssss", "failure refresh");
                    refreshOrders(null);
                    Tools.ToastMessage(getContext(), msg);
                }
                @Override
                public void ok() {
                    Log.d("ssss", "ok refresh");
                    refreshOrders(null);
//                    order.setStatus(OrderStatus.SUCCESS.getCode());
//                    adapter.notifyDataSetChanged();
                }
            });
        });

        try{
            Window win = dlg.getWindow();
            win.getAttributes().gravity = Gravity.BOTTOM;
            win.setWindowAnimations(R.style.animation_dialog_select_paytype);
        }catch (Exception ex){
            System.out.println(ex.getMessage());
        }
        dlg.show();
    }
}
