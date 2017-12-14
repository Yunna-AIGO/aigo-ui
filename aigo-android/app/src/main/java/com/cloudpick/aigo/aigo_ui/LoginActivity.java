package com.cloudpick.aigo.aigo_ui;

import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.EditText;
import android.widget.Toast;

import com.cloudpick.aigo.model.User;
import com.cloudpick.aigo.utils.Constants;
import com.cloudpick.aigo.utils.Resp;
import com.cloudpick.aigo.utils.enums.ThirdType;
import com.google.gson.Gson;

import java.io.IOException;
import java.util.HashMap;
import java.util.Timer;
import java.util.TimerTask;
import java.util.regex.Pattern;
import java.util.regex.Matcher;
import java.util.Map;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;


public class LoginActivity extends AppCompatActivity {

    private boolean captchaSended = false;
    private String sendSMSResult = "";
    private int time = 60;
    private Timer timer = new Timer();
    private TimerTask task;

    private Button btn_sendCaptcha;
    private Button btn_login;
    private EditText et_mobile;
    private EditText et_captcha;

    private Resp<Map<String,String>> loginResult;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        initComponents();
    }



    private void initComponents(){
        Toolbar toolbar = (Toolbar)findViewById(R.id.tb_login);
        setSupportActionBar(toolbar);
//        toolbar.setNavigationIcon(R.drawable.back);

        btn_sendCaptcha = (Button)findViewById(R.id.btn_get_captcha);
        btn_login = (Button)findViewById(R.id.btn_login);
        et_mobile = (EditText)findViewById(R.id.et_mobile);
        et_captcha = (EditText)findViewById(R.id.et_captcha);

        btn_sendCaptcha.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                sendSMS(et_mobile.getText().toString());
            }
        });

        btn_login.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view){
                login(et_mobile.getText().toString(), et_captcha.getText().toString());
            }
        });

        et_mobile.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {
            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                checkButtonReady(charSequence.toString(), et_captcha.getText().toString());
            }

            @Override
            public void afterTextChanged(Editable editable) {
            }
        });

        et_captcha.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {
            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                checkButtonReady(et_mobile.getText().toString(), charSequence.toString());
            }

            @Override
            public void afterTextChanged(Editable editable) {
            }
        });

        ((TextView)findViewById(R.id.txt_service_terms)).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                viewTermOfService();
            }
        });

    }

    private void checkButtonReady(String mobile, String captcha){
        boolean validMobile = isValidMobile(mobile);
        boolean validCaptcha = isValidCaptcha(captcha);

        btn_sendCaptcha.setEnabled(validMobile && !captchaSended);
        btn_login.setEnabled(validMobile && validCaptcha);
    }

    private boolean isValidMobile(String mobile){
        Pattern p = Pattern.compile("^1[0-9]{10}$");
        Matcher m = p.matcher(mobile);
        return m.matches();
    }

    private boolean isValidCaptcha(String captcha){
        return captcha.length() == 6;
    }

    private void sendSMS(String mobile){
        try{
            Request request = new Request.Builder()
                    .url(String.format(Constants.URL_SENDSMS, mobile))
                    .build();
            Call call = new OkHttpClient().newCall(request);
            call.enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {
                    System.out.println(e.getMessage());
                }

                @Override
                public void onResponse(Call call, Response response) throws IOException {
                    String json = response.body().string();
                    Resp<?> r = new Gson().fromJson(json, Resp.class);
                    captchaSended = Constants.RESP_SUCCESS.equals(r.getCode());
                    sendSMSResult = r.getMessage();
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            String msg = getResources().getString(
                                    captchaSended? R.string.sms_send_success : R.string.sms_send_failure);
                            if(!captchaSended){
                                msg += sendSMSResult;
                            }
                            Toast.makeText(getApplicationContext(), msg, Toast.LENGTH_LONG).show();
                            if(captchaSended){
                                btn_sendCaptcha.setEnabled(false);
                                et_captcha.requestFocus();
                                startCountdown();
                            }
                        }
                    });
                }
            });
        }catch(Exception ex){
            System.out.println(ex.getMessage());
        }
    }

    private void startCountdown(){
        task = new TimerTask() {
            @Override
            public void run() {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        if (time <= 0) {
                            btn_sendCaptcha.setEnabled(true);
                            btn_sendCaptcha.setText(R.string.btn_get_captcha_title);
                            captchaSended = false;
                            task.cancel();
                        } else {
                            btn_sendCaptcha.setText(time + getResources().getString(R.string.send_after_second));
                        }
                        time--;
                    }
                });
            }
        };
        time = 60;
        timer.schedule(task, 0, 1000);
    }

    private void login(String mobile, String smsCode){
        try{
            Map<String, String> data = new HashMap<>();
            data.put("mobile", mobile);
            data.put("smsCode", smsCode);
            RequestBody body = RequestBody.create(MediaType.parse("application/json; charset=utf-8"),
                    new Gson().toJson(data));
            Request request = new Request.Builder()
                    .url(Constants.URL_ENTRY)
                    .post(body)
                    .build();
            Call call = new OkHttpClient().newCall(request);
            call.enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {
                    System.out.println(e.getMessage());
                }

                @Override
                public void onResponse(Call call, Response response) throws IOException {
                    String json = response.body().string();
                    loginResult = new Gson().fromJson(json, Resp.class);
                    //save user info
                    User.getUser().saveToken(
                            loginResult.getData().get(Constants.KEY_USER_ID),
                            loginResult.getData().get(Constants.KEY_TOKEN));
                    final boolean isSigned = PaymentActivity.isSigned(ThirdType.ALIPAY);
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            if(loginResult.getCode().equals(Constants.RESP_SUCCESS)){
                                if(isSigned){
                                    Intent intent = MainActivity.newIntent(LoginActivity.this);
                                    startActivity(intent);
                                    LoginActivity.this.finish();
                                }else{
                                    Intent intent = PaymentActivity.newIntent(
                                            LoginActivity.this,
                                            Constants.OPT_SHOW_SKIP_IN_PAYMENT_ACTIVITY,
                                            true);
                                    startActivity(intent);
                                }
                            }else{
                                Toast.makeText(
                                        getApplicationContext(),
                                        getResources().getText(R.string.login_success_failure) + ":" + loginResult.getMessage() ,
                                        Toast.LENGTH_LONG).show();
                            }
                        }
                    });
                }
            });
        }catch(Exception ex){
            System.out.println(ex.getMessage());
        }
    }

    private void viewTermOfService(){
        Intent intent = new Intent(LoginActivity.this, TermOfServiceActivity.class);
        startActivity(intent);
    }



    public static Intent newIntent(Context packageContext){
        Intent intent = new Intent(packageContext, LoginActivity.class);
        return intent;
    }
}







