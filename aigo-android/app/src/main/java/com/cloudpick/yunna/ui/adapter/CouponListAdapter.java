package com.cloudpick.yunna.ui.adapter;


import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.cloudpick.yunna.model.Coupon;
import com.cloudpick.yunna.ui.R;

import java.util.ArrayList;

/**
 * Created by maxwell on 17-12-20.
 */

public class CouponListAdapter extends RecyclerView.Adapter<CouponListAdapter.ViewHolder> {


    private ArrayList<Coupon> couponList;
    private LayoutInflater mInflater;

    public CouponListAdapter(Context context, ArrayList<Coupon> couponList){
        this.mInflater = LayoutInflater.from(context);
        this.couponList = couponList;
        if(this.couponList == null){
            this.couponList = new ArrayList<Coupon>();
        }
    }

    /**
     * item显示类型
     * @param parent
     * @param viewType
     * @return
     */
    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = mInflater.inflate(R.layout.coupon_item, parent,false);
        return new ViewHolder(view);
    }
    /**
     * 数据的绑定显示
     * @param holder
     * @param position
     */
    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        Coupon c = couponList.get(position);
        holder.tv_coupon_amount.setText(c.getCouponAmt());
        //holder.tv_coupon_type.setText(c.getCouponCategory());
        holder.tv_coupon_type.setText(c.getCouponDesc());
        holder.tv_coupon_desc.setText(c.getCouponLongDesc());
        holder.tv_coupon_instructions.setText(c.getCouponInstructions());
        holder.tv_coupon_expiredin.setText(c.getCouponExpiredIn());
    }

    @Override
    public int getItemCount() {
        return couponList.size();
    }

    //添加数据
    public void addItem(Coupon c, int  position) {
        if(c == null){
            return;
        }
        if(position < 0){
            position = 0;
        }
        if(position > couponList.size()){
            position = couponList.size();
        }
        couponList.add(position, c);
        notifyItemInserted(position);
    }
    //删除数据
    public void removeItem(Coupon c) {
        int position = couponList.indexOf(c);
        if(position < 0){
            return;
        }
        couponList.remove(position);
        notifyItemRemoved(position);
    }

    public void appendItems(ArrayList<Coupon> coupons){
        if(coupons == null){
            return;
        }
        couponList.addAll(coupons);
        notifyDataSetChanged();
    }

    public void clearItems(){
        couponList.clear();
        notifyDataSetChanged();
    }

    public void setDataSource(ArrayList<Coupon> coupons){
        couponList.clear();
        if(coupons != null){
            couponList.addAll(coupons);
        }
        notifyDataSetChanged();
    }


    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView tv_coupon_amount;
        public TextView tv_coupon_type;
        public TextView tv_coupon_desc;
        public TextView tv_coupon_instructions;
        public TextView tv_coupon_expiredin;
        public ViewHolder(View view){
            super(view);
            tv_coupon_amount = (TextView)view.findViewById(R.id.tv_coupon_amount);
            tv_coupon_type = (TextView)view.findViewById(R.id.tv_coupon_type);
            tv_coupon_desc = (TextView)view.findViewById(R.id.tv_coupon_desc);
            tv_coupon_instructions = (TextView)view.findViewById(R.id.tv_coupon_instructions);
            tv_coupon_expiredin = (TextView)view.findViewById(R.id.tv_coupon_expiredin);

        }
    }
}
