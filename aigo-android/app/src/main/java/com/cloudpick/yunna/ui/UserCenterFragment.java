package com.cloudpick.yunna.ui;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.cloudpick.yunna.model.User;
import com.cloudpick.yunna.utils.Constants;
import com.cloudpick.yunna.utils.RespUser;
import com.cloudpick.yunna.utils.Tools;
import com.google.gson.Gson;
import com.nostra13.universalimageloader.core.DisplayImageOptions;
import com.nostra13.universalimageloader.core.ImageLoader;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;


/**
 * Created by maxwell on 17-12-7.
 */

public class UserCenterFragment extends Fragment {



    @Override
    public void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState){
        View v = inflater.inflate(R.layout.fragment_user_center, container, false);
        initComponent(v);
        return v;
    }

    private void initComponent(View v){
        loadUserInfo();
        ((LinearLayout)v.findViewById(R.id.btn_signout)).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                signout();
            }
        });
        ((LinearLayout)v.findViewById(R.id.btn_setting)).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //TODO setting页面目前仅一个版本号，暂时简单启动退出；功能增加后再作进一步调整
                Intent intent = SettingActivity.newIntent(getContext());
                startActivity(intent);
            }
        });
        ((LinearLayout)v.findViewById(R.id.btn_payment)).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = PaymentActivity.newIntent(getContext(), false, false);
                startActivity(intent);
            }
        });
    }

    private void signout(){
        new AlertDialog.Builder(getContext())
                .setTitle(R.string.message_alert)
                .setMessage(R.string.message_signout)
                .setNegativeButton(R.string.title_cancel, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                    }
                })
                .setPositiveButton(R.string.title_ok, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        User.getUser().signout();
                        Intent intent = new Intent(getContext(), LoginActivity.class);
                        startActivity(intent);
                        getActivity().finish();
                    }
                }).show();
    }

    private void loadUserInfo(){
        String url = String.format(Constants.URL_USER_INFO, User.getUser().getUserId());
        Request request = new Request.Builder().url(url).build();
        Call call = new OkHttpClient().newCall(request);
        call.enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                System.out.println(e.getMessage());
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                String json = response.body().string();
                RespUser r = new Gson().fromJson(json, RespUser.class);
                if(r.getCode().equals(Constants.RESP_SUCCESS)){
                    User.getUser().setUserInfo(
                            r.getUserInfo().get(Constants.KEY_NICKNAME),
                            r.getUserInfo().get(Constants.KEY_MOBILE),
                            r.getUserInfo().get(Constants.KEY_PIC_URL));
                    getActivity().runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            String name = User.getUser().getNickName();
                            if(name == null || name.equals("")){
                                name = Tools.hidePartialPhone(User.getUser().getMobile());
                            }
                            ((TextView)getView().findViewById(R.id.tv_name)).setText(name);
                            ImageView imageView = (ImageView)getView().findViewById(R.id.img_avatar);
                            String picUrl = User.getUser().getPicUrl();
                            if(picUrl != null && !picUrl.equals("")){
                                DisplayImageOptions options = new DisplayImageOptions.Builder()
                                        .showImageOnLoading(R.drawable.icon_mine_active)
                                        .showImageOnFail(R.drawable.icon_mine_active)
                                        .cacheInMemory(true)
                                        .cacheOnDisk(true)
                                        .bitmapConfig(Bitmap.Config.RGB_565)
                                        .build();
                                ImageLoader.getInstance().displayImage(picUrl, imageView, options);
                            }
                        }
                    });
                }
            }
        });
    }
}
