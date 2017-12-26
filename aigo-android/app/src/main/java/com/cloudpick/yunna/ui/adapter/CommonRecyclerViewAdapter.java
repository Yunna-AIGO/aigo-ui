package com.cloudpick.yunna.ui.adapter;

import android.content.Context;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import java.util.ArrayList;

/**
 * Created by maxwell on 17-12-25.
 */

public class CommonRecyclerViewAdapter<T> extends RecyclerView.Adapter<CommonRecyclerViewAdapter.ViewHolder<T>> {

    private ArrayList<T> dataList;
    private LayoutInflater mInflater;
    private int layoutId;
    private ItemBinder<T> binder;
    private OnRecyclerItemClickListener itemClickListener;

    public CommonRecyclerViewAdapter(Context context,
                                     int layoutId,
                                     OnRecyclerItemClickListener itemClickListener,
                                     ItemBinder<T> binder){
        this.mInflater = LayoutInflater.from(context);
        this.dataList = new ArrayList<T>();
        this.layoutId = layoutId;
        this.binder = binder;
        this.itemClickListener = itemClickListener;
    }

    /**
     * item显示类型
     * @param parent
     * @param viewType
     * @return
     */
    @Override
    public CommonRecyclerViewAdapter.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = mInflater.inflate(layoutId, parent,false);
        ViewHolder viewHolder = new CommonRecyclerViewAdapter.ViewHolder(view);
        view.setOnClickListener((v)->{
            if(itemClickListener != null){
                itemClickListener.onItemClick(v, (int)view.getTag());
            }
        });
        return viewHolder;
    }
    /**
     * 数据的绑定显示
     * @param holder
     * @param position
     */
    @Override
    public void onBindViewHolder(CommonRecyclerViewAdapter.ViewHolder holder, int position) {
        T data = dataList.get(position);
        holder.bindData(data, binder);
        holder.itemView.setTag(position);
    }

    @Override
    public int getItemCount() {
        return dataList.size();
    }

    public T getItem(int position){
        if(position < 0 || position >= dataList.size()){
            return null;
        }else{
            return dataList.get(position);
        }
    }

    public ArrayList<T> getDataSource(){
        return dataList;
    }

    //添加数据
    public void addItem(T data, int  position) {
        if(data == null){
            return;
        }
        if(position < 0){
            position = 0;
        }
        if(position > dataList.size()){
            position = dataList.size();
        }
        dataList.add(position, data);
        notifyItemInserted(position);
    }
    //删除数据
    public void removeItem(T data) {
        int position = dataList.indexOf(data);
        if(position < 0){
            return;
        }
        dataList.remove(position);
        notifyItemRemoved(position);
    }

    public void appendItems(ArrayList<T> datas){
        if(datas == null){
            return;
        }
        dataList.addAll(datas);
        notifyDataSetChanged();
    }

    public void clearItems(){
        dataList.clear();
        notifyDataSetChanged();
    }

    public void setDataSource(ArrayList<T> datas){
        dataList.clear();
        if(datas != null){
            dataList.addAll(datas);
        }
        this.notifyDataSetChanged();
    }

    public static class ViewHolder<T> extends RecyclerView.ViewHolder {
        public View itemView;
        public ViewHolder(View itemView){
            super(itemView);
            this.itemView = itemView;
        }

        public void bindData(T data, ItemBinder<T> binder){
            binder.bindData(data, itemView);
        }
    }

    public interface ItemBinder<T>{
        void bindData(T data, View v);
    }

    public interface OnRecyclerItemClickListener{
        void onItemClick(View view, int position);
    }
}




