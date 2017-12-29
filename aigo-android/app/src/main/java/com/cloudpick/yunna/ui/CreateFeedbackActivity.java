package com.cloudpick.yunna.ui;

import android.content.Context;
import android.content.Intent;
import android.graphics.drawable.Drawable;
import android.support.v7.widget.Toolbar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.MotionEvent;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.cloudpick.yunna.controller.SettingController;
import com.cloudpick.yunna.utils.Tools;
import com.cloudpick.yunna.utils.enums.FeedbackType;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class CreateFeedbackActivity extends AppCompatActivity {

    private SettingController controller = null;
    private FeedbackType feedbackType = FeedbackType.ADVICE;


    @BindView(R.id.tb_feedback)
    Toolbar toolbar;
    @BindView(R.id.et_feedback_content)
    EditText et_feedback_content;
    @BindView(R.id.btn_feedback_advice)
    Button btn_feedback_advice;
    @BindView(R.id.btn_feedback_problem)
    Button btn_feedback_problem;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_create_feedback);
        controller = new SettingController(CreateFeedbackActivity.this);
        ButterKnife.bind(this);
        initComponent();
    }

    private void initComponent(){
        setSupportActionBar(toolbar);
        toolbar.setNavigationIcon(R.drawable.back);
        toolbar.setNavigationOnClickListener((v)->{
            CreateFeedbackActivity.this.finish();
        });
    }


    @OnClick(R.id.btn_feedback_advice)
    void btnFeedbackAdviceClick(View v){
        setFeedbackType(btn_feedback_advice, FeedbackType.ADVICE);
    }

    @OnClick(R.id.btn_feedback_problem)
    void btnFeedbackProblemClick(View v){
        setFeedbackType(btn_feedback_problem, FeedbackType.PROBLEM);
    }

    private void setFeedbackType(Button btn, FeedbackType ft){
        feedbackType = ft;
        Button[] btnList = new Button[]{btn_feedback_advice, btn_feedback_problem};
        int fontColor;
        Drawable background;
        for(int i=0;i<btnList.length;i++){
            if(btnList[i].getId() == btn.getId()){
                fontColor = getResources().getColor(R.color.colorDefault);
                background = getResources().getDrawable(R.drawable.shape_round_corner_default);
            }else{
                fontColor = getResources().getColor(R.color.colorBlack);
                background = getResources().getDrawable(R.drawable.shape_round_corner);
            }
            btnList[i].setTextColor(fontColor);
            btnList[i].setBackground(background);
        }
    }

    @OnClick(R.id.btn_commit_feedback)
    void commitFeedback(View v){
        String content = et_feedback_content.getText().toString();
        if(TextUtils.isEmpty(content)){
            return;
        }
        controller.commitFeedback(content, feedbackType, new SettingController.commitFeedbackAction() {
            @Override
            public void failure(String msg) {
                Tools.ToastMessage(CreateFeedbackActivity.this, msg);
            }
            @Override
            public void ok() {
                Tools.ToastMessage(CreateFeedbackActivity.this, R.string.commit_success);
                CreateFeedbackActivity.this.finish();
            }
        });
    }


    public static Intent newIntent(Context packageContext){
        Intent intent = new Intent(packageContext, CreateFeedbackActivity.class);
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
                Tools.hideSoftInput(CreateFeedbackActivity.this, view.getWindowToken());
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
