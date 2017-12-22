package com.cloudpick.yunna.ui;


import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.scwang.smartrefresh.layout.SmartRefreshLayout;

import butterknife.BindView;
import butterknife.ButterKnife;

public class UsedCouponFragment extends Fragment {


    @BindView(R.id.layout_coupon_used_empty)
    SmartRefreshLayout emptyLayout;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.fragment_used_coupon, container, false);
//        controller = new OrderListController(getContext());
        ButterKnife.bind(this, v);
//        initComponent(v);

        emptyLayout.setVisibility(View.VISIBLE);
        return v;
    }

}
