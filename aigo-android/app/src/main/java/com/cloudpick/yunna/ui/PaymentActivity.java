package com.cloudpick.yunna.aigo_ui;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.cloudpick.yunna.model.User;
import com.cloudpick.yunna.utils.Constants;
import com.cloudpick.yunna.utils.Resp;
import com.cloudpick.yunna.utils.Tools;
import com.cloudpick.yunna.utils.enums.AgreementStatus;
import com.cloudpick.yunna.utils.enums.TerminalChannel;
import com.cloudpick.yunna.utils.enums.ThirdType;
import com.google.gson.Gson;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class PaymentActivity extends AppCompatActivity {

    private static final String SAVED_STATE = "com.cloudpick.com.cloudpick.yunna.aigo_ui.savedState";

    private static final String SHOW_TOOLBAR_MENU = "com.cloudpick.com.cloudpick.yunna.aigo_ui.showToolbarMenu";
    private static final String NAV_TO_MAIN_ACTIVITY = "com.cloudpick.com.cloudpick.yunna.aigo_ui.navToMainActivity";

    private boolean showToolbarMenu = false;
    private boolean navToMainActivity = false;
    private Map<ThirdType, Boolean> signStatus = new HashMap<>();
    private String msg = "";
    private boolean isBusy = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_payment);
        showToolbarMenu = getIntent().getBooleanExtra(SHOW_TOOLBAR_MENU, false);
        navToMainActivity = getIntent().getBooleanExtra(NAV_TO_MAIN_ACTIVITY, false);
        initComponent();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu){
        if(showToolbarMenu){
            getMenuInflater().inflate(R.menu.menu_payment, menu);
        }
        return true;
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        String scheme = intent.getScheme();
        Uri uri = intent.getData();
        if(scheme != null && scheme.equals(Constants.APP_SCHEME) && navToMainActivity){
            navToMainActivity();
        }else{
            new Thread(new Runnable() {
                @Override
                public void run() {
                    boolean isSigned = isSigned(ThirdType.ALIPAY);
                    signStatus.put(ThirdType.ALIPAY, isSigned);
                    updateAlipaySignStatusUI(isSigned);
                }
            }).start();
        }
    }


    private void initComponent(){
        Toolbar toolbar = (Toolbar)findViewById(R.id.tb_payment);
        setSupportActionBar(toolbar);
        toolbar.setNavigationIcon(R.drawable.back);
        toolbar.setNavigationOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                PaymentActivity.this.finish();
            }
        });
        if(showToolbarMenu){
            toolbar.setOnMenuItemClickListener(new Toolbar.OnMenuItemClickListener() {
                @Override
                public boolean onMenuItemClick(MenuItem item) {
                    switch (item.getItemId()) {
                        case R.id.action_edit:
                            navToMainActivity();
                            break;
                    }
                    return true;
                }
            });
        }
        checkPaymentSignStatus();
    }

    private void checkPaymentSignStatus(){
        //检查完成后再绑定点击事件
        new Thread(new Runnable() {
            @Override
            public void run() {
                signStatus.put(ThirdType.ALIPAY, isSigned(ThirdType.ALIPAY));
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        updateAlipaySignStatusUI(signStatus.get(ThirdType.ALIPAY));
                        RelativeLayout alipayLayout = (RelativeLayout)findViewById(R.id.rl_payment_alipay);
                        ((RelativeLayout)findViewById(R.id.rl_payment_alipay))
                                .setOnClickListener(new View.OnClickListener() {
                                    @Override
                                    public void onClick(final View view) {
                                        if(isBusy){
                                            return;
                                        }
                                        isBusy = true;
                                        new Thread(new Runnable() {
                                            @Override
                                            public void run() {
                                                toggleAlipaySignStatus(view);
                                            }
                                        }).start();
                                    }
                                });
                    }
                });
            }
        }).start();
    }

    private void toggleAlipaySignStatus(View view){
        if(signStatus.get(ThirdType.ALIPAY)){
            Map<String, String> data = new HashMap<>();
            data.put("userId", User.getUser().getUserId());
            data.put("thirdType", ThirdType.ALIPAY.getValue());
            RequestBody body = RequestBody.create(
                    MediaType.parse("application/json; charset=utf-8"),
                    new Gson().toJson(data));
            Request request = new Request.Builder()
                    .url(Constants.URL_DUT_UNSIGN)
                    .post(body)
                    .build();
            try{
                Response response = new OkHttpClient().newCall(request).execute();
                Resp<Map<String, String>> resp = new Gson().fromJson(response.body().string(), Resp.class);
                if(resp.getCode().equals(Constants.RESP_SUCCESS)){
                    msg = getResources().getString(R.string.message_alipay_unsign_success);
                    updateAlipaySignStatusUI(false);
                    signStatus.put(ThirdType.ALIPAY, false);
                }else{
                    msg = getResources().getString(R.string.message_alipay_unsign_failure);
                    if(!resp.getMessage().equals("")){
                        msg += ":" + resp.getMessage();
                    }
                }
            }catch(IOException ex){
                System.out.println(ex.getMessage());
                msg = getResources().getString(R.string.message_alipay_unsign_failure);
            }
        }else{
            if(!Tools.isAppInstalled(PaymentActivity.this, Constants.PACKAGE_NAME_ALIPAY)){
                msg = getResources().getString(R.string.message_alipay_sign_failure);
            }else{
                Map<String, String> data = new HashMap<>();
                data.put("userId", User.getUser().getUserId());
                data.put("terminalChannel", TerminalChannel.ALIPAYAPP.getValue());
                data.put("thirdType", ThirdType.ALIPAY.getValue());
                RequestBody body = RequestBody.create(
                        MediaType.parse("application/json; charset=utf-8"),
                        new Gson().toJson(data));
                Request request = new Request.Builder()
                        .url(Constants.URL_DUT_SIGN)
                        .post(body)
                        .build();
                try{
                    Response response = new OkHttpClient().newCall(request).execute();
                    Resp<Map<String, String>> resp = new Gson().fromJson(response.body().string(), Resp.class);
                    if(resp.getCode().equals(Constants.RESP_SUCCESS)){
                        String signRequestInfo = resp.getData().get(Constants.KEY_SIGN_REQUEST_INFO);
                        signRequestInfo = URLEncoder.encode(signRequestInfo, "utf-8");
                        Uri uri = Uri.parse(Constants.ALIPAY_URL_PREFIX + signRequestInfo);
                        Intent intent = new Intent(Intent.ACTION_VIEW, uri);
                        startActivity(intent);
                        return;
                    }else{
                        msg = getResources().getString(R.string.message_alipay_sign_failure);
                        if(!resp.getMessage().equals("")){
                            msg += ":" + resp.getMessage();
                        }
                    }
                }catch(IOException ex){
                    System.out.println(ex.getMessage());
                    msg = getResources().getString(R.string.message_alipay_unsign_failure);
                }
            }
        }
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Toast.makeText(PaymentActivity.this, msg, Toast.LENGTH_LONG).show();
            }
        });
        isBusy = false;
    }

    private void updateAlipaySignStatusUI(final boolean signed){
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                ((TextView)findViewById(R.id.tv_payment_alipay_option))
                        .setText(signed? R.string.payment_alipay_unsign:R.string.payment_alipay_sign);
                ((ImageView)findViewById(R.id.img_payment_alipay_option))
                        .setImageResource(signed? R.drawable.close:R.drawable.add);
            }
        });
    }

    private void navToMainActivity(){
        Intent intent = MainActivity.newIntent(PaymentActivity.this);
        startActivity(intent);
        PaymentActivity.this.finish();
    }


    public static Intent newIntent(Context packageContext, boolean showToolbarMenu, boolean navToMainActivity){
        Intent intent = new Intent(packageContext, PaymentActivity.class);
        intent.putExtra(SHOW_TOOLBAR_MENU, showToolbarMenu);
        intent.putExtra(NAV_TO_MAIN_ACTIVITY, navToMainActivity);
        return intent;
    }

    public static boolean isSigned(ThirdType thirdType){
        String url = String.format(Constants.URL_DUT_QUERY, User.getUser().getUserId(), thirdType.getValue());
        Request request = new Request.Builder().url(url).build();
        try{
            Response response = new OkHttpClient().newCall(request).execute();
            Resp<Map<String,Object>> resp = new Gson().fromJson(response.body().string(), Resp.class);
            return resp.getCode().equals(Constants.RESP_SUCCESS) &&
                    (boolean)resp.getData().get(Constants.KEY_SIGNED) &&
                    resp.getData().get(Constants.KEY_AGREEMENT_STATUS).toString().equals(AgreementStatus.NORMAL.getValue());
        }catch(IOException ex){
            return false;
        }
    }
}
