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

import com.cloudpick.yunna.model.User;
import com.cloudpick.yunna.utils.Constants;

public class SettingActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_setting);

        initComponent();
    }

    private void initComponent(){
        Toolbar toolbar = (Toolbar)findViewById(R.id.tb_setting);
        setSupportActionBar(toolbar);
        toolbar.setNavigationIcon(R.drawable.back);
        toolbar.setNavigationOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                SettingActivity.this.finish();
            }
        });

        ((TextView)findViewById(R.id.tv_version)).setText(Constants.VERSION);
        Spinner spinner = findViewById(R.id.sp_token_expiredIn);
        spinner.setSelection(User.getUser().getTokenExpiredInSelection(), true);
        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener(){
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int pos, long id) {
                String[] expiredInArray = getResources().getStringArray(R.array.expiredin);
                User.getUser().setTokenExpiredIn(expiredInArray[pos]);
            }
            @Override
            public void onNothingSelected(AdapterView<?> parent) {
                System.out.println("123");
            }
        });
    }

    public static Intent newIntent(Context packageContext){
        Intent intent = new Intent(packageContext, SettingActivity.class);
        return intent;
    }
}
