package com.cloudpick.yunna.ui.fragment;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListAdapter;
import android.widget.ListView;

import com.cloudpick.yunna.model.Goods;
import com.cloudpick.yunna.R;
import com.cloudpick.yunna.ui.adapter.GoodsListViewAdapter;

import java.util.ArrayList;

import butterknife.BindView;
import butterknife.ButterKnife;

/**
 * Created by maxwell on 17-12-27.
 */

public class GoodsListFragment extends Fragment {

    private static final String GOODS_LIST_KEY = "com.cloudpick.yunna.ui.goodsListKey";

    @BindView(R.id.lv_goods)
    ListView lv_goods;

    private ArrayList<Goods> goodsList;

    @Override
    public void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            goodsList = getArguments().getParcelableArrayList(GOODS_LIST_KEY);
        }else{
            goodsList = new ArrayList<>();
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState){
        View v = inflater.inflate(R.layout.fragment_goods_list, container, false);
        ButterKnife.bind(this, v);
        initComponent();
        return v;
    }

    private void initComponent(){
        GoodsListViewAdapter adapter = new GoodsListViewAdapter(R.layout.goods_item, getContext(), goodsList);
        lv_goods.setAdapter(adapter);
        //lv_goods.setOnItemClickListener((adapterView, v, i, l)->{});
        setListViewHeightBasedOnChildren(lv_goods);
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

    public static GoodsListFragment newInstance(ArrayList<Goods> goodsList){
        GoodsListFragment frag = new GoodsListFragment();
        Bundle args = new Bundle();
        args.putParcelableArrayList(GOODS_LIST_KEY, goodsList);
        frag.setArguments(args);
        return frag;
    }
}
