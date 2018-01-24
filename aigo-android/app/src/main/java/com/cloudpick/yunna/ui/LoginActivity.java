package com.cloudpick.yunna.ui;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.cloudpick.yunna.R;
import com.cloudpick.yunna.controller.LoginController;
import com.cloudpick.yunna.ui.base.BaseActivity;
import com.cloudpick.yunna.ui.dialog.CouponNotifyDialog;
import com.cloudpick.yunna.utils.Constants;
import com.cloudpick.yunna.utils.ShapeUtil;
import com.cloudpick.yunna.utils.Tools;
import com.cloudpick.yunna.utils.VersionHelper;

import java.util.Timer;
import java.util.TimerTask;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;
import butterknife.OnTextChanged;


public class LoginActivity extends BaseActivity {

    private LoginController controller = null;

    private int time = 60;
    private Timer timer = new Timer();
    private TimerTask task;

    @BindView(R.id.tb_login)
    Toolbar toolbar;
    @BindView(R.id.btn_get_captcha)
    Button btn_sendCaptcha;
    @BindView(R.id.btn_login)
    Button btn_login;
    @BindView(R.id.et_mobile)
    EditText et_mobile;
    @BindView(R.id.et_captcha)
    EditText et_captcha;

    @Override
    protected int getContentViewId(){
        return R.layout.activity_login;
    }

    @Override
    protected void initView(Bundle savedInstanceState){
        controller = new LoginController(LoginActivity.this);
        ButterKnife.bind(this);
        initComponent();
        new VersionHelper(LoginActivity.this, getIntent()).checkVersion(()->{
            LoginActivity.this.finish();
        });
    }

    private void initComponent(){
        setSupportActionBar(toolbar);
        ShapeUtil.TextOnlyShape().render(et_mobile);
        ShapeUtil.TextOnlyShape().render(et_captcha);
        ShapeUtil.DefaultButtonShape(true).render(btn_login);
        ShapeUtil.CommonButtonShape().render(btn_sendCaptcha);
    }

    @OnClick(R.id.btn_get_captcha)
    void sendSMS(View view){
        String mobile = et_mobile.getText().toString();
        if(!controller.isValidMobile(mobile)){
            Tools.ToastMessage(LoginActivity.this, getResources().getString(R.string.message_mobile_number_error));
            return;
        }
        runActivityTask(getResources().getString(R.string.message_captcha_sending), "", new ActivityTaskAction() {
            @Override
            public Object execTask() {
                return controller.sendSMS(mobile);
            }
            @Override
            public void complete(Object param) {
                if(param instanceof LoginController.SendSMSResult){
                    LoginController.SendSMSResult result = (LoginController.SendSMSResult)param;
                    Tools.ToastMessage(LoginActivity.this, result.getMessage());
                    if(result.isSuccess()){
                        btn_sendCaptcha.setEnabled(false);
                        et_captcha.requestFocus();
                        startCountdown();
                    }
                }
            }
        });
    }

    @OnClick(R.id.btn_login)
    void login(View view){
        runActivityTask(getResources().getString(R.string.message_login), "", null);
        controller.login(et_mobile.getText().toString(), et_captcha.getText().toString(),
            new LoginController.loginAction() {
                @Override
                public void failure(String msg) {
                    Tools.ToastMessage(LoginActivity.this, msg);
                    TerminateFakeActivityTask();
                }
                @Override
                public void ok(boolean isBindingPayment, boolean isCoupon, String couponAmt) {
                    TerminateFakeActivityTask();
                    if(isCoupon && !TextUtils.isEmpty(couponAmt)){
                        CouponNotifyDialog dlg = new CouponNotifyDialog(
                                LoginActivity.this,
                                getResources().getString(R.string.currency_cny) + couponAmt,
                                ()->{
                                    enter(isBindingPayment);
                                });
                        dlg.show();
                    }else{
                        enter(isBindingPayment);
                    }
                }
            });
    }

    private void enter(boolean isBindingPayment){
        if(isBindingPayment){
            Intent intent = MainActivity.newIntent(LoginActivity.this, false);
            startActivity(intent);
        }else{
            Intent intent = PaymentActivity.newIntent(
                    LoginActivity.this,
                    Constants.SHOW_SKIP_IN_BINDING_PAYMENT,
                    true);
            startActivity(intent);
        }
        LoginActivity.this.finish();
    }

    @OnTextChanged(value = R.id.et_mobile, callback = OnTextChanged.Callback.TEXT_CHANGED)
    void onMobileChanged(CharSequence s, int start, int before, int count) {
        checkButtonReady(s.toString(), et_captcha.getText().toString());
    }

    @OnTextChanged(value = R.id.et_captcha, callback = OnTextChanged.Callback.TEXT_CHANGED)
    void onCaptchaChanged(CharSequence s, int start, int before, int count) {
        checkButtonReady(et_mobile.getText().toString(), s.toString());
    }

    @OnClick(R.id.txt_service_terms)
    void viewTermOfService(View view){
        Intent intent = new Intent(LoginActivity.this, TermOfServiceActivity.class);
        startActivity(intent);
    }

    private void checkButtonReady(String mobile, String captcha){
        boolean validMobile = controller.isValidMobile(mobile);
        boolean validCaptcha = controller.isValidCaptcha(captcha);
        btn_login.setEnabled(validMobile && validCaptcha);
        btn_login.setAlpha(validMobile && validCaptcha? 1.0f:0.5f);
    }

    private void startCountdown(){
        task = new TimerTask() {
            @Override
            public void run() {
                runOnUiThread(()->{
                    if (time <= 0) {
                        btn_sendCaptcha.setEnabled(true);
                        btn_sendCaptcha.setText(R.string.btn_get_captcha_title);
                        task.cancel();
                    } else {
                        btn_sendCaptcha.setText(String.format(getResources().getString(R.string.send_after_second),time));
                    }
                    time--;
                });
            }
        };
        time = 60;
        timer.schedule(task, 0, 1000);
    }

    public static Intent newIntent(Context packageContext, boolean checkVersion){
        Intent intent = new Intent(packageContext, LoginActivity.class);
        intent.putExtra(VersionHelper.CHECK_VERSION_KEY, checkVersion);
        return intent;
    }
}
