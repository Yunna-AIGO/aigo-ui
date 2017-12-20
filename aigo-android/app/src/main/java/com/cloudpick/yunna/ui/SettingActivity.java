package com.cloudpick.yunna.ui;

import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Spinner;
import android.widget.TextView;

import com.cloudpick.yunna.controller.SettingController;
import com.cloudpick.yunna.model.User;
import com.cloudpick.yunna.utils.Constants;

import butterknife.BindView;
import butterknife.ButterKnife;

public class SettingActivity extends AppCompatActivity {

    private SettingController controller = null;

    @BindView(R.id.tb_setting)
    Toolbar toolbar;
    @BindView(R.id.tv_version)
    TextView tv_version;
    @BindView(R.id.sp_token_expiredIn)
    Spinner sp_token_expiredIn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_setting);
        controller = new SettingController(SettingActivity.this);
        ButterKnife.bind(this);
        initComponent();
    }

    private void initComponent(){
        setSupportActionBar(toolbar);
        toolbar.setNavigationIcon(R.drawable.back);
        toolbar.setNavigationOnClickListener((v)->{
            SettingActivity.this.finish();
        });
        tv_version.setText(Constants.VERSION);
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
    }

    public static Intent newIntent(Context packageContext){
        Intent intent = new Intent(packageContext, SettingActivity.class);
        return intent;
    }
}
