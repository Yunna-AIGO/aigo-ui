package com.cloudpick.yunna.ui;

import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListView;

import java.util.ArrayList;
import java.util.Map;

import com.alipay.sdk.app.PayTask;
import com.cloudpick.yunna.controller.OrderListController;
import com.cloudpick.yunna.model.Order;
import com.cloudpick.yunna.ui.adapter.OrderListViewAdapter;
import com.cloudpick.yunna.utils.Constants;
import com.cloudpick.yunna.utils.Tools;
import com.cloudpick.yunna.utils.enums.AlipayResultStatus;
import com.cloudpick.yunna.utils.enums.OrderStatus;
import com.scwang.smartrefresh.layout.SmartRefreshLayout;
import com.scwang.smartrefresh.layout.api.RefreshLayout;

import butterknife.BindView;
import butterknife.ButterKnife;

public class OrdersFragment extends Fragment {

    private static final String LOG_TAG = "OrdersFragment";

    private OrderListController controller = null;

    @BindView(R.id.lv_order)
    ListView orderListView;
    @BindView(R.id.layout_items)
    SmartRefreshLayout pullToRefreshLayout;
    @BindView(R.id.layout_empty)
    SmartRefreshLayout emptyLayout;

    private ArrayList<Order> orders;
    private OrderListViewAdapter adapter = null;



    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.fragment_orders, container, false);
        controller = new OrderListController(getContext());
        ButterKnife.bind(this, v);
        initComponent(v);
        return v;
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
            getActivity().runOnUiThread(()->{
                boolean hasOrder = orders != null && orders.size() > 0;
                emptyLayout.setVisibility(hasOrder? View.INVISIBLE:View.VISIBLE);
                pullToRefreshLayout.setVisibility(hasOrder? View.VISIBLE:View.INVISIBLE);
                adapter.setDataSource(orders);
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
                public void failure(String msg) {
                    Tools.ToastMessage(getContext(), msg);
                }

                @Override
                public void ok() {
                    order.setStatus(OrderStatus.SUCCESS.getCode());
                    adapter.notifyDataSetChanged();
                }
            });
        });
        dlg.show();
    }
}
