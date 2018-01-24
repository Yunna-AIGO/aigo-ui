package com.cloudpick.yunna.ui.dialog;

import android.app.AlertDialog;
import android.content.Context;
import android.os.Bundle;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.StaggeredGridLayoutManager;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.cloudpick.yunna.model.Order;
import com.cloudpick.yunna.R;
import com.cloudpick.yunna.ui.adapter.CommonRecyclerViewAdapter;
import com.cloudpick.yunna.utils.ShapeUtil;
import com.cloudpick.yunna.utils.enums.PayType;

import java.util.ArrayList;

import butterknife.BindView;
import butterknife.ButterKnife;

/**
 * Created by maxwell on 17-12-25.
 */

public class PayTypeSelectDialog extends AlertDialog implements View.OnClickListener {

    @BindView(R.id.btn_ok)
    Button btn_ok;
    @BindView(R.id.rv_pay_type)
    RecyclerView rv_pay_type;
    @BindView(R.id.tv_order_amount)
    TextView tv_order_amount;

    private CommonRecyclerViewAdapter<PayTypeInfo> adapter = null;
    private Order order;
    private OnClickOk onClickOk;

    private Context context;

    public PayTypeSelectDialog(Context context, Order order, OnClickOk onClickOk){
        super(context);
        this.context = context;
        this.order = order;
        this.onClickOk = onClickOk;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.dialog_paytype_select);
        ButterKnife.bind(this);
        initDialog();
    }

    private void initDialog(){
        setCanceledOnTouchOutside(true);
        btn_ok.setOnClickListener(this);
        tv_order_amount.setText(order.getDiscountPrice(false));
        ShapeUtil.DefaultButtonShape(true).render(btn_ok);

        ArrayList<PayTypeInfo> payTypes = getPayTypes();

        StaggeredGridLayoutManager layoutManager = new StaggeredGridLayoutManager(
                payTypes.size(), StaggeredGridLayoutManager.HORIZONTAL);
        rv_pay_type.setLayoutManager(layoutManager);

        adapter = new CommonRecyclerViewAdapter<PayTypeInfo>(getContext(), R.layout.item_paytype,
                (v, pos)->{
                    for(int i=0;i<adapter.getItemCount();i++){
                        adapter.getItem(i).setSelected(pos == i);
                    }
                    adapter.notifyDataSetChanged();
                },
                (d, v)->{
                    ((ImageView)v.findViewById(R.id.img_paytype_icon)).setImageResource(d.getIconId());
                    ((TextView)v.findViewById(R.id.tv_paytype_name)).setText(d.getName());
                    int resId = d.isSelected()?R.drawable.check:R.drawable.uncheck;
                    ImageView img_paytype_select = v.findViewById(R.id.img_paytype_select);
                    img_paytype_select.setImageResource(resId);
                });
        rv_pay_type.setAdapter(adapter);
        adapter.setDataSource(payTypes);
    }

    private ArrayList<PayTypeInfo> getPayTypes(){
        ArrayList<PayTypeInfo> payTypes = new ArrayList<PayTypeInfo>();
        payTypes.add(new PayTypeInfo(
                R.drawable.alipay,
                context.getResources().getString(R.string.tv_pay_by_alipay_title),
                PayType.ALIPAY,
                true));
        //暂不提供微信支付
//        payTypes.add(new PayType(
//                R.drawable.weixinzhifu,
//                context.getResources().getString(R.string.tv_pay_by_weixin_title),
//                PayType.WECHAT_PAY,
//                false));
        return payTypes;
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.btn_ok:
                for (PayTypeInfo payType : adapter.getDataSource()) {
                    if(payType.isSelected()){
                        if(onClickOk != null){
                            onClickOk.ok(payType.getPayType());
                        }
                    }
                    break;
                }
                this.dismiss();
                break;
            default:
                break;
        }
    }

    public interface OnClickOk{
        void ok(PayType payType);
    }

    public class PayTypeInfo{
        private int iconId;
        private String name;
        private boolean selected;
        private PayType payType;

        public int getIconId() {
            return iconId;
        }

        public String getName() {
            return name;
        }

        public boolean isSelected() {
            return selected;
        }

        public void setSelected(boolean selected) {
            this.selected = selected;
        }

        public PayType getPayType() {
            return payType;
        }

        public PayTypeInfo(int iconId, String name, PayType payType, boolean selected){
            this.iconId = iconId;
            this.name = name;
            this.selected = selected;
            this.payType = payType;
        }
    }
}
