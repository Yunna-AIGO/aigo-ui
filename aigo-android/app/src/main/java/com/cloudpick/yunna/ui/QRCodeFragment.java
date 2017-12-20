package com.cloudpick.yunna.ui;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.view.ViewGroup;
import android.graphics.Bitmap;
import android.util.Log;
import android.widget.LinearLayout;
import android.widget.TextView;


import com.cloudpick.yunna.controller.QRCodeController;
import com.cloudpick.yunna.utils.Constants;
import com.daimajia.slider.library.SliderLayout;
import com.daimajia.slider.library.SliderTypes.BaseSliderView;
import com.daimajia.slider.library.SliderTypes.TextSliderView;

import java.util.HashMap;
import java.util.Timer;
import java.util.TimerTask;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

/**
 * Created by maxwell on 17-12-7.
 */

public class QRCodeFragment extends Fragment {

    private QRCodeController controller = null;
    private TimerTask autoRefreshQrCodeTask;
    private Timer timer = null;

    @BindView(R.id.ll_qrcode)
    LinearLayout ll_qrcode;
    @BindView(R.id.img_qr_code)
    ImageView qrcodeImageView;
    @BindView(R.id.tv_msg1)
    TextView tv_msg1;
    @BindView(R.id.tv_msg2)
    TextView tv_msg2;
    @BindView(R.id.fragment_qrcode_slider)
    SliderLayout slider;

    @Override
    public void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState){
        View v = inflater.inflate(R.layout.fragment_qrcode, container, false);
        controller = new QRCodeController(this.getContext());
        ButterKnife.bind(this, v);
        initComponent(v);
        return v;
    }

    private void initComponent(View v){
        loadSliderImages(v);
        //在resetQrcodeImageView方法中刷新二维码，此处不再刷新
        //refreshQrCode(true);
    }

    @OnClick(R.id.img_qr_code)
    void clickQrCodeImageView(View v){
        stopAutoRefreshQrCode();
        refreshQrCode(true);
    }

    @OnClick(R.id.tv_msg2)
    void clickRefreshQrCodeView(View v){
        boolean flag = (boolean)tv_msg2.getTag();
        if(flag){
            refreshQrCode(true);
        }
    }

    private void loadSliderImages(View v){
        //TODO: 目前图片为本地图片，以后改为远程图片的话，需要异步加载图片
        HashMap<String, Integer> url_imgs = new HashMap<String, Integer>();
        url_imgs.put("slider1", R.drawable.slider_1);
        url_imgs.put("slider2", R.drawable.slider_2);
        url_imgs.put("slider3", R.drawable.slider_3);
        for(String name:url_imgs.keySet()){
            TextSliderView textSliderView = new TextSliderView(v.getContext());
            textSliderView.image(url_imgs.get(name)).setScaleType(BaseSliderView.ScaleType.Fit);
            //.description(name).setOnSliderClickListener(this);
//            textSliderView.bundle(new Bundle());
//            textSliderView.getBundle().putString("extra", name);
            slider.addSlider(textSliderView);
        }
        slider.setPresetIndicator(SliderLayout.PresetIndicators.Center_Bottom);
    }

    private void refreshQrCode(boolean startAutoRefreshQrCode){
        Log.d("ssss", "refresh qrcode");
        controller.refreshQrCode(new QRCodeController.refreshQrCodeAction() {
            @Override
            public void error(){
                //网络问题
                showQrCodeFailed(getResources().getString(R.string.network_error));
            }
            @Override
            public void failure(String msg) {
                //获取二维码失败,有未支付的订单
                showQrCodeFailed(msg);
            }
            @Override
            public void ok(Bitmap qrcodeImage) {
                qrcodeImageView.setVisibility(View.VISIBLE);
                tv_msg1.setText(R.string.welcome);
                tv_msg2.setText(R.string.scan_qrcode_message);
                tv_msg2.setTag(false);
                tv_msg2.setTextColor(getResources().getColor(R.color.colorBlack));
                if(qrcodeImage !=null){
                    qrcodeImageView.setImageBitmap(qrcodeImage);
                }
                if(startAutoRefreshQrCode){
                    startAutoRefreshQrCode();
                }
            }
        });
    }

    private void showQrCodeFailed(String msg){
        qrcodeImageView.setVisibility(View.INVISIBLE);
        tv_msg1.setText(msg);
        tv_msg2.setText(R.string.tv_refresh_qrcode_title);
        tv_msg2.setTag(true);
        tv_msg2.setTextColor(getResources().getColor(R.color.colorOrange));
        stopAutoRefreshQrCode();
    }

    public void startAutoRefreshQrCode(){
        Log.d("ssss", "start refresh qrcode");
        if(timer != null){
            return;
        }
        timer = new Timer();
        autoRefreshQrCodeTask = new TimerTask() {
            @Override
            public void run() {
                refreshQrCode(false);
            }
        };
        timer.schedule(autoRefreshQrCodeTask, Constants.REFRESH_QRCODE_INTERVAL, Constants.REFRESH_QRCODE_INTERVAL);
    }

    public void stopAutoRefreshQrCode(){
        Log.d("ssss", "stop refresh qrcode");
        if(timer != null){
            try{
                timer.cancel();
                timer = null;
            }catch(Exception ex){
                System.out.println(ex.getMessage());
            }
        }
    }

    @Override
    public void onPause(){
        super.onPause();
        stopAutoRefreshQrCode();
    }

    public void resetQrcodeImageView(){
        int h = Math.min(ll_qrcode.getHeight(), ll_qrcode.getWidth());
        h = (int)(h / 1.5);
        LinearLayout.LayoutParams ll = (LinearLayout.LayoutParams)qrcodeImageView.getLayoutParams();
        ll.width = h;
        ll.height = h;
        qrcodeImageView.setLayoutParams(ll);
        refreshQrCode(true);
    }
}
