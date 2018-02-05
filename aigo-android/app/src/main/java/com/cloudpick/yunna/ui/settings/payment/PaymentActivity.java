package com.cloudpick.yunna.ui.settings.payment;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.widget.LinearLayout;

import com.cloudpick.yunna.R;
import com.cloudpick.yunna.controller.PaymentController;
import com.cloudpick.yunna.ui.MainActivity;
import com.cloudpick.yunna.ui.base.BaseActivity;
import com.cloudpick.yunna.utils.Constants;
import com.cloudpick.yunna.utils.enums.ThirdType;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import butterknife.BindView;
import butterknife.ButterKnife;

public class PaymentActivity extends BaseActivity {

    private static final String TAG = "CloudPick";
    private static final String SHOW_TOOLBAR_MENU = "com.cloudpick.yunna.ui.showToolbarMenu";
    private static final String NAV_TO_MAIN_ACTIVITY = "com.cloudpick.yunna.ui.navToMainActivity";

    //fields
    private PaymentController controller = null;
    private boolean showToolbarMenu = false;
    private boolean navToMainActivity = false;
    private ArrayList<IPaymentCard> paymentCards;
    private Map<ThirdType, Boolean> signStatus = new HashMap<>();

    @BindView(R.id.ll_payment_card_container)
    LinearLayout ll_payment_card_container;
    @BindView(R.id.tb_payment)
    Toolbar toolbar;

    //override methods
    @Override
    protected int getContentViewId(){
        return R.layout.activity_payment;
    }

    @Override
    protected void initView(Bundle savedInstanceState){
        showToolbarMenu = getIntent().getBooleanExtra(SHOW_TOOLBAR_MENU, false);
        navToMainActivity = getIntent().getBooleanExtra(NAV_TO_MAIN_ACTIVITY, false);
        controller = new PaymentController(PaymentActivity.this);
        ButterKnife.bind(this);
        initToolbar();
        loadPaymentCard();
        checkPaymentSignStatus(null);
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
        checkPaymentSignStatus(()->{
            if(scheme != null && scheme.equals(Constants.APP_SCHEME) && navToMainActivity){
                boolean flag = false;
                for(IPaymentCard c:paymentCards){
                    if(c.isSigned()){
                        flag = true;
                        break;
                    }
                }
                if(flag){
                    navToMainActivity();
                }
            }
        });
    }

    @Override
    protected void onResume(){
        super.onResume();
        checkPaymentSignStatus(null);
    }

    //private method
    private void initToolbar(){
        setSupportActionBar(toolbar);
        if(!navToMainActivity){
            //不是导航到主页面的话，显示回退按钮
            toolbar.setNavigationIcon(R.drawable.back);
            toolbar.setNavigationOnClickListener((v)->{
                PaymentActivity.this.finish();
            });
        }
        if(showToolbarMenu){
            toolbar.setOnMenuItemClickListener((item)->{
                switch (item.getItemId()) {
                    case R.id.action_skip:
                        navToMainActivity();
                        break;
                }
                return true;
            });
        }
    }

    private void loadPaymentCard(){
        paymentCards = new ArrayList<>();
        paymentCards.add(new AlipayPaymentCard(controller));
        paymentCards.add(new WechatPaymentCard(controller));
        for(IPaymentCard c: paymentCards){
            addFragment(R.id.ll_payment_card_container, c.getPaymentCard(), c.getPaymentCardTag());
        }
    }

    private void checkPaymentSignStatus(Runnable action){
        runActivityTask("", "", new ActivityTaskAction() {
            @Override
            public Object execTask() {
                Map<ThirdType, Boolean> signStatus = PaymentController.getSignedStatus();
                for(IPaymentCard c : paymentCards){
                    Boolean status = signStatus.get(c.getThirdType());
                    if(status == null){
                        status = false;
                    }
                    c.setPaymentCardStatus(status);
                }
                return null;
            }
            @Override
            public void complete(Object param) {
                if(action != null){
                    action.run();
                }
            }
        });
    }

    private void navToMainActivity(){
        Intent intent = MainActivity.newIntent(PaymentActivity.this, false, null);
        startActivity(intent);
        PaymentActivity.this.finish();
    }

    public static Intent newIntent(Context packageContext, boolean showToolbarMenu, boolean navToMainActivity){
        Intent intent = new Intent(packageContext, PaymentActivity.class);
        intent.putExtra(SHOW_TOOLBAR_MENU, showToolbarMenu);
        intent.putExtra(NAV_TO_MAIN_ACTIVITY, navToMainActivity);
        return intent;
    }

}
