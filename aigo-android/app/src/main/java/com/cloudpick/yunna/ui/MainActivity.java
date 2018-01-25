package com.cloudpick.yunna.ui;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.BottomNavigationView;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;

import com.cloudpick.yunna.R;
import com.cloudpick.yunna.ui.base.BaseActivity;
import com.cloudpick.yunna.ui.main.MainActivityFragment;
import com.cloudpick.yunna.utils.VersionHelper;
import com.cloudpick.yunna.utils.message.AppAction;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

import static com.cloudpick.yunna.utils.Constants.LOG_TAG;

public class MainActivity extends BaseActivity {
    public static final String APP_ACTION_KEY = "com.cloudpick.yunna.ui.appAction";
    public static boolean isAlive = false;

    private int currentNavigationItemId = -1;

    @BindView(R.id.navigation)
    BottomNavigationView navigation;
    @BindView(R.id.tb_main)
    Toolbar toolbar;

    private MainActivityFragment qrcodeFragment = null;
    private MainActivityFragment orderFragment = null;
    private MainActivityFragment userCenterFragment = null;

    private boolean isViewResReady = false;

    @Override
    protected int getContentViewId(){
        return R.layout.activity_main;
    }

    @Override
    protected Fragment getCurrentFragment(){
        return getSupportFragmentManager().findFragmentById(R.id.fragment_container);
    }

    @Override
    protected void initView(Bundle savedInstanceState){
        ButterKnife.bind(this);
        //绑定底部导航切换事件
        navigation.setOnNavigationItemSelectedListener((item)->{
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
        });
        //处理跳转事件
        handleAppAction(getIntent());
        //版本检查
        new VersionHelper(MainActivity.this, getIntent()).checkVersion(()->{
            MainActivity.this.finish();
        });
    }

    @Override
    protected void afterViewCreated(Bundle savedInstanceState){
        isViewResReady = true;
        isAlive = true;
    }

    @OnClick(R.id.tb_main)
    void onToolbarClick(View v){
        Fragment frag = getCurrentFragment();
        if(frag instanceof OrdersFragment){
            ((OrdersFragment)frag).toolbarClicked();
        }
    }

    /**
     * 处理跳转事件
     * @param intent
     */
    private void handleAppAction(Intent intent){
        AppAction action = null;
        if(intent != null){
            action = intent.getParcelableExtra(APP_ACTION_KEY);
        }
        if(action != null){
            Log.d(LOG_TAG, "action is " + action.getAppActionTypes().getName());
            switch(action.getAppActionTypes()){
                case APP_ACTION_ORDERLIST:
                    Log.d(LOG_TAG, "switch to order");
                    switchTo(MainFragment.ORDER);
                    return;
                case APP_ACTION_COUPONLIST:
                    Log.d(LOG_TAG, "switch to qrcode");
                    switchTo(MainFragment.QRCODE);
                    Log.d(LOG_TAG, "start coupon list");
                    startActivity(CouponActivity.newIntent(MainActivity.this));
                    return;
            }
        }else{
            Log.d(LOG_TAG, "action is null");
        }
        Log.d(LOG_TAG, "switch to qrcode");
        switchTo(MainFragment.QRCODE);
    }

    private void switchFragment(int id){
        if(id == currentNavigationItemId){
            return;
        }

        MainActivityFragment frag = null;
        switch(id){
            case R.id.navigation_qrcode:
                if(qrcodeFragment == null){
                    qrcodeFragment = new QRCodeFragment();
                    qrcodeFragment.setTitle(getResources().getString(R.string.title_qrcode));
                }else{
                    qrcodeFragment.setFragmentVisible(true);
                }
                frag = qrcodeFragment;
                break;
            case R.id.navigation_order:
                if(orderFragment == null){
                    //orderFragment = new OrderFragment();
                    //目前仅显示订单
                    orderFragment = new OrdersFragment();
                    orderFragment.setTitle(getResources().getString(R.string.tab_order_title));
                }else{
                    orderFragment.setFragmentVisible(true);
                }
                frag = orderFragment;
                break;
            case R.id.navigation_user_center:
                if(userCenterFragment == null){
                    userCenterFragment = new UserCenterFragment();
                    userCenterFragment.setTitle(getResources().getString(R.string.title_user_center));
                }else{
                    userCenterFragment.setFragmentVisible(true);
                }
                frag = userCenterFragment;
                break;
        }
        if(frag == null){
            return;
        }
        resetMenuIcon(id);
        toolbar.setTitle(frag.getTitle());
        FragmentManager fm = getSupportFragmentManager();
        FragmentTransaction tran = fm.beginTransaction();
        for(Fragment f: fm.getFragments()){
            if(f instanceof MainActivityFragment){
                ((MainActivityFragment)f).setFragmentVisible(false);
            }
            tran.hide(f);
        }
        if(!frag.isAdded()){
            tran.add(R.id.fragment_container, frag);
        }else{
            tran.show(frag);
        }
//        if(isViewResReady){
//            frag.setFragmentVisible(true);
//        }
        tran.commit();
        currentNavigationItemId = id;
    }

    private void resetMenuIcon(int selectedNavItemId){
        int resId = selectedNavItemId == R.id.navigation_qrcode? R.drawable.icon_qrcode_active:R.drawable.icon_qrcode;
        navigation.getMenu().findItem(R.id.navigation_qrcode).setIcon(resId);
        resId = selectedNavItemId == R.id.navigation_order? R.drawable.icon_order_active:R.drawable.icon_order;
        navigation.getMenu().findItem(R.id.navigation_order).setIcon(resId);
        resId = selectedNavItemId == R.id.navigation_user_center? R.drawable.icon_mine_active:R.drawable.icon_mine;
        navigation.getMenu().findItem(R.id.navigation_user_center).setIcon(resId);
    }

    @Override
    protected void onResume(){
        super.onResume();
        Fragment frag = getCurrentFragment();
        if(frag != null && frag instanceof MainActivityFragment){
            ((MainActivityFragment)frag).setFragmentVisible(true);
        }
    }

    @Override
    protected void onPause(){
        super.onPause();
        Fragment frag = getCurrentFragment();
        if(frag != null && frag instanceof MainActivityFragment){
            ((MainActivityFragment)frag).setFragmentVisible(false);
        }
    }

    public void switchTo(MainFragment mainFragment){
        switch(mainFragment){
            case QRCODE:
                navigation.setSelectedItemId(R.id.navigation_qrcode);
                break;
            case ORDER:
                navigation.setSelectedItemId(R.id.navigation_order);
                break;
            case USER_CENTER:
                navigation.setSelectedItemId(R.id.navigation_user_center);
                break;
        }
    }

    public static Intent newIntent(Context packageContext, boolean checkVersion, AppAction action){
        Intent intent = new Intent(packageContext, MainActivity.class);
        intent.putExtra(VersionHelper.CHECK_VERSION_KEY, checkVersion);
        intent.putExtra(APP_ACTION_KEY, action);
        return intent;
    }

    public enum MainFragment {
        QRCODE("QRCODE", "QRCODE"),//QRCODE
        ORDER("ORDER", "ORDER"),//ORDER
        USER_CENTER("USER_CENTER", "USER_CENTER");//USER_CENTER

        private final String code;
        private final String name;

        MainFragment(String code, String name){
            this.code = code;
            this.name = name;
        }

        public String getCode(){
            return code;
        }

        public String getName(){
            return this.name;
        }
    }

}
