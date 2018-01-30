package com.cloudpick.yunna.widget;

import android.os.Bundle;
import android.app.AlertDialog;
import android.view.View;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.cloudpick.yunna.R;
import com.cloudpick.yunna.ui.base.BaseActivity;
import com.cloudpick.yunna.ui.base.BaseFragment;
import com.cloudpick.yunna.utils.ShapeUtil;
import com.cloudpick.yunna.utils.enums.ThirdType;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

/**
 * Created by maxwell on 18-1-29.
 */

public class PaymentCard extends BaseFragment {

    public static final String TAG = "CloudPick";

    // fields
    private final boolean allowUnsign = true;
    private CardOperation operation = null;
    private ThirdType thirdType;
    /**
     * 0-未签约时的content;1-为已签约时的content
     */
    private String[] contents;
    /**
     * 签约状态
     */
    private SignStatus signStatus = SignStatus.UNKNOWN;
    private int cardImageResId = -1;


    @BindView(R.id.rl_payment_card)
    RelativeLayout rl_payment_card;
    @BindView(R.id.tv_payment_title)
    TextView tv_payment_title;
    @BindView(R.id.tv_payment_content)
    TextView tv_payment_content;
    @BindView(R.id.img_payment)
    ImageView img_payment;
    @BindView(R.id.img_payment_option)
    ImageView img_payment_option;



    //override methods

    @Override
    protected int getLayoutId(){
        return R.layout.widget_payment_card;
    }

    @Override
    protected void initView(View view, Bundle savedInstanceState){
        ButterKnife.bind(this, view);
        ShapeUtil.CardShape(R.color.colorGrey).render(rl_payment_card);
        initResources();
        tv_payment_title.setText(getCaption());
        tv_payment_content.setText("");
        if(cardImageResId != -1){
            img_payment.setImageResource(cardImageResId);
        }
    }

    //binding event
    @OnClick(R.id.rl_payment_card)
    void paymentOptionClick(View v){
        if(signStatus == SignStatus.SIGN && allowUnsign && operation != null){
            new AlertDialog.Builder(getContext())
                    .setTitle(R.string.message_alert)
                    .setMessage(getString(R.string.message_third_type_unsign_alert, thirdType.getName()))
                    .setNegativeButton(R.string.title_cancel, (d, i)->{})
                    .setPositiveButton(R.string.title_ok, (d, i)->{
                        getHostActivity().runActivityTask("", "", new BaseActivity.ActivityTaskAction() {
                            @Override
                            public Object execTask() {
                                if(operation.unsign()){
                                    //解约操作成功
                                    return SignStatus.UNSIGN;
                                }else{
                                    return SignStatus.UNKNOWN;
                                }
                            }
                            @Override
                            public void complete(Object param) {
                                updateSignStatus((SignStatus)param);
                            }
                        });
                    }).show();
            return;
        }
        if(signStatus == SignStatus.UNSIGN && operation != null){
            getHostActivity().runActivityTask("", "", new BaseActivity.ActivityTaskAction() {
                @Override
                public Object execTask() {
                    operation.sign();
                    return null;
                }
                @Override
                public void complete(Object param) {
                }
            });
        }
    }

    //public methods

    /**
     * 初始化
     * @param thirdType
     */
    public void init(ThirdType thirdType){
        this.thirdType = thirdType;
    }

    /**
     * 设置card的操作
     * @param operation
     */
    public void setOperation(CardOperation operation){
        this.operation = operation;
    }

    /**
     * 更新签约状态
     * @param signStatus
     */
    public void updateSignStatus(SignStatus signStatus){
        if(signStatus == SignStatus.UNKNOWN){
            if(operation != null){
                getHostActivity().runActivityTask("", "", new BaseActivity.ActivityTaskAction() {
                    @Override
                    public Object execTask() {
                        return operation.isSigned();
                    }
                    @Override
                    public void complete(Object param) {
                        updateSignStatus((boolean)param? SignStatus.SIGN: SignStatus.UNSIGN);
                    }
                });
            }else{
                signStatus = SignStatus.UNSIGN;
                updateSignStatus(signStatus);
            }
        }else{
            this.signStatus = signStatus;
            getHostActivity().runOnUiThread(()->{
                tv_payment_content.setText(contents[this.signStatus.code]);
                int resId = -1;
                switch (this.signStatus){
                    case UNSIGN:
                        resId = R.drawable.add;
                        break;
                    case SIGN:
                        resId = allowUnsign?R.drawable.close:R.drawable.payment_check;
                        break;
                    default:
                        break;
                }
                if(resId != -1){
                    img_payment_option.setImageResource(resId);
                }else{
                    img_payment_option.setImageDrawable(null);
                }
            });
        }
    }

    /**
     * 是否已签约
     * @return
     */
    public boolean isSigned(){
        return this.signStatus == SignStatus.SIGN;
    }

    //private methods
    private void initResources(){
        contents = getContents();
        switch (thirdType){
            case ALIPAY:
                cardImageResId = R.drawable.alipay;
                break;
            case WECHAT:
                cardImageResId = R.drawable.weixinzhifu;
                break;
            default:
                break;
        }
    }

    private String getCaption(){
        return getString(R.string.payment_third_type_title, thirdType.getName());
    }

    private String[] getContents(){
        return new String[]{
                getString(R.string.payment_third_type_sign, thirdType.getName()),
                getString(R.string.payment_third_type_unsign, thirdType.getName())
        };
    }




    public interface CardOperation{
        void sign();
        boolean unsign();
        boolean isSigned();
    }

    public enum SignStatus{
        SIGN(1, "已签约"),
        UNSIGN(0, "未签约"),
        UNKNOWN(-1, "未知");

        private final int code;
        private final String name;


        SignStatus(int code, String name){
            this.code = code;
            this.name = name;
        }

        public int getCode(){
            return code;
        }

        public String getName(){
            return name;
        }
    }

}
