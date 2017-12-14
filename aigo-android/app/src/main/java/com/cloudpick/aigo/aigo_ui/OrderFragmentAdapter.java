package com.cloudpick.aigo.aigo_ui;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by maxwell on 17-12-8.
 */

public class OrderFragmentAdapter extends FragmentPagerAdapter {

    private String[] tabs;

    public OrderFragmentAdapter(FragmentManager fm){
        super(fm);
        tabs = new String[]{"订单", "充值记录"};
    }

    @Override
    public Fragment getItem(int position){
        Fragment fragment;
        switch (position){
            case 0:
                fragment = new OrdersFragment();
                break;
            case 1:
                fragment = new TopupRecordsFragment();
                break;
            default:
                fragment = new OrdersFragment();
                break;
        }
        Bundle bundle = new Bundle();
        bundle.putInt(OrderFragment.ARG_OBJECT, position + 1);
        fragment.setArguments(bundle);
        return fragment;
    }

    @Override
    public int getCount(){
        return tabs.length;
    }

    @Override
    public CharSequence getPageTitle(int position){
        if(position >= tabs.length){
            return tabs[0];
        }else{
            return tabs[position];
        }
    }
}
