package com.cloudpick.yunna.ui;

import android.content.Context;
import android.content.Intent;
import android.support.design.widget.TabLayout;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.widget.FrameLayout;

import com.cloudpick.yunna.controller.CouponController;
import com.cloudpick.yunna.ui.adapter.CouponFragmentAdapter;
import com.cloudpick.yunna.ui.fragment.GoodsListFragment;

import java.util.ArrayList;

import butterknife.BindView;
import butterknife.ButterKnife;

public class CouponActivity extends AppCompatActivity {

    public static final String ARG_OBJECT = "object";
    public static final String COUPON_CONTROLLER = "CouponController";

    private CouponController controller = null;

    @BindView(R.id.tb_coupon)
    Toolbar toolbar;
//    @BindView(R.id.pager_coupon)
//    ViewPager viewPager;
//    @BindView(R.id.tab_layout_coupon)
//    TabLayout tabLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_coupon);
        controller = new CouponController(CouponActivity.this);
        ButterKnife.bind(this);

        initComponent();
    }

    private void initComponent(){
        setSupportActionBar(toolbar);
        toolbar.setNavigationIcon(R.drawable.back);
        toolbar.setNavigationOnClickListener((v)->{
            CouponActivity.this.finish();
        });
        Fragment frag = UnusedCouponFragment.newInstance(controller);
        FragmentManager fm = getSupportFragmentManager();
        FragmentTransaction tran = fm.beginTransaction();
        tran.add(R.id.fl_coupon_container, frag);
        tran.commit();

//        CouponFragmentAdapter adapter = new CouponFragmentAdapter(
//                getSupportFragmentManager(),
//                new String[]{
//                        getResources().getString(R.string.tab_coupon_unused),
//                        getResources().getString(R.string.tab_coupon_used),
//                        getResources().getString(R.string.tab_coupon_expired)
//                }, controller);
//        viewPager.setAdapter(adapter);
//        tabLayout.setupWithViewPager(viewPager);
    }

    public static Intent newIntent(Context packageContext){
        Intent intent = new Intent(packageContext, CouponActivity.class);
        return intent;
    }
}
