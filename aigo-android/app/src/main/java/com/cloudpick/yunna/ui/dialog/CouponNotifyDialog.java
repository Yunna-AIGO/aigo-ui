package com.cloudpick.yunna.ui.dialog;

import android.app.AlertDialog;
import android.content.Context;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.cloudpick.yunna.R;
import com.cloudpick.yunna.utils.ShapeUtil;

import butterknife.BindView;
import butterknife.ButterKnife;

/**
 * Created by maxwell on 17-12-27.
 */

public class CouponNotifyDialog extends AlertDialog implements View.OnClickListener {

    @BindView(R.id.btn_ok)
    Button btn_ok;
    @BindView(R.id.tv_coupon_amount)
    TextView tv_coupon_amount;

    private Context context;
    private String couponAmount;
    private OnClickOk onClickOk;

    public CouponNotifyDialog(Context context, String couponAmount, OnClickOk onClickOk){
        super(context);
        this.context = context;
        this.couponAmount = couponAmount;
        this.onClickOk = onClickOk;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.dialog_coupon_notify);
        ButterKnife.bind(this);
        initDialog();
    }

    private void initDialog(){
        setCanceledOnTouchOutside(false);
        setCancelable(false);
        new ShapeUtil.Builder()
                .setColor(R.color.colorRed)
                .setBorderWidth(0)
                .build().render(btn_ok);
        btn_ok.setOnClickListener(this);
        tv_coupon_amount.setText(couponAmount);
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.btn_ok:
                onClickOk.ok();
                this.dismiss();
                break;
            default:
                break;
        }
    }

    public interface OnClickOk{
        void ok();
    }

}
