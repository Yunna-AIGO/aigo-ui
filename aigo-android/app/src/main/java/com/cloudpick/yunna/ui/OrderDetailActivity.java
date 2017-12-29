package com.cloudpick.yunna.ui;


import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Paint;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.cloudpick.yunna.controller.OrderDetailController;
import com.cloudpick.yunna.model.Feedback;
import com.cloudpick.yunna.model.Order;
import com.cloudpick.yunna.ui.fragment.GoodsListFragment;
import com.cloudpick.yunna.utils.enums.FeedbackStatus;

import java.util.ArrayList;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class OrderDetailActivity extends AppCompatActivity {

    public static final int REQUEST_CODE_APPEAL_RESULT = 0;

    private static final String ORDER_ID = "com.cloudpick.yunna.ui.orderId";

    private OrderDetailController controller = null;
    private Order order = null;
    private Feedback feedback = null;

    @BindView(R.id.tb_order_detail)
    Toolbar toolbar;
    @BindView(R.id.tv_orderId)
    TextView tv_orderId;
    @BindView(R.id.tv_storeName)
    TextView tv_storeName;
    @BindView(R.id.tv_date)
    TextView tv_date;
    @BindView(R.id.tv_orderAmount)
    TextView tv_orderAmount;
    @BindView(R.id.tv_orderOrgnAmount)
    TextView tv_orderOrgnAmount;
    @BindView(R.id.tv_orderStatus)
    TextView tv_orderStatus;
    @BindView(R.id.btn_order_appeal)
    Button btn_order_appeal;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_order_detail);
        controller = new OrderDetailController(OrderDetailActivity.this);
        ButterKnife.bind(this);
        initComponent();
    }

    private void initComponent(){
        setSupportActionBar(toolbar);
        toolbar.setNavigationIcon(R.drawable.back);
        toolbar.setNavigationOnClickListener((v)->{
            OrderDetailActivity.this.finish();
        });
        controller.loadOrderDetail(getIntent().getStringExtra(ORDER_ID),
                new OrderDetailController.loadOrderAction() {
                    @Override
                    public void failure() {
                        setOrderInfo(null);
                    }
                    @Override
                    public void ok(Order order) {
                        setOrderInfo(order);
                    }
                });
        tv_orderOrgnAmount.getPaint().setFlags(Paint.STRIKE_THRU_TEXT_FLAG);
    }

    @OnClick(R.id.btn_order_appeal)
    void btnOrderAppealClick(View view){
        int tag = (int)view.getTag();
        if(tag == 1){
            orderAppeal();
        }else if(tag == 2){
            viewFeedback();
        }
    }

    private void orderAppeal(){
        if(order != null && order.paid()){
            //申诉前检查order是否可被申诉
            Intent intent = OrderAppealActivity.newIntent(OrderDetailActivity.this, order);
            startActivityForResult(intent, REQUEST_CODE_APPEAL_RESULT);
        }
    }

    private void viewFeedback(){
        if(feedback != null){
            startActivity(AppealFeedbackDetailActivity.newIntent(
                    OrderDetailActivity.this, feedback, order.getGoodsList()));
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (resultCode != Activity.RESULT_OK) {
            return;
        }
        if (requestCode == REQUEST_CODE_APPEAL_RESULT) {
            if (data == null) {
                return;
            }
            boolean commitSuccess = OrderAppealActivity.wasCommitSuccess(data);
            if(commitSuccess){
                setButtonAsStatus(FeedbackStatus.ACCEPT.getName());
            }
        }
    }

    private void setButtonAsAppeal(){
        btn_order_appeal.setVisibility(View.VISIBLE);
        btn_order_appeal.setEnabled(true);
        btn_order_appeal.setText(R.string.btn_order_appeal_title);
        btn_order_appeal.setTag(1);
    }

    private void setButtonAsStatus(String status){
        btn_order_appeal.setVisibility(View.VISIBLE);
        btn_order_appeal.setEnabled(false);
        btn_order_appeal.setText(status);
        btn_order_appeal.setTag(0);
    }

    private void setButtonAsDone(){
        btn_order_appeal.setVisibility(View.VISIBLE);
        btn_order_appeal.setEnabled(true);
        btn_order_appeal.setText(FeedbackStatus.DONE.getName());
        btn_order_appeal.setTag(2);
    }


    private void setOrderInfo(Order orderInfo){
        this.order = orderInfo;
        tv_orderId.setText("");
        tv_storeName.setText("");
        tv_date.setText("");
        tv_orderOrgnAmount.setText("");
        tv_orderAmount.setText("");
        tv_orderStatus.setText("");
        if(orderInfo != null){
            tv_orderId.setText(orderInfo.getOrderId());
            tv_storeName.setText(orderInfo.getOrderDesc());
            tv_date.setText(orderInfo.getPayTime());
            tv_orderStatus.setText(orderInfo.getStatusName());
            tv_orderAmount.setText(orderInfo.getDiscountPrice(false));
            if(orderInfo.hasDiscount()){
                tv_orderOrgnAmount.setText(orderInfo.getOrderAmount(false));
            }
            if(!orderInfo.paid()){
                btn_order_appeal.setVisibility(View.INVISIBLE);
            }else{
                //检查订单的申诉状态，调整按钮类型
                controller.checkOrderFeedbackStatus(orderInfo.getOrderId(), new OrderDetailController.checkAction() {
                    @Override
                    public void failure() {
                        btn_order_appeal.setVisibility(View.INVISIBLE);
                    }
                    @Override
                    public void ok(Feedback fb) {
                        if(fb == null){
                            setButtonAsAppeal();
                        }else{
                            feedback = fb;
                            if(fb.isDone()){
                                setButtonAsDone();
                            }else{
                                setButtonAsStatus(fb.getFeedbackStatus().getName());
                            }
                        }
                    }
                });
            }
        }
        Fragment frag = GoodsListFragment.newInstance(
                orderInfo==null?new ArrayList<>():orderInfo.getGoodsList());
        FragmentManager fm = getSupportFragmentManager();
        FragmentTransaction tran = fm.beginTransaction();
        tran.add(R.id.fragment_container_goods_list, frag);
        tran.commit();
    }

    public static Intent newIntent(Context packageContext, String orderId){
        Intent intent = new Intent(packageContext, OrderDetailActivity.class);
        intent.putExtra(ORDER_ID, orderId);
        return intent;
    }
}
