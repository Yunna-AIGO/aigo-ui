package com.cloudpick.yunna.ui.dialog;

import android.app.AlertDialog;
import android.content.Context;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.cloudpick.yunna.R;
import com.cloudpick.yunna.model.Coupon;
import com.cloudpick.yunna.utils.ShapeUtil;

import java.util.ArrayList;

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
    @BindView(R.id.tv_coupon_number)
    TextView tv_coupon_number;

    private Context context;
    private ArrayList<Coupon> coupons;
    private OnClickOk onClickOk;

    public CouponNotifyDialog(Context context, ArrayList<Coupon> coupons, OnClickOk onClickOk){
        super(context);
        this.context = context;
        this.onClickOk = onClickOk;
        this.coupons = coupons;

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
        tv_coupon_number.setText(context.getString(R.string.message_coupon_info, coupons.size()));
        tv_coupon_amount.setText(context.getString(R.string.currency_cny) + getCouponAmount());
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

    private String getCouponAmount(){
        double amount = 0;
        for(Coupon c : coupons){
            amount += c.getCouponAmount();
        }
        return String.format("%.2f", amount);
    }

    public interface OnClickOk{
        void ok();
    }

}
