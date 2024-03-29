package com.cloudpick.yunna.ui;

import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.LinearLayout;
import android.widget.Spinner;
import android.widget.Switch;
import android.widget.TextView;

import com.cloudpick.yunna.R;
import com.cloudpick.yunna.controller.SettingController;
import com.cloudpick.yunna.ui.base.BaseActivity;
import com.cloudpick.yunna.ui.settings.payment.PaymentActivity;
import com.cloudpick.yunna.utils.Define;
import com.cloudpick.yunna.utils.NotificationHelper;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class SettingActivity extends BaseActivity {

    private static final String TAG = "CloudPick";

    private SettingController controller = null;

    @BindView(R.id.tb_setting)
    Toolbar toolbar;
    @BindView(R.id.tv_version)
    TextView tv_version;
    @BindView(R.id.sp_token_expiredIn)
    Spinner sp_token_expiredIn;
    @BindView(R.id.sw_notification)
    Switch sw_notification;
    @BindView(R.id.ll_notification)
    LinearLayout ll_notification;

    //override
    @Override
    protected int getContentViewId(){
        return R.layout.activity_setting;
    }

    @Override
    protected void initView(Bundle savedInstanceState){
        controller = new SettingController(SettingActivity.this);
        ButterKnife.bind(this);
        initComponent();
    }

    @Override
    protected void onResume(){
        super.onResume();
        Log.d(TAG, "setting view on resume");
        sw_notification.setChecked(NotificationHelper.getInstance().isEnabled());
    }


    //bind event
    @OnClick(R.id.btn_payment_config)
    void btnPaymentConfigClick(View v){
        Intent intent = PaymentActivity.newIntent(
                SettingActivity.this, false, false);
        startActivity(intent);
    }

    @OnClick(R.id.sw_notification)
    void toggleNotificationStatus(View v){
        NotificationHelper.getInstance().setNotificationStatus();
    }


    private void initComponent(){
        setSupportActionBar(toolbar);
        toolbar.setNavigationIcon(R.drawable.back);
        toolbar.setNavigationOnClickListener((v)->{
            SettingActivity.this.finish();
        });
        tv_version.setText(Define.getAppVersion());
        sp_token_expiredIn.setSelection(controller.getTokenExpiredIn(), true);
        sp_token_expiredIn.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener(){
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int pos, long id) {
                String[] expiredInArray = getResources().getStringArray(R.array.expiredin);
                controller.setTokenExpiredIn(expiredInArray[pos]);
            }
            @Override
            public void onNothingSelected(AdapterView<?> parent) {
            }
        });
        ll_notification.setVisibility(View.GONE);
        sw_notification.setChecked(NotificationHelper.getInstance().isEnabled());
        if(Build.VERSION.SDK_INT < Build.VERSION_CODES.KITKAT){
            ll_notification.setVisibility(View.GONE);
        }else{
            ll_notification.setVisibility(View.VISIBLE);
        }
    }




    public static Intent newIntent(Context packageContext){
        Intent intent = new Intent(packageContext, SettingActivity.class);
        return intent;
    }
}
