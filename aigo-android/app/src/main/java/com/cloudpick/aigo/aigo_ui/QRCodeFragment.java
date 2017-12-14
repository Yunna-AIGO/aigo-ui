package com.cloudpick.aigo.aigo_ui;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.view.ViewGroup;
import android.graphics.Bitmap;
import android.graphics.Matrix;
import android.view.View.OnClickListener;
import android.util.Log;
import android.widget.LinearLayout;
import android.widget.Toast;


import com.cloudpick.aigo.model.User;
import com.cloudpick.aigo.utils.Constants;
import com.cloudpick.aigo.utils.Resp;
import com.daimajia.slider.library.SliderLayout;
import com.daimajia.slider.library.SliderTypes.BaseSliderView;
import com.daimajia.slider.library.SliderTypes.TextSliderView;
import com.google.gson.Gson;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.EncodeHintType;

import java.io.IOException;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

/**
 * Created by maxwell on 17-12-7.
 */

public class QRCodeFragment extends Fragment {

    private Bitmap qrcodeImage;
    private TimerTask autoRefreshQrCodeTask;
    private Timer timer = null;
    private String msg = "";

    private ImageView qrcodeImageView;
    private SliderLayout slider;

    @Override
    public void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState){
        View v = inflater.inflate(R.layout.fragment_qrcode, container, false);
        initComponent(v);
        return v;
    }

    private void initComponent(View v){
        slider = (SliderLayout)v.findViewById(R.id.fragment_qrcode_slider);
        qrcodeImageView = v.findViewById(R.id.img_qr_code);
        qrcodeImageView.setScaleType(ImageView.ScaleType.FIT_START);
        loadSliderImages(v);
        startAutoRefreshQrCode();
        qrcodeImageView.setOnClickListener(new OnClickListener(){
            @Override
            public void onClick(View v) {
                stopAutoRefreshQrCode();
                refreshQrCode(true);
                startAutoRefreshQrCode();
            }
        });

    }

    private void loadSliderImages(View v){
        //TODO: 目前图片为本地图片，以后改为远程图片的话，需要异步加载图片
        SliderLayout slider = (SliderLayout)v.findViewById(R.id.fragment_qrcode_slider);

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

    private void refreshQrCode(final boolean showErrorMessage){
        try{
            Map<String, String> data = new HashMap<>();
            data.put("userId", User.getUser().getUserId());
            data.put("token", User.getUser().getToken());
            RequestBody body = RequestBody.create(MediaType.parse("application/json; charset=utf-8"),
                    new Gson().toJson(data));
            Request request = new Request.Builder()
                    .url(Constants.URL_QRCODE)
                    .post(body)
                    .build();
            Call call = new OkHttpClient().newCall(request);
            call.enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {
                    System.out.println(e.getMessage());
                }
                @Override
                public void onResponse(Call call, Response response) throws IOException {
                    msg = "";
                    String json = response.body().string();
                    Resp<Map<String, String>> resp = new Gson().fromJson(json, Resp.class);
                    String entryUrl = " ";
                    if(resp.getCode().equals(Constants.RESP_SUCCESS)){
                        entryUrl = resp.getData().get(Constants.KEY_ENTRY_URL);
                    }else if(showErrorMessage){
                        msg = resp.getMessage();
                    }
                    int size = qrcodeImageView.getHeight();
                    qrcodeImage = generateQRCodeImage(entryUrl, 200, 200, 45 );
                    getActivity().runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            if(!msg.equals("")){
                                Toast.makeText(getContext(), msg, Toast.LENGTH_LONG).show();
                            }
                            if(qrcodeImage !=null){
                                qrcodeImageView.setImageBitmap(qrcodeImage);
                            }
                        }
                    });
                }
            });
        }catch(Exception ex){
            System.out.println(ex.getMessage());
        }
    }

    private Bitmap generateQRCodeImage(String qrcodeStr, int width, int height, int rotate){
        try {
            Hashtable hints = new Hashtable();
            hints.put(EncodeHintType.MARGIN, 0);
            BitMatrix bitMatrix = new MultiFormatWriter().encode(
                    qrcodeStr,
                    BarcodeFormat.DATA_MATRIX.QR_CODE,
                    width, height, hints);
            int bitMatrixWidth = bitMatrix.getWidth();
            int bitMatrixHeight = bitMatrix.getHeight();
            Bitmap bitmap = Bitmap.createBitmap(bitMatrixWidth, bitMatrixHeight, Bitmap.Config.ARGB_4444);
            int[] pixels = new int[bitMatrixWidth * bitMatrixHeight];
            for (int y = 0; y < bitMatrixHeight; y++) {
                for (int x = 0; x < bitMatrixWidth; x++) {
                    bitmap.setPixel(x,y, bitMatrix.get(x, y) ?
                            getResources().getColor(R.color.colorDarkBlack):getResources().getColor(R.color.colorTransparent));
                }
            }
            Matrix matrix = new Matrix();
            // 设置旋转角度
            matrix.setRotate(rotate);
            // 重新绘制Bitmap
            bitmap = Bitmap.createBitmap(bitmap, 0, 0, bitmap.getWidth(),bitmap.getHeight(), matrix, true);
            return bitmap;

        } catch (WriterException e) {
            return null;
        }
    }

    public void startAutoRefreshQrCode(){
        Log.d("rrrr", "start refresh qrcode");
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
        Log.d("rrrr", "stop refresh qrcode");
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
        View v = getActivity().findViewById(R.id.ll_qrcode);

        int h = Math.min(v.getHeight(), v.getWidth());

        //int h = Math.min(qrcodeImageView.getHeight(), qrcodeImageView.getWidth());
//        h = (int)(h / 1.5);
        LinearLayout.LayoutParams ll = (LinearLayout.LayoutParams)qrcodeImageView.getLayoutParams();
        ll.width = h;
        ll.height = h;
        qrcodeImageView.setLayoutParams(ll);
        refreshQrCode(true);
    }
}
