package com.cloudpick.yunna.ui.dialog;

import android.content.Context;
import android.graphics.drawable.GradientDrawable;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.support.v7.app.AlertDialog;
import android.text.TextUtils;
import android.view.View;
import android.widget.TextView;

import com.cloudpick.yunna.ui.R;
import com.cloudpick.yunna.utils.ShapeUtil;
import com.wang.avi.AVLoadingIndicatorView;

import butterknife.BindView;
import butterknife.ButterKnife;

/**
 * Created by maxwell on 18-1-5.
 */

public class LoadingDialog extends AlertDialog {


    @BindView(R.id.avi_loading)
    AVLoadingIndicatorView avi_loading;
    @BindView(R.id.ll_loading_dialog)
    View ll_loading_dialog;
    @BindView(R.id.tv_loading_title)
    TextView tv_loading_title;
    @BindView(R.id.tv_loading_subTitle)
    TextView tv_loading_subTitle;


    private String title;
    private String subTitle;
    private LoadingAction action = null;
    private Handler handler = null;

    private LoadingDialog(Context context, Builder builder){
        super(context);
        if(TextUtils.isEmpty(builder.title)){
            this.title = context.getResources().getString(R.string.message_loading_dialog_please_wait);
        }else{
            this.title = builder.title;
        }
        this.subTitle = builder.subTitle;
        this.action = builder.action;
        this.handler = new Handler(Looper.getMainLooper());
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.dialog_loading);
        try {
            getWindow().setBackgroundDrawableResource(android.R.color.transparent);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        ButterKnife.bind(this);
        initDialog();
    }

    private void initDialog(){
        setCanceledOnTouchOutside(false);
        setCancelable(false);
        new ShapeUtil.Builder()
                .setBorderWidth(0)
                .setColor(R.color.colorDarkBlack)
                .build().render(ll_loading_dialog);
        tv_loading_title.setText(title);
        if(!TextUtils.isEmpty(subTitle)){
            tv_loading_subTitle.setVisibility(View.VISIBLE);
            tv_loading_subTitle.setText(subTitle);
        }
    }


    public void loading(){
        this.show();
        avi_loading.smoothToShow();
        new Thread(()->{
            if(this.action != null){
                try{
                    Object result = this.action.exec();
                    handler.post(()->{
                        this.action.onComplete(result);
                    });
                }catch (Exception e){
                    e.printStackTrace();
                }
            }
            handler.post(()->{
                this.dismiss();
                avi_loading.smoothToHide();
            });
        }).start();
    }


    public static class Builder{
        private String title = "";
        private String subTitle = "";
        private LoadingAction action = null;


        public LoadingDialog build(Context context){
            return new LoadingDialog(context, this);
        }

        public Builder setTitle(String title){
            this.title = title;
            return this;
        }

        public Builder setSubTitle(String subTitle){
            this.subTitle = subTitle;
            return this;
        }

        public Builder setLoadingAction(LoadingAction action){
            this.action = action;
            return this;
        }
    }

    public interface LoadingAction{
        /**
         *
         * 执行与UI无关的耗时操作
         *
         * @return
         */
        Object exec();

        /**
         *
         * 耗时操作完成
         * onComplete中的操作无需考虑UI线程问题
         *
         * @param param exec执行返回的结果
         */
        void onComplete(Object param);
    }
}
