package com.cloudpick.yunna.ui;

import android.os.Bundle;
import android.support.design.widget.TabLayout;
import android.support.v4.app.Fragment;
import android.support.v4.view.ViewPager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.cloudpick.yunna.ui.adapter.OrderFragmentAdapter;

/**
 * Created by maxwell on 17-12-7.
 */

public class OrderFragment extends Fragment {

    public static final String ARG_OBJECT = "object";

    private ViewPager viewPager;

    @Override
    public void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState){
        View v = inflater.inflate(R.layout.fragment_order, container, false);

        viewPager = (ViewPager)v.findViewById(R.id.pager);
        OrderFragmentAdapter adapter = new OrderFragmentAdapter(getChildFragmentManager());
        viewPager.setAdapter(adapter);

        TabLayout tabLayout = (TabLayout)v.findViewById(R.id.tab_layout);
        tabLayout.setupWithViewPager(viewPager);
        return v;
    }

    @Override
    public void onResume(){
        super.onResume();
    }
}
