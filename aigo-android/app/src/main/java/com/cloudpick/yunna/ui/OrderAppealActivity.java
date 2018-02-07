package com.cloudpick.yunna.ui;

import android.content.Context;
import android.content.Intent;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.text.TextUtils;
import android.view.MotionEvent;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.cloudpick.yunna.R;
import com.cloudpick.yunna.controller.OrderAppealController;
import com.cloudpick.yunna.model.Order;
import com.cloudpick.yunna.ui.base.BaseActivity;
import com.cloudpick.yunna.ui.fragment.GoodsListFragment;
import com.cloudpick.yunna.utils.ShapeUtil;
import com.cloudpick.yunna.utils.Tools;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class OrderAppealActivity extends BaseActivity {

    private static final String ORDER_OBJECT_KEY = "com.cloudpick.yunna.ui.orderObjectKey";
    private static final String COMMIT_RESULT_KEY = "com.cloudpick.yunna.ui.appealResultKey";

    private OrderAppealController controller = null;
    private Order order = null;


    @BindView(R.id.tb_order_appeal)
    Toolbar toolbar;
    @BindView(R.id.tv_orderId)
    TextView tv_orderId;
    @BindView(R.id.et_order_appeal_content)
    EditText et_order_appeal_content;
    @BindView(R.id.btn_commit_appeal)
    Button btn_commit_appeal;

    @Override
    protected int getContentViewId(){
        return R.layout.activity_order_appeal;
    }

    @Override
    protected void initView(Bundle savedInstanceState){
        order = getIntent().getParcelableExtra(ORDER_OBJECT_KEY);
        controller = new OrderAppealController(OrderAppealActivity.this);
        ButterKnife.bind(this);
        initComponent();
    }

    private void initComponent(){
        setSupportActionBar(toolbar);
        toolbar.setNavigationIcon(R.drawable.back);
        toolbar.setNavigationOnClickListener((v)->{
            OrderAppealActivity.this.finish();
        });
        ShapeUtil.TextAreaShape().render(et_order_appeal_content);
        ShapeUtil.DefaultButtonShape(true).render(btn_commit_appeal);

        tv_orderId.setText(getResources().getString(R.string.tv_orderId_title) + "：" + order.getOrderId());

        //load goods list
        Fragment frag = GoodsListFragment.newInstance(order.getGoodsList());
        FragmentManager fm = getSupportFragmentManager();
        FragmentTransaction tran = fm.beginTransaction();
        tran.add(R.id.fragment_container_goods_list, frag);
        tran.commit();
    }

    @OnClick(R.id.btn_commit_appeal)
    void commitAppeal(View v){
        String appealDesc = et_order_appeal_content.getText().toString();
        if(TextUtils.isEmpty(appealDesc)){
            Tools.ToastMessage(OrderAppealActivity.this, R.string.message_order_appeal_content_empty);
            return;
        }
        controller.commitAppeal(order, appealDesc, new OrderAppealController.commitAppealAction() {
            @Override
            public void failure(String msg) {
                Tools.ToastMessage(OrderAppealActivity.this, msg);
            }
            @Override
            public void ok() {
                Tools.ToastMessage(OrderAppealActivity.this, R.string.commit_success);
                Intent data = new Intent();
                data.putExtra(COMMIT_RESULT_KEY, true);
                setResult(RESULT_OK, data);
                OrderAppealActivity.this.finish();
            }
        });
    }

    public static boolean wasCommitSuccess(Intent result) {
        return result.getBooleanExtra(COMMIT_RESULT_KEY, false);
    }

    public static Intent newIntent(Context packageContext, Order order){
        Intent intent = new Intent(packageContext, OrderAppealActivity.class);
        intent.putExtra(ORDER_OBJECT_KEY, order);
        return intent;
    }

    /**
     * 获取点击事件
     */
    @Override
    public boolean dispatchTouchEvent(MotionEvent ev) {
        if (ev.getAction() == MotionEvent.ACTION_DOWN) {
            View view = getCurrentFocus();
            if (isShouldHideKeyBord(view, ev)) {
                Tools.hideSoftInput(OrderAppealActivity.this, view.getWindowToken());
            }
        }
        return super.dispatchTouchEvent(ev);
    }

    /**
     * 判定当前是否需要隐藏
     */
    protected boolean isShouldHideKeyBord(View v, MotionEvent ev) {
        if (v != null && (v instanceof EditText)) {
            int[] l = {0, 0};
            v.getLocationInWindow(l);
            int left = l[0], top = l[1], bottom = top + v.getHeight(), right = left + v.getWidth();
            return !(ev.getX() > left && ev.getX() < right && ev.getY() > top && ev.getY() < bottom);
        }
        return false;
    }
}
