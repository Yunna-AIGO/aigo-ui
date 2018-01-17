package com.cloudpick.yunna.ui;

import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.OrientationHelper;
import android.support.v7.widget.RecyclerView;
import android.text.TextUtils;
import android.view.Gravity;
import android.view.View;
import android.view.Window;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import java.util.ArrayList;

import com.cloudpick.yunna.controller.OrderListController;
import com.cloudpick.yunna.model.Order;
import com.cloudpick.yunna.ui.adapter.CommonRecyclerViewAdapter;
import com.cloudpick.yunna.ui.dialog.PayTypeSelectDialog;
import com.cloudpick.yunna.ui.main.MainActivityFragment;
import com.cloudpick.yunna.utils.ShapeUtil;
import com.cloudpick.yunna.utils.Tools;
import com.nostra13.universalimageloader.core.DisplayImageOptions;
import com.nostra13.universalimageloader.core.ImageLoader;
import com.scwang.smartrefresh.layout.SmartRefreshLayout;
import com.scwang.smartrefresh.layout.api.RefreshLayout;

import butterknife.BindView;
import butterknife.ButterKnife;

public class OrdersFragment extends MainActivityFragment {

    private OrderListController controller = null;

    @BindView(R.id.rv_order_list)
    RecyclerView rv_order_list;
    @BindView(R.id.layout_items)
    SmartRefreshLayout pullToRefreshLayout;
    @BindView(R.id.layout_empty)
    SmartRefreshLayout emptyLayout;
    @BindView(R.id.ll_coupon_notify_layout)
    LinearLayout ll_coupon_notify_layout;
    @BindView(R.id.tv_coupon_notify)
    TextView tv_coupon_notify;


    private ArrayList<Order> orders;
    private String couponAmount = "";
    private CommonRecyclerViewAdapter<Order> adapter = null;
    private ShapeUtil textShape = ShapeUtil.TextOnlyShape();
    private ShapeUtil btnShape = new ShapeUtil.Builder()
            .setColor(R.color.colorTransparent)
            .setCornerRadius(3)
            .build();
    private DisplayImageOptions options = new DisplayImageOptions.Builder()
            .cacheInMemory(true)
            .cacheOnDisk(true)
            .bitmapConfig(Bitmap.Config.RGB_565)
            .build();
    /**
     * 最大可见商品图标数量
     */
    public Integer maxVisibleGoodsImageCount = 3;

    @Override
    protected int getLayoutId(){
        return R.layout.fragment_orders;
    }

    @Override
    protected void initView(View view, Bundle savedInstanceState){
        controller = new OrderListController(getContext());
        ButterKnife.bind(this, view);
        initComponent(view);
    }

    private void initComponent(View view){

        LinearLayoutManager layoutManager = new LinearLayoutManager(getContext());
        layoutManager.setOrientation(OrientationHelper.VERTICAL);

        rv_order_list.setLayoutManager(layoutManager);
        adapter = new CommonRecyclerViewAdapter<Order>(getContext(), R.layout.order_item,
                (v, pos)->{
                    Intent intent = OrderDetailActivity.newIntent(getContext(), adapter.getItem(pos).getOrderId());
                    startActivity(intent);
                },
                (d, v)->{
                    renderOrder(d, v);
                });
        rv_order_list.setAdapter(adapter);

        emptyLayout.setOnRefreshListener((layout)->{
            refreshOrders(layout);
        });
        pullToRefreshLayout.setOnRefreshListener((layout)->{
            refreshOrders(layout);
        });
        pullToRefreshLayout.setOnLoadmoreListener((layout)->{
            loadMoreOrders(layout);
        });
        pullToRefreshLayout.setEnableLoadmoreWhenContentNotFull(true);
        refreshOrders(null);
    }

    private void refreshOrders(final RefreshLayout layout){
        new Thread(()->{
            controller.resetPageInfo();
            orders = controller.getOrders();
            couponAmount = controller.getCouponAmount();
            getActivity().runOnUiThread(()->{
                //set order list
                boolean hasOrder = orders != null && orders.size() > 0;
                emptyLayout.setVisibility(hasOrder? View.INVISIBLE:View.VISIBLE);
                pullToRefreshLayout.setVisibility(hasOrder? View.VISIBLE:View.INVISIBLE);
                adapter.setDataSource(orders);
                //set coupon notify
                if(TextUtils.isEmpty(couponAmount)){
                    ll_coupon_notify_layout.setVisibility(View.GONE);
                }else{
                    ll_coupon_notify_layout.setVisibility(View.VISIBLE);
                    String msg = String.format(getContext().getString(R.string.message_unused_coupon_notify), couponAmount);
                    tv_coupon_notify.setText(msg);
                }
                if(layout!=null){
                    layout.finishRefresh(800, orders != null);
                }
            });
        }).start();
    }

    private void loadMoreOrders(final RefreshLayout layout){
        new Thread(()->{
            orders = controller.getOrders();
            getActivity().runOnUiThread(()->{
                boolean hasOrder = orders != null && orders.size() > 0;
                if(hasOrder){
                    adapter.appendItems(orders);
                }
                if(layout != null){
                    layout.finishLoadmore(500, orders != null);
                }
            });
        }).start();
    }

    private void payOrder(Order order){
        PayTypeSelectDialog dlg = new PayTypeSelectDialog(getContext(), order, (payType) -> {
            controller.payOrder(order, payType, getActivity(), new OrderListController.PayAction() {
                @Override
                public void terminate(String msg){
                    Tools.ToastMessage(getContext(), msg);
                }
                @Override
                public void failure(String msg) {
                    refreshOrders(null);
                    Tools.ToastMessage(getContext(), msg);
                }
                @Override
                public void ok() {
                    refreshOrders(null);
//                    order.setStatus(OrderStatus.SUCCESS.getCode());
//                    adapter.notifyDataSetChanged();
                }
            });
        });

        try{
            Window win = dlg.getWindow();
            win.getAttributes().gravity = Gravity.BOTTOM;
            win.setWindowAnimations(R.style.animation_dialog_select_paytype);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        dlg.show();
    }

    private void renderOrder(Order o, View v){
        ((ImageView)v.findViewById(R.id.img_store)).setImageResource(R.drawable.store);
        ((TextView)v.findViewById(R.id.tv_storeName)).setText(o.getStoreName());
        ((TextView)v.findViewById(R.id.tv_goods_count)).setText(
                String.format(getResources().getString(R.string.tv_goods_count), o.getGoodsCount()));
        setOrderAmount(o, v);
        setOrderStatus(o, v);
        setGoodsImage(o, v);
    }

    private void setOrderAmount(Order o, View v){
        try{
            String discountPrice = o.getDiscountPrice(true);
            String[] splitStrs = discountPrice.split("\\.");
            ((TextView)v.findViewById(R.id.tv_order_amt_int)).setText(splitStrs[0] + ".");
            String decPart = splitStrs.length == 1? "00" : splitStrs[1];
            ((TextView)v.findViewById(R.id.tv_order_amt_dec)).setText(decPart);
        }catch(Exception ex){
            ex.printStackTrace();
        }
    }

    private void setOrderStatus(Order o, View v){
        Button btn = (Button)v.findViewById(R.id.btn_order_status);
        if(o.unPaid()){
            btn.setEnabled(true);
            btnShape.render(btn);
            btn.setTextColor(getResources().getColor(R.color.colorDefault));
            btn.setText(R.string.message_goto_pay_order);
            btn.setOnClickListener((view)->{
                payOrder(o);
            });
        }else{
            btn.setEnabled(false);
            textShape.render(btn);
            btn.setTextColor(getResources().getColor(R.color.colorGrey));
            if(o.isInPayment()){
                btn.setText(R.string.message_in_payment);
            }else if(o.paid()){
                btn.setText(R.string.order_status_finished);
            }else{
                btn.setText(o.getStatusName());
            }
        }
    }

    private void setGoodsImage(Order o, View v){
        int ct = o.getGoodsCount();
        if(ct == 0){
            return;
        }
        if(maxVisibleGoodsImageCount != -1 && ct > maxVisibleGoodsImageCount){
            ct = maxVisibleGoodsImageCount;
        }
        LinearLayout ll = v.findViewById(R.id.ll_goods_imgs);
        if(ll.getChildCount() != 0){
            ll.removeAllViews();
        }
        for(int i=0;i<ct;i++){
            ll.addView(newGoodsImageView(o.getGoodsImageUrl(i)));
        }
    }

    private ImageView newGoodsImageView(String goodsImgUrl){
        ImageView imageView = new ImageView(getContext());
        imageView.setBackgroundColor(getResources().getColor(R.color.colorGrey));
        int wh = Tools.dp2px(getContext(), 70);
        LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(wh, wh);
        lp.setMargins(0, 0, Tools.dp2px(getContext(), 8), 0);
        imageView.setLayoutParams(lp);
        ImageLoader.getInstance().displayImage(goodsImgUrl, imageView, options);
        return imageView;
    }

    public void toolbarClicked(){
        rv_order_list.smoothScrollToPosition(0);
    }

//    private class SmoothScrollLayoutManager extends LinearLayoutManager {
//
//        private float speedPerPixel = -1;
//
//        public SmoothScrollLayoutManager(Context context) {
//            super(context);
//        }
//
//        @Override
//        public void smoothScrollToPosition(RecyclerView recyclerView,
//                                           RecyclerView.State state, final int position) {
//
//            LinearSmoothScroller smoothScroller =
//                    new LinearSmoothScroller(recyclerView.getContext()) {
//                        // 返回：滑过1px时经历的时间(ms)。
//                        @Override
//                        protected float calculateSpeedPerPixel(DisplayMetrics displayMetrics) {
//                            if(speedPerPixel == -1){
//                                speedPerPixel = super.calculateSpeedPerPixel(displayMetrics);
//                            }
//                            return speedPerPixel;
////                            return 150f / displayMetrics.densityDpi;
//                        }
//                    };
//
//            smoothScroller.setTargetPosition(position);
//            startSmoothScroll(smoothScroller);
//        }
//
//        public void setSpeedPerPixel(float value){
//            speedPerPixel = value;
//        }
//    }

}
