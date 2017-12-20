package com.cloudpick.yunna.ui.adapter;

import android.view.LayoutInflater;
import android.widget.BaseAdapter;
import android.widget.ListAdapter;
import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.ImageView;

import com.cloudpick.yunna.model.Order;
import com.cloudpick.yunna.ui.R;

import java.util.ArrayList;

/**
 * Created by maxwell on 17-12-8.
 */

public class OrderListViewAdapter extends BaseAdapter implements ListAdapter {

    private ArrayList<Order> data;
    private int itemLayoutId;
    private LayoutInflater inflater;

    public OrderListViewAdapter(int itemLayoutId, Context context, ArrayList<Order> data)
    {
        this.data = data;
        this.itemLayoutId = itemLayoutId;
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
    public View getView(int position, View view, ViewGroup viewGroup)
    {
        Order order = (Order)data.get(position);
        if(view == null)
        {
            view = inflater.inflate(itemLayoutId, null);
            view.setTag(order.getOrderId());
        }
        ((TextView)view.findViewById(R.id.lv_item_day)).setText(order.getDayOfWeek());
        ((TextView)view.findViewById(R.id.lv_item_date)).setText(order.getDate());
        ((TextView)view.findViewById(R.id.lv_item_store)).setText(order.getOrderDesc());
        ((TextView)view.findViewById(R.id.lv_item_price)).setText(order.getOrderAmount());
        ((ImageView)view.findViewById(R.id.lv_item_img)).setImageResource(R.drawable.store);
//        ((TextView)view.findViewById(R.id.lv_item_orderid)).setText(order.getOrderId());
        return view;
    }

    public void addNewItems(ArrayList<Order> orders){
        for(Order o: orders){
            data.add(o);
        }
    }
}
