package com.cloudpick.yunna.controller;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.Matrix;

import com.cloudpick.yunna.model.User;
import com.cloudpick.yunna.ui.R;
import com.cloudpick.yunna.utils.Constants;
import com.cloudpick.yunna.utils.Tools;
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
                    Tools.Sleep(500);
                    System.out.println(e.getMessage());
                    handler.post(()->{action.networkError();});
                }

                @Override
                public void ok(Response<Map<String, String>> r) {
                    Tools.Sleep(500);
                    if(r.isSuccess()){
                        Bitmap qrcodeImage = generateQRCodeImage(
                                r.getData().get(Constants.KEY_ENTRY_URL), 160, 160, 0);
                        handler.post(()->{
                            action.ok(qrcodeImage);
                        });
                    }else{
                        handler.post(()->{
                            if(r.getCode().equals(QRCodeError.NOTBINDING_PAYMENT.getName())){
                                action.failure(
                                        context.getResources().getString(R.string.message_no_payment),
                                        QRCodeError.NOTBINDING_PAYMENT);
                            }else if(r.getCode().equals(QRCodeError.ORDER_NOT_PAID.getName())){
                                action.failure(
                                        context.getResources().getString(R.string.message_order_not_paid),
                                        QRCodeError.ORDER_NOT_PAID);
                            }else if(r.getCode().equals(QRCodeError.ACCOUNT_EXPIRED.getName())){
                                User.getUser().signout();
                                action.relogin();
                            }else{
                                //其他情况暂时不暴露问题原因，统一归类到网络异常
                                action.networkError();
                            }
                        });
                    }
                }
            });
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
    }

    public interface refreshQrCodeAction{
        void networkError();
        void failure(String msg, QRCodeError error);
        void ok(Bitmap qrcodeImage);
        void relogin();
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

    public enum QRCodeError {
        NETWORK_ERROR("NETWORK_ERROR", "NETWORK_ERROR"),//network error
        NOTBINDING_PAYMENT("NOTBINDING_PAYMENT", "LGN2001011"),//not binging payment
        ORDER_NOT_PAID("ORDER_NOT_PAID", "LGN2001008"),//order not paid
        ACCOUNT_EXPIRED("EXPIRED", "LGN2001002"),//account expired
        NONE("NONE", "NONE");//no error

        private final String code;
        private final String name;

        QRCodeError(String code, String name){
            this.code = code;
            this.name = name;
        }

        public String getCode(){
            return code;
        }

        public String getName(){
            return this.name;
        }
    }

}
