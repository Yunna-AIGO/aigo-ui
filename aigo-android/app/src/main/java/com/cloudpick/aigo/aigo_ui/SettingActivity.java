package com.cloudpick.aigo.aigo_ui;

import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.TextView;

import com.cloudpick.aigo.utils.Constants;

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
    }



    public static Intent newIntent(Context packageContext){
        Intent intent = new Intent(packageContext, SettingActivity.class);
        return intent;
    }
}
