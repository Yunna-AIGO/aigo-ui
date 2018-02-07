package com.cloudpick.yunna.ui;

import android.app.AlertDialog;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.cloudpick.yunna.R;
import com.cloudpick.yunna.controller.UserCenterController;
import com.cloudpick.yunna.model.User;
import com.cloudpick.yunna.ui.main.MainActivityFragment;
import com.cloudpick.yunna.utils.ShapeUtil;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;


/**
 * Created by maxwell on 17-12-7.
 */

public class UserCenterFragment extends MainActivityFragment {

    private static final String TAG = "CloudPick";
    private UserCenterController controller = null;

    @BindView(R.id.ll_user_center)
    LinearLayout ll_user_center;
    @BindView(R.id.tv_name)
    TextView tv_name;
    @BindView(R.id.img_avatar)
    ImageView img_avatar;

    @Override
    protected int getLayoutId(){
        return R.layout.fragment_user_center;
    }

    @Override
    protected void initView(View view, Bundle savedInstanceState){
        controller = new UserCenterController(getContext());
        ButterKnife.bind(this, view);
        ShapeUtil.CardShape(R.color.colorWhite).render(ll_user_center);
        loadUserInfo();
    }

    @Override
    public void setFragmentVisible(boolean visible){
        if(visible && controller != null){
            loadUserInfo();
        }
    }

    @OnClick(R.id.btn_feedback)
    void btnFeedbackClick(View v){
        startActivity(CreateFeedbackActivity.newIntent(getContext()));
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
                    startActivity(LoginActivity.newIntent(getContext(), false));
                    getActivity().finish();
                }).show();
    }

    private void loadUserInfo(){
        String mobile = User.getUser().getMobile();
        if(!TextUtils.isEmpty(mobile)){
            tv_name.setText(mobile);
        }else{
            tv_name.setText(R.string.message_not_logged_in);
        }
        img_avatar.setImageResource(R.drawable.icon_mine_active);
    }

//    private void loadUserInfo(){
//        controller.loadUserInfo(new UserCenterController.loadUserInfoAction() {
//            @Override
//            public void failure() {
//                tv_name.setText(R.string.message_not_logged_in);
//                img_avatar.setImageResource(R.drawable.icon_mine_active);
//            }
//            @Override
//            public void ok() {
//                String name = User.getUser().getNickName();
//                if(TextUtils.isEmpty(name)){
//                    name = Tools.hidePartialPhone(User.getUser().getMobile());
//                }
//                tv_name.setText(name);
//                String picUrl = User.getUser().getPicUrl();
//                if(!TextUtils.isEmpty(picUrl)){
//                    DisplayImageOptions options = new DisplayImageOptions.Builder()
//                            .showImageOnLoading(R.drawable.icon_mine_active)
//                            .showImageOnFail(R.drawable.icon_mine_active)
//                            .cacheInMemory(true)
//                            .cacheOnDisk(true)
//                            .bitmapConfig(Bitmap.Config.RGB_565)
//                            .build();
//                    ImageLoader.getInstance().displayImage(picUrl, img_avatar, options);
//                }
//            }
//        });
//    }
}
