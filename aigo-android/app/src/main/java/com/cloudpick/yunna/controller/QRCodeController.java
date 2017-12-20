package com.cloudpick.yunna.controller;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.Matrix;

import com.cloudpick.yunna.model.User;
import com.cloudpick.yunna.ui.R;
import com.cloudpick.yunna.utils.Constants;
import com.cloudpick.yunna.utils.http.Callback;
import com.cloudpick.yunna.utils.http.Requests;
import com.cloudpick.yunna.utils.http.Response;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;

import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;

/**
 * Created by maxwell on 17-12-19.
 */

public class QRCodeController extends BaseController {


    public QRCodeController(Context context){
        super(context);
    }

    public void refreshQrCode(final refreshQrCodeAction action){
        try{
            Map<String, String> data = new HashMap<>();
            data.put("userId", User.getUser().getUserId());
            data.put("token", User.getUser().getToken());

            Requests.postAsync(Constants.URL_QRCODE, data, new Callback<Response<Map<String, String>>>() {
                @Override
                public void error(Exception e) {
                    System.out.println(e.getMessage());
                    handler.post(()->{action.error();});
                }

                @Override
                public void ok(Response<Map<String, String>> r) {
                    if(r.isSuccess()){
                        Bitmap qrcodeImage = generateQRCodeImage(
                                r.getData().get(Constants.KEY_ENTRY_URL), 160, 160, 0);
                        handler.post(()->{
                            action.ok(qrcodeImage);
                        });
                    }else{
                        handler.post(()->{
                            action.failure(r.getMessage());
                        });
                    }
                }
            });
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
    }

    public interface refreshQrCodeAction{
        void error();
        void failure(String msg);
        void ok(Bitmap qrcodeImage);
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
            int black = context.getResources().getColor(R.color.colorDarkBlack);
            int white = context.getResources().getColor(R.color.colorTransparent);
            for (int y = 0; y < bitMatrixHeight; y++) {
                for (int x = 0; x < bitMatrixWidth; x++) {
                    bitmap.setPixel(x,y, bitMatrix.get(x, y)? black:white);
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


}
