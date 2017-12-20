package com.cloudpick.yunna.ui;

import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.cloudpick.yunna.controller.PaymentController;
import com.cloudpick.yunna.utils.Constants;
import com.cloudpick.yunna.utils.enums.ThirdType;

import java.util.HashMap;
import java.util.Map;

import butterknife.BindView;
import butterknife.ButterKnife;

public class PaymentActivity extends AppCompatActivity {

    private static final String SHOW_TOOLBAR_MENU = "com.cloudpick.yunna.ui.showToolbarMenu";
    private static final String NAV_TO_MAIN_ACTIVITY = "com.cloudpick.yunna.ui.navToMainActivity";

    private PaymentController controller = null;

    private boolean showToolbarMenu = false;
    private boolean navToMainActivity = false;
    private Map<ThirdType, Boolean> signStatus = new HashMap<>();
    private boolean isBusy = false;

    @BindView(R.id.tv_payment_alipay_option)
    TextView tv_payment_alipy_option;
    @BindView(R.id.img_payment_alipay_option)
    ImageView img_payment_alipay_option;
    @BindView(R.id.tb_payment)
    Toolbar toolbar;
    @BindView(R.id.rl_payment_alipay)
    RelativeLayout rl_payment_alipay;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_payment);
        showToolbarMenu = getIntent().getBooleanExtra(SHOW_TOOLBAR_MENU, false);
        navToMainActivity = getIntent().getBooleanExtra(NAV_TO_MAIN_ACTIVITY, false);
        controller = new PaymentController(PaymentActivity.this);
        ButterKnife.bind(this);
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
            new Thread(()->{
                boolean isBindingPayment = PaymentController.isBindingPayment(ThirdType.ALIPAY);
                signStatus.put(ThirdType.ALIPAY, isBindingPayment);
                updateAlipaySignStatusUI(isBindingPayment);
            }).start();
        }
    }

    private void initComponent(){
        setSupportActionBar(toolbar);
        toolbar.setNavigationIcon(R.drawable.back);
        toolbar.setNavigationOnClickListener((v)->{
            PaymentActivity.this.finish();
        });
        if(showToolbarMenu){
            toolbar.setOnMenuItemClickListener((item)->{
                switch (item.getItemId()) {
                    case R.id.action_edit:
                        navToMainActivity();
                        break;
                }
                return true;
            });
        }
        checkPaymentSignStatus();
    }

    private void checkPaymentSignStatus(){
        //检查完成后再绑定点击事件
        new Thread(()->{
            signStatus.put(ThirdType.ALIPAY, PaymentController.isBindingPayment(ThirdType.ALIPAY));
            runOnUiThread(()->{
                updateAlipaySignStatusUI(signStatus.get(ThirdType.ALIPAY));
                rl_payment_alipay.setOnClickListener((v)->{
                    if(isBusy){
                        return;
                    }
                    isBusy = true;
                    if(signStatus.get(ThirdType.ALIPAY)){
                        //先提醒用户，再解约
                        new AlertDialog.Builder(PaymentActivity.this)
                                .setTitle(R.string.message_alert)
                                .setMessage(R.string.message_alipay_unsign_alert)
                                .setNegativeButton(R.string.title_cancel, (d, i)->{
                                    isBusy = false;
                                })
                                .setPositiveButton(R.string.title_ok, (d, i)->{
                                    new Thread(()->{
                                        controller.unBindAlipay(new PaymentController.unBindAlipayAction() {
                                            @Override
                                            public void failure(String msg) {
                                                showMessage(msg);
                                            }
                                            @Override
                                            public void ok(String msg) {
                                                showMessage(msg);
                                                updateAlipaySignStatusUI(false);
                                                signStatus.put(ThirdType.ALIPAY, false);
                                            }
                                        });
                                        isBusy = false;
                                    }).start();
                                }).show();
                    }else{
                        new Thread(()->{
                            controller.bindAlipay(new PaymentController.bindAlipayAction() {
                                @Override
                                public void failure(String msg) {
                                    showMessage(msg);
                                }
                                @Override
                                public void ok(Uri uri) {
                                    Intent intent = new Intent(Intent.ACTION_VIEW, uri);
                                    startActivity(intent);
                                }
                            });
                            isBusy = false;
                        }).start();
                    }
                });
            });
        }).start();
    }

    private void updateAlipaySignStatusUI(final boolean isBind){
        runOnUiThread(()->{
            tv_payment_alipy_option.setText(isBind? R.string.payment_alipay_unsign:R.string.payment_alipay_sign);
            img_payment_alipay_option.setImageResource(isBind? R.drawable.close:R.drawable.add);
        });
    }

    private void navToMainActivity(){
        Intent intent = MainActivity.newIntent(PaymentActivity.this);
        startActivity(intent);
        PaymentActivity.this.finish();
    }

    private void showMessage(String msg){
        Toast.makeText(PaymentActivity.this, msg, Toast.LENGTH_SHORT).show();
    }


    public static Intent newIntent(Context packageContext, boolean showToolbarMenu, boolean navToMainActivity){
        Intent intent = new Intent(packageContext, PaymentActivity.class);
        intent.putExtra(SHOW_TOOLBAR_MENU, showToolbarMenu);
        intent.putExtra(NAV_TO_MAIN_ACTIVITY, navToMainActivity);
        return intent;
    }

}
