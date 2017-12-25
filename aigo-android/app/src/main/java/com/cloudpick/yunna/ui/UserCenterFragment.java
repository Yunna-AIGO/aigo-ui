package com.cloudpick.yunna.ui;

import android.app.AlertDialog;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.cloudpick.yunna.controller.UserCenterController;
import com.cloudpick.yunna.model.User;
import com.cloudpick.yunna.utils.Tools;
import com.nostra13.universalimageloader.core.DisplayImageOptions;
import com.nostra13.universalimageloader.core.ImageLoader;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;


/**
 * Created by maxwell on 17-12-7.
 */

public class UserCenterFragment extends Fragment {

    private UserCenterController controller = null;

    @BindView(R.id.tv_name)
    TextView tv_name;
    @BindView(R.id.img_avatar)
    ImageView img_avatar;


    @Override
    public void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState){
        View v = inflater.inflate(R.layout.fragment_user_center, container, false);
        controller = new UserCenterController(getContext());
        ButterKnife.bind(this, v);
        loadUserInfo();
        return v;
    }

    @OnClick(R.id.btn_payment)
    void bindingPaymentClick(View v){
        Intent intent = PaymentActivity.newIntent(getContext(), false, false);
        startActivity(intent);
    }

    @OnClick(R.id.btn_setting)
    void settingClick(View v){
        Intent intent = SettingActivity.newIntent(getContext());
        startActivity(intent);
    }

    @OnClick(R.id.btn_coupon)
    void couponClick(View v){
        Intent intent = CouponActivity.newIntent(getContext());
        startActivity(intent);
    }

    @OnClick(R.id.btn_guide)
    void guideClick(View v){
        Intent intent = GuideActivity.newIntent(getContext());
        startActivity(intent);
    }

    @OnClick(R.id.btn_signout)
    void signoutClick(View v){
        new AlertDialog.Builder(getContext())
                .setTitle(R.string.message_alert)
                .setMessage(R.string.message_signout)
                .setNegativeButton(R.string.title_cancel, (d,i)->{})
                .setPositiveButton(R.string.title_ok, (d,i)->{
                    controller.signout();
                    startActivity(LoginActivity.newIntent(getContext()));
                    getActivity().finish();
                }).show();
    }

    private void loadUserInfo(){
        controller.loadUserInfo(new UserCenterController.loadUserInfoAction() {
            @Override
            public void failure() {
                tv_name.setText(R.string.message_not_logged_in);
                img_avatar.setImageResource(R.drawable.icon_mine_active);
            }
            @Override
            public void ok() {
                String name = User.getUser().getNickName();
                if(name == null || name.equals("")){
                    name = Tools.hidePartialPhone(User.getUser().getMobile());
                }
                tv_name.setText(name);
                String picUrl = User.getUser().getPicUrl();
                if(picUrl != null && !picUrl.equals("")){
                    DisplayImageOptions options = new DisplayImageOptions.Builder()
                            .showImageOnLoading(R.drawable.icon_mine_active)
                            .showImageOnFail(R.drawable.icon_mine_active)
                            .cacheInMemory(true)
                            .cacheOnDisk(true)
                            .bitmapConfig(Bitmap.Config.RGB_565)
                            .build();
                    ImageLoader.getInstance().displayImage(picUrl, img_avatar, options);
                }
            }
        });
    }
}
