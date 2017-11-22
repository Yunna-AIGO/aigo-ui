package com.cloudpick.myapp.alipay;

import android.util.Log;

import com.alipay.sdk.app.EnvUtils;
import com.alipay.sdk.app.PayTask;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;

/**
 * Created by m2mbob on 16/5/6.
 */
public class AlipayModule extends ReactContextBaseJavaModule {

    private static final int SDK_PAY_FLAG = 1;
    private static final int SDK_CHECK_FLAG = 2;
    private static final String TAG = "AlipayModule";

    public AlipayModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    public void pay(final String payInfo,
                    final Promise promise) {
        // EnvUtils.setEnv(EnvUtils.EnvEnum.SANDBOX);
        Runnable payRunnable = new Runnable() {
            @Override
            public void run() {
                try {
                    PayTask alipay = new PayTask(getCurrentActivity());
                    Map<String, String> result = alipay.payV2(payInfo, true);
                    PayResult payResult = new PayResult(result);
                    String resultStatus = payResult.getResultStatus();
                    String memo = payResult.getMemo();
                    String resultJson = payResult.getResult();

                    if(Integer.valueOf(resultStatus) >= 8000){
                        promise.resolve(payResult.getWritableNativeMap());
                    }else{
                        promise.reject(memo,
                                new RuntimeException(resultStatus+":"+memo+":"+resultJson));
                    }
                } catch (Exception e) {
                    Log.d(TAG, e.getMessage(), e);
                    promise.reject(e.getLocalizedMessage(), e);
                }
            }
        };

        Thread payThread = new Thread(payRunnable);
        payThread.start();
    }

    @Override
    public String getName() {
        return "AlipayModule";
    }

}
