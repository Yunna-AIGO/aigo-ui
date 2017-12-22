package com.cloudpick.yunna.ui.adapter;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;

import com.cloudpick.yunna.controller.CouponController;
import com.cloudpick.yunna.ui.CouponActivity;
import com.cloudpick.yunna.ui.ExpiredCouponFragment;
import com.cloudpick.yunna.ui.OrderFragment;
import com.cloudpick.yunna.ui.OrdersFragment;
import com.cloudpick.yunna.ui.TopupRecordsFragment;
import com.cloudpick.yunna.ui.UnusedCouponFragment;
import com.cloudpick.yunna.ui.UsedCouponFragment;

import java.util.HashMap;

/**
 * Created by maxwell on 17-12-20.
 */

public class CouponFragmentAdapter extends FragmentPagerAdapter {

    private CouponController controller = null;
    private String[] tabs;


    public CouponFragmentAdapter(FragmentManager fm, String[] tabs, CouponController controller){
        super(fm);
        this.tabs = tabs;
        this.controller = controller;
    }

    @Override
    public Fragment getItem(int position){
        Fragment fragment;
        switch (position){
            case 0:
                fragment = new UnusedCouponFragment();
                break;
            case 1:
                fragment = new UsedCouponFragment();
                break;
            case 2:
                fragment = new ExpiredCouponFragment();
                break;
            default:
                fragment = new UnusedCouponFragment();
                break;
        }
        Bundle bundle = new Bundle();
        bundle.putInt(CouponActivity.ARG_OBJECT, position + 1);
        bundle.putParcelable(CouponActivity.COUPON_CONTROLLER, controller);
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
