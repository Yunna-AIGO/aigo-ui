package com.cloudpick.yunna.ui;

import android.content.Context;
import android.content.Intent;
import android.support.v7.widget.Toolbar;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.MotionEvent;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.cloudpick.yunna.R;
import com.cloudpick.yunna.controller.SettingController;
import com.cloudpick.yunna.ui.base.BaseActivity;
import com.cloudpick.yunna.utils.ShapeUtil;
import com.cloudpick.yunna.utils.Tools;
import com.cloudpick.yunna.utils.enums.FeedbackType;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class CreateFeedbackActivity extends BaseActivity {

    private SettingController controller = null;
    private FeedbackType feedbackType = FeedbackType.ADVICE;
    private ShapeUtil selectedStyle = ShapeUtil.DefaultButtonShape(false);
    private ShapeUtil unselectedStyle = ShapeUtil.CommonButtonShape();



    @BindView(R.id.tb_feedback)
    Toolbar toolbar;
    @BindView(R.id.et_feedback_content)
    EditText et_feedback_content;
    @BindView(R.id.btn_feedback_advice)
    Button btn_feedback_advice;
    @BindView(R.id.btn_feedback_problem)
    Button btn_feedback_problem;
    @BindView(R.id.btn_commit_feedback)
    Button btn_commit_feedback;

    @Override
    protected int getContentViewId(){
        return R.layout.activity_create_feedback;
    }

    @Override
    protected void initView(Bundle savedInstanceState){
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
        ShapeUtil.TextAreaShape().render(et_feedback_content);
        ShapeUtil.DefaultButtonShape(true).render(btn_commit_feedback);
        selectedStyle.render(btn_feedback_advice);
        unselectedStyle.render(btn_feedback_problem);
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
        for(int i=0;i<btnList.length;i++){
            if(btnList[i].getId() == btn.getId()){
                fontColor = getResources().getColor(R.color.colorDefault);
                selectedStyle.render(btnList[i]);
            }else{
                fontColor = getResources().getColor(R.color.colorBlack);
                unselectedStyle.render(btnList[i]);
            }
            btnList[i].setTextColor(fontColor);
        }
    }

    @OnClick(R.id.btn_commit_feedback)
    void commitFeedback(View v){
        String content = et_feedback_content.getText().toString();
        if(TextUtils.isEmpty(content)){
            Tools.ToastMessage(CreateFeedbackActivity.this, R.string.message_feedback_content_empty);
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
