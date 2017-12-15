package com.cloudpick.aigo.aigo_ui;

import android.content.Context;
import android.content.Intent;
import android.content.res.Resources;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.internal.BottomNavigationItemView;
import android.support.design.widget.BottomNavigationView;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentActivity;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;

import com.cloudpick.aigo.utils.Tools;

import java.lang.reflect.Method;
import java.util.List;

public class MainActivity extends FragmentActivity {

    private int currentNavigationItemId = -1;

    private BottomNavigationView navigation;
    private Toolbar toolbar;

    private Fragment qrcodeFragment = null;
    private Fragment orderFragment = null;
    private Fragment userCenterFragment = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initComponent();
    }

    private void initComponent(){
        toolbar = (Toolbar)findViewById(R.id.tb_main);
        toolbar.setTitle(R.string.title_qrcode);

        navigation = (BottomNavigationView)findViewById(R.id.navigation);
        navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);
        switchFragment(R.id.navigation_qrcode);
    }

    private BottomNavigationView.OnNavigationItemSelectedListener mOnNavigationItemSelectedListener
            = new BottomNavigationView.OnNavigationItemSelectedListener() {
        @Override
        public boolean onNavigationItemSelected(@NonNull MenuItem item) {
            switch (item.getItemId()) {
                case R.id.navigation_qrcode:
                    switchFragment(R.id.navigation_qrcode);
                    return true;
                case R.id.navigation_order:
                    switchFragment(R.id.navigation_order);
                    return true;
                case R.id.navigation_user_center:
                    switchFragment(R.id.navigation_user_center);
                    return true;
            }
            return false;
        }
    };

    private void switchFragment(int id){
        if(id == currentNavigationItemId){
            return;
        }
        if(currentNavigationItemId == R.id.navigation_qrcode){
            ((QRCodeFragment)qrcodeFragment).stopAutoRefreshQrCode();
        }

        resetMenuIcon();
        Fragment newFragment = null;
        switch(id){
            case R.id.navigation_qrcode:
                if(qrcodeFragment == null){
                    qrcodeFragment = new QRCodeFragment();
                }else{
                    ((QRCodeFragment)qrcodeFragment).startAutoRefreshQrCode();
                }
                newFragment = qrcodeFragment;
                toolbar.setTitle(R.string.title_qrcode);
                navigation.getMenu().findItem(id).setIcon(R.drawable.icon_qrcode_active);
                break;
            case R.id.navigation_order:
                if(orderFragment == null){
                    //orderFragment = new OrderFragment();
                    //目前仅显示订单
                    orderFragment = new OrdersFragment();
                }
                newFragment = orderFragment;
                toolbar.setTitle(R.string.tab_order_title);
                navigation.getMenu().findItem(id).setIcon(R.drawable.icon_order);
                break;
            case R.id.navigation_user_center:
                if(userCenterFragment == null){
                    userCenterFragment = new UserCenterFragment();
                }
                newFragment = userCenterFragment;
                toolbar.setTitle(R.string.title_user_center);
                navigation.getMenu().findItem(id).setIcon(R.drawable.icon_mine_active);
                break;
        }
        FragmentManager fm = getSupportFragmentManager();
        int containerId = R.id.fragment_container;
        FragmentTransaction tran = fm.beginTransaction();
        List<Fragment> fragments = fm.getFragments();
        for(Fragment f: fragments){
            tran.hide(f);
        }
        if(!newFragment.isAdded()){
            tran.add(containerId, newFragment);
        }else{
            tran.show(newFragment);
        }
        tran.commit();
        currentNavigationItemId = id;
    }

    private void resetMenuIcon(){
        navigation.getMenu().findItem(R.id.navigation_qrcode).setIcon(R.drawable.icon_qrcode);
        navigation.getMenu().findItem(R.id.navigation_order).setIcon(R.drawable.icon_order);
        navigation.getMenu().findItem(R.id.navigation_user_center).setIcon(R.drawable.icon_mine);
    }

    @Override
    protected void onResume(){
        super.onResume();
        if(currentNavigationItemId == R.id.navigation_qrcode){
            ((QRCodeFragment)qrcodeFragment).startAutoRefreshQrCode();
        }
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus)
    {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus)
        {
            if(qrcodeFragment != null){
                ((QRCodeFragment)qrcodeFragment).resetQrcodeImageView();
            }
        }
    }

    public static Intent newIntent(Context packageContext){
        Intent intent = new Intent(packageContext, MainActivity.class);
        return intent;
    }

}
