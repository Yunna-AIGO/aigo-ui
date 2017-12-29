package com.cloudpick.yunna.ui;

import android.content.Context;
import android.content.Intent;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.widget.TextView;

import com.cloudpick.yunna.model.Feedback;
import com.cloudpick.yunna.model.Goods;
import com.cloudpick.yunna.ui.fragment.GoodsListFragment;

import java.util.ArrayList;

import butterknife.BindView;
import butterknife.ButterKnife;

public class AppealFeedbackDetailActivity extends AppCompatActivity {

    private static final String FEEDBACK_OBJECT_KEY = "com.cloudpick.yunna.ui.feedbackObjectKey";
    private static final String GOODS_LIST_KEY = "com.cloudpick.yunna.ui.goodsListKey";

    private Feedback feedback = null;
    private ArrayList<Goods> goodsList;

    @BindView(R.id.tb_feedback)
    Toolbar toolbar;
    @BindView(R.id.tv_orderId)
    TextView tv_orderId;
    @BindView(R.id.tv_appeal_desc)
    TextView tv_appeal_desc;
    @BindView(R.id.tv_handle_result)
    TextView tv_handle_result;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_appeal_feedback_detail);
        Intent data = getIntent();
        feedback = data.getParcelableExtra(FEEDBACK_OBJECT_KEY);
        goodsList = data.getParcelableArrayListExtra(GOODS_LIST_KEY);
        ButterKnife.bind(this);
        initComponent();

    }

    private void initComponent(){
        setSupportActionBar(toolbar);
        toolbar.setNavigationIcon(R.drawable.back);
        toolbar.setNavigationOnClickListener((v)->{
            AppealFeedbackDetailActivity.this.finish();
        });

        tv_orderId.setText(getResources().getString(R.string.tv_orderId_title) + "：" + feedback.getOrderNo());
        tv_appeal_desc.setText(feedback.getDesc());
        //tv_handle_result.setText(feedback.getHandleResult());
        tv_handle_result.setText("fdasfdasdfasdfasdfasdfsadfoipjklxcjvoi  asiodfjlzxcvjuoi xziocfvuj soioasij fdsiaou fasoiu fdsaoiu fdsaoi oi");

        //load goods list
        Fragment frag = GoodsListFragment.newInstance(goodsList);
        FragmentManager fm = getSupportFragmentManager();
        FragmentTransaction tran = fm.beginTransaction();
        tran.add(R.id.fragment_container_goods_list, frag);
        tran.commit();
    }


    public static Intent newIntent(Context packageContext, Feedback feedback, ArrayList<Goods> goodsList){
        Intent intent = new Intent(packageContext, AppealFeedbackDetailActivity.class);
        intent.putExtra(FEEDBACK_OBJECT_KEY, feedback);
        intent.putExtra(GOODS_LIST_KEY, goodsList);
        return intent;
    }
}
