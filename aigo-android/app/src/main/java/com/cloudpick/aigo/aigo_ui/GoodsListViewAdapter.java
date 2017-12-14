package com.cloudpick.aigo.aigo_ui;

import android.content.Context;
import android.graphics.Bitmap;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.ListAdapter;
import android.widget.TextView;

import com.cloudpick.aigo.model.Goods;
import com.nostra13.universalimageloader.core.DisplayImageOptions;
import com.nostra13.universalimageloader.core.ImageLoader;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by maxwell on 17-12-8.
 */

public class GoodsListViewAdapter extends BaseAdapter implements ListAdapter {

    private List<Goods> data;
    private int itemLayoutId;
    private LayoutInflater inflater;

    public GoodsListViewAdapter(int itemLayoutId, Context context, List<Goods> data)
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
        Goods goods = (Goods)data.get(position);
        if(view == null)
        {
            view = inflater.inflate(itemLayoutId, null);
            view.setTag(goods);
        }

        ((TextView)view.findViewById(R.id.lv_goods_name)).setText(goods.getGoodsName());
        ((TextView)view.findViewById(R.id.lv_goods_amtInfo)).setText(goods.getGoodsAmtInfo());

        DisplayImageOptions options = new DisplayImageOptions.Builder()
//                .showImageOnLoading(R.drawable.ic_stub)
//                .showImageOnFail(R.drawable.ic_error)
                .cacheInMemory(true)
                .cacheOnDisk(true)
                .bitmapConfig(Bitmap.Config.RGB_565)
                .build();

        ImageLoader.getInstance().displayImage(
                goods.getGoodsPhotoUrl(),
                (ImageView)view.findViewById(R.id.lv_goods_img),
                options);
        return view;
    }

//    @Override
//    public boolean isEnabled(int position){
//        //禁用点击
//        return false;
//    }
}
