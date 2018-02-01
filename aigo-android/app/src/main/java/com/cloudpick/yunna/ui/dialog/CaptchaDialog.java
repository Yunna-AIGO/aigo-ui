package com.cloudpick.yunna.ui.dialog;

import android.app.Dialog;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.PorterDuff;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.MotionEvent;
import android.view.View;
import android.view.Window;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.cloudpick.yunna.R;
import com.cloudpick.yunna.ui.base.BaseActivity;
import com.cloudpick.yunna.utils.Constants;
import com.cloudpick.yunna.utils.ShapeUtil;
import com.cloudpick.yunna.utils.Tools;
import com.cloudpick.yunna.utils.event.DelayClickListener;
import com.nostra13.universalimageloader.core.DisplayImageOptions;
import com.nostra13.universalimageloader.core.ImageLoader;

import butterknife.BindView;
import butterknife.ButterKnife;

import static com.nostra13.universalimageloader.core.ImageLoader.getInstance;

/**
 * Created by maxwell on 18-2-1.
 *
 * 调用show方法前必须把调用setOwnerActivity方法，为其设置一个BaseActivity的activity
 */

public class CaptchaDialog extends Dialog implements View.OnClickListener {


    //fields
    private String captchaUrl = "";
    private DialogOperation operation = null;
    private DisplayImageOptions displayImageOptions = null;

    @BindView(R.id.et_captcha)
    EditText et_captcha;
    @BindView(R.id.img_captcha)
    ImageView img_captcha;
    @BindView(R.id.btn_ok)
    Button btn_ok;


    public CaptchaDialog(Context context, String captchaUrl, DialogOperation operation){
        super(context);
        this.captchaUrl = captchaUrl;
        this.operation = operation;
        displayImageOptions = new DisplayImageOptions.Builder()
                .cacheOnDisk(false)
                .cacheInMemory(false)
                .build();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.dialog_captcha);
        ButterKnife.bind(this);
        initDialog();
    }

    /**
     * 获取点击事件
     */
    @Override
    public boolean dispatchTouchEvent(MotionEvent ev) {
        if (ev.getAction() == MotionEvent.ACTION_DOWN) {
            View view = getCurrentFocus();
            if (isShouldHideKeyBord(view, ev)) {
                Tools.hideSoftInput(getContext(), view.getWindowToken());
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


    private void initDialog(){
        getWindow().setLayout(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
//        setCanceledOnTouchOutside(false);
//        setCancelable(false);
        ShapeUtil.DefaultButtonShape(true).render(btn_ok);
        et_captcha.getBackground().setColorFilter(getContext().getResources().getColor(R.color.colorGrey), PorterDuff.Mode.SRC_IN);
        btn_ok.setOnClickListener(this);
        loadImageCaptcha();
        img_captcha.setOnClickListener(new DelayClickListener() {
            @Override
            public void onNoDoubleClick(View v) {
                BaseActivity activity = (BaseActivity)getOwnerActivity();
                if(activity != null){
                    activity.runActivityTask("", "", new BaseActivity.ActivityTaskAction() {
                        @Override
                        public Object execTask() {
                            return operation.getCaptcha();
                        }
                        @Override
                        public void complete(Object param) {
                            captchaUrl = param.toString();
                            activity.runOnUiThread(()->{
                                loadImageCaptcha();
                            });
                        }
                    });
                }
            }
        });
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.btn_ok:
                ok();
                break;
            default:
                break;
        }
    }

    private void ok(){
        String captcha = et_captcha.getText().toString();
        if(TextUtils.isEmpty(captcha)){
            Tools.ToastMessage(getContext(), R.string.et_captcha_placeholder);
            return;
        }
        BaseActivity activity = (BaseActivity)getOwnerActivity();
        activity.runActivityTask("", "", new BaseActivity.ActivityTaskAction() {
            @Override
            public Object execTask() {
                return operation.verifyCaptcha(captcha);
            }
            @Override
            public void complete(Object param) {
                if(param == null){
                    captchaUrl = null;
                }else{
                    captchaUrl = param.toString();
                }
                activity.runOnUiThread(()->{
                    checkVerifyResult();
                });
            }
        });
    }

    private void loadImageCaptcha(){
        et_captcha.setText("");
        if(!TextUtils.isEmpty(captchaUrl)){
            ImageLoader.getInstance().displayImage(Constants.imgUrlPrefix + captchaUrl, img_captcha, displayImageOptions);
        }
    }

    private void checkVerifyResult(){
        if(captchaUrl != null){
            loadImageCaptcha();
        }else{
            dismiss();
        }
    }


    public interface DialogOperation{
        String getCaptcha();
        String verifyCaptcha(String input);
    }


}
