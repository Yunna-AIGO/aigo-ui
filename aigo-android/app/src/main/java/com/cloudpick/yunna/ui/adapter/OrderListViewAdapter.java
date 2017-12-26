package com.cloudpick.yunna.ui.adapter;

import android.graphics.Paint;
import android.view.LayoutInflater;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.ListAdapter;
import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.ImageView;

import com.cloudpick.yunna.model.Order;
import com.cloudpick.yunna.ui.R;
import com.cloudpick.yunna.utils.enums.OrderStatus;

import java.util.ArrayList;

/**
 * Created by maxwell on 17-12-8.
 */

public class OrderListViewAdapter extends BaseAdapter implements ListAdapter {

    private ArrayList<Order> data;
    private int itemLayoutId;
    private LayoutInflater inflater;
    private OrderItemClickListener listener;

    public OrderListViewAdapter(int itemLayoutId, Context context, OrderItemClickListener listener)
    {
        this.data = new ArrayList<Order>();
        this.itemLayoutId = itemLayoutId;
        this.listener = listener;
        inflater = LayoutInflater.from(context);
    }

    @Override
    public int getCount(){
        return data.size();
    }

    @Override
    public Object getItem(int position)
    {
        return data.get(position);
    }
    @Override
    public long getItemId(int position)
    {
        return position;
    }

    @Override
    public View getView(int position, View view, ViewGroup viewGroup){
        Order order = (Order)data.get(position);
        if(view == null)
        {
            view = inflater.inflate(itemLayoutId, null);
            view.setTag(order.getOrderId());
        }
        ((TextView)view.findViewById(R.id.lv_item_day)).setText(order.getDayOfWeek());
        ((TextView)view.findViewById(R.id.lv_item_date)).setText(order.getDate());
        ((TextView)view.findViewById(R.id.lv_item_store)).setText(order.getOrderDesc());
        ((ImageView)view.findViewById(R.id.lv_item_img)).setImageResource(R.drawable.store);
        ((TextView)view.findViewById(R.id.lv_item_amount)).setText(order.getDiscountPrice(true));
        if(order.hasDiscount()){
            TextView tv = view.findViewById(R.id.lv_item_orgn_amount);
            tv.setText(order.getOrderAmount(true));
            tv.getPaint().setFlags(Paint.STRIKE_THRU_TEXT_FLAG);
        }
        Button btn_pay = (Button)view.findViewById(R.id.btn_pay);
        if(order.unPaid()){
            btn_pay.setVisibility(View.VISIBLE);
            btn_pay.setOnClickListener((v)->{
                if(listener != null){
                    listener.payOrder(order);
                }
            });
        }else{
            btn_pay.setVisibility(View.INVISIBLE);
        }
        return view;
    }

    public void addNewItems(ArrayList<Order> orders){
        if(orders != null){
            data.addAll(orders);
            notifyDataSetChanged();
        }
    }

    public void clearItems(){
        data.clear();
        notifyDataSetChanged();
    }

    public void setDataSource(ArrayList<Order> orders){
        data.clear();
        if(orders != null){
            data.addAll(orders);
        }
        notifyDataSetChanged();
    }

    public interface OrderItemClickListener{
        void payOrder(Order order);
    }
}
