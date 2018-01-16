package com.cloudpick.yunna.ui;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.graphics.Bitmap;
import android.util.Log;
import android.widget.LinearLayout;
import android.widget.TextView;


import com.cloudpick.yunna.controller.QRCodeController;
import com.cloudpick.yunna.ui.main.MainActivityFragment;
import com.cloudpick.yunna.utils.Constants;
import com.cloudpick.yunna.utils.event.DelayClickListener;
import com.cloudpick.yunna.controller.QRCodeController.QRCodeError;
import com.daimajia.slider.library.SliderLayout;
import com.daimajia.slider.library.SliderTypes.BaseSliderView;
import com.daimajia.slider.library.SliderTypes.TextSliderView;
import com.wang.avi.AVLoadingIndicatorView;

import java.util.HashMap;
import java.util.Timer;
import java.util.TimerTask;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

/**
 * Created by maxwell on 17-12-7.
 */

public class QRCodeFragment extends MainActivityFragment {

    private QRCodeController controller = null;
    private TimerTask autoRefreshQrCodeTask;
    private Timer timer = null;
    //用于标记是否已经计算过二维码View的Size
    private boolean flag = false;

    @BindView(R.id.avi_loading)
    AVLoadingIndicatorView avi_loading;
    @BindView(R.id.ll_qrcode)
    LinearLayout ll_qrcode;
    @BindView(R.id.ll_options)
    LinearLayout ll_options;
    @BindView(R.id.ll_msg_welcome)
    LinearLayout ll_msg_welcome;
    @BindView(R.id.ll_msg_qrcode_error)
    LinearLayout ll_msg_qrcode_error;
    @BindView(R.id.img_qr_code)
    ImageView img_qr_code;
    @BindView(R.id.fragment_qrcode_slider)
    SliderLayout slider;
    @BindView(R.id.btn_network_error)
    Button btn_network_error;
    @BindView(R.id.tv_message)
    TextView tv_message;
    @BindView(R.id.tv_option)
    TextView tv_option;


    @Override
    protected int getLayoutId(){
        return R.layout.fragment_qrcode;
    }

    @Override
    protected void initView(View view, Bundle savedInstanceState){
        controller = new QRCodeController(this.getContext());
        ButterKnife.bind(this, view);
        this.title = getResources().getString(R.string.title_qrcode);
        loadSliderImages(view);
        img_qr_code.setOnClickListener(new DelayClickListener() {
            @Override
            public void onNoDoubleClick(View v) {
                Log.d(Constants.LOG_TAG, "exec refresh qrcode");
                stopAutoRefreshQrCode();
                refreshQrCode(true);
            }
        });
    }

    @Override
    public void setFragmentVisible(boolean visible){
        if(visible){
            refreshQrCode(true);
        }else{
            stopAutoRefreshQrCode();
        }
    }

    @OnClick(R.id.btn_network_error)
    void btn_network_error_click(View v){
        refreshQrCode(true);
    }

    @OnClick(R.id.tv_option)
    void tv_option_click(View v){
        QRCodeError error = (QRCodeError)v.getTag();
        if(error == QRCodeError.NOTBINDING_PAYMENT){
            Intent intent = PaymentActivity.newIntent(getContext(), false, false);
            getContext().startActivity(intent);
        }else if(error == QRCodeError.ORDER_NOT_PAID){
            switchToFramgent(MainActivity.MainFragment.ORDER);
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

    private void switchToLoadingQrCodeView(){
        img_qr_code.setVisibility(View.GONE);
        ll_options.setVisibility(View.GONE);
        ll_msg_welcome.setVisibility(View.INVISIBLE);
        avi_loading.setVisibility(View.VISIBLE);
        showLoadingIndicator();
    }

    private void switchToQrCodeLoadingFailedView(QRCodeError qrcodeError, String msg){
        hideLoadingIndicator();
        stopAutoRefreshQrCode();
        avi_loading.setVisibility(View.GONE);
        img_qr_code.setVisibility(View.GONE);
        ll_msg_welcome.setVisibility(View.INVISIBLE);
        ll_options.setVisibility(View.VISIBLE);

        if(qrcodeError == QRCodeError.NETWORK_ERROR){
            ll_msg_qrcode_error.setVisibility(View.GONE);
            btn_network_error.setVisibility(View.VISIBLE);
        }else{
            btn_network_error.setVisibility(View.GONE);
            ll_msg_qrcode_error.setVisibility(View.VISIBLE);
            tv_message.setText(msg);
            if(qrcodeError == QRCodeError.NOTBINDING_PAYMENT){
                tv_option.setText(R.string.message_goto_payment_page);
            }else if(qrcodeError == QRCodeError.ORDER_NOT_PAID){
                tv_option.setText(R.string.message_goto_order_page);
            }
            tv_option.setTag(qrcodeError);
        }
    }

    private void switchToQrCodeView(Bitmap qrcodeImage){
        hideLoadingIndicator();
        ll_options.setVisibility(View.GONE);
        avi_loading.setVisibility(View.GONE);
        img_qr_code.setVisibility(View.VISIBLE);
        ll_msg_welcome.setVisibility(View.VISIBLE);

        if(!flag){
            int h = Math.min(ll_qrcode.getHeight(), ll_qrcode.getWidth());
            h = (int)(h / 1.5);
            LinearLayout.LayoutParams ll = (LinearLayout.LayoutParams)img_qr_code.getLayoutParams();
            ll.width = h;
            ll.height = h;
            img_qr_code.setLayoutParams(ll);
            flag = true;
        }
        if(qrcodeImage != null){
            img_qr_code.setImageBitmap(qrcodeImage);
        }
    }

    private void refreshQrCode(boolean startAutoRefreshQrCode){
        Log.d(Constants.LOG_TAG, "refresh qrcode");
        boolean showIndicator = img_qr_code.getVisibility() == View.GONE;
        if(showIndicator){
            switchToLoadingQrCodeView();
        }
        controller.refreshQrCode(new QRCodeController.refreshQrCodeAction() {
            @Override
            public void networkError(){
                //网络问题
                switchToQrCodeLoadingFailedView(QRCodeError.NETWORK_ERROR, "");
            }
            @Override
            public void failure(String msg, QRCodeError error) {
                switchToQrCodeLoadingFailedView(error, msg);
            }
            @Override
            public void ok(Bitmap qrcodeImage) {
                switchToQrCodeView(qrcodeImage);
                if(startAutoRefreshQrCode){
                    startAutoRefreshQrCode();
                }
            }
        });
    }

    private void startAutoRefreshQrCode(){
        if(timer != null){
            return;
        }
        Log.d(Constants.LOG_TAG, "start refresh qrcode");
        timer = new Timer();
        autoRefreshQrCodeTask = new TimerTask() {
            @Override
            public void run() {
                refreshQrCode(false);
            }
        };
        timer.schedule(autoRefreshQrCodeTask, Constants.REFRESH_QRCODE_INTERVAL, Constants.REFRESH_QRCODE_INTERVAL);
    }

    private void stopAutoRefreshQrCode(){
        if(timer != null){
            Log.d(Constants.LOG_TAG, "stop refresh qrcode");
            try{
                timer.cancel();
                timer = null;
            }catch(Exception ex){
                System.out.println(ex.getMessage());
            }
        }
    }

    private void showLoadingIndicator(){
        avi_loading.smoothToShow();
    }

    private void hideLoadingIndicator(){
        avi_loading.hide();
    }
}
