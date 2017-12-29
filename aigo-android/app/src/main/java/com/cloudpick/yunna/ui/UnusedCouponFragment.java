package com.cloudpick.yunna.ui;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.OrientationHelper;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.cloudpick.yunna.controller.CouponController;
import com.cloudpick.yunna.model.Coupon;
import com.cloudpick.yunna.ui.adapter.CouponListAdapter;
import com.scwang.smartrefresh.layout.SmartRefreshLayout;
import com.scwang.smartrefresh.layout.api.RefreshLayout;

import java.util.ArrayList;

import butterknife.BindView;
import butterknife.ButterKnife;

public class UnusedCouponFragment extends Fragment {

    private CouponController controller = null;
    private CouponListAdapter adapter = null;

    @BindView(R.id.layout_coupon_unused_empty)
    SmartRefreshLayout emptyLayout;
    @BindView(R.id.layout_coupons_unused)
    SmartRefreshLayout couponsLayout;
    @BindView(R.id.rv_coupon_unused)
    RecyclerView rv_coupon_unused;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            controller = getArguments().getParcelable(CouponActivity.COUPON_CONTROLLER);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.fragment_unused_coupon, container, false);
        ButterKnife.bind(this, v);
        initComponent();
        emptyLayout.setVisibility(View.VISIBLE);
        return v;
    }

    private void initComponent(){
        initUnusedCouponView();
        emptyLayout.setOnRefreshListener((layout)->{
            refreshCoupons(layout);
        });
        couponsLayout.setOnRefreshListener((layout)->{
            refreshCoupons(layout);
        });
        refreshCoupons(null);
    }

    private void initUnusedCouponView(){
        rv_coupon_unused.setHasFixedSize(true);
        LinearLayoutManager layoutManager = new LinearLayoutManager(getContext());
        layoutManager.setOrientation(OrientationHelper.VERTICAL);
        rv_coupon_unused.setLayoutManager(layoutManager);
        adapter = new CouponListAdapter(getContext(), null);
        rv_coupon_unused.setAdapter(adapter);

    }

    private void refreshCoupons(final RefreshLayout layout){
        new Thread(()->{
            final ArrayList<Coupon> coupons = controller.getCoupons();
            getActivity().runOnUiThread(()->{
                boolean hasOrder = coupons != null && coupons.size() > 0;
                emptyLayout.setVisibility(hasOrder? View.INVISIBLE:View.VISIBLE);
                couponsLayout.setVisibility(hasOrder? View.VISIBLE:View.INVISIBLE);
                if(hasOrder){
                    adapter.setDataSource(coupons);
                }
                if(layout != null){
                    layout.finishRefresh(0, coupons != null);
                }
            });
        }).start();
    }

    public static UnusedCouponFragment newInstance(CouponController controller){
        UnusedCouponFragment frag = new UnusedCouponFragment();
        Bundle args = new Bundle();
        args.putParcelable(CouponActivity.COUPON_CONTROLLER, controller);
        frag.setArguments(args);
        return frag;
    }




}
