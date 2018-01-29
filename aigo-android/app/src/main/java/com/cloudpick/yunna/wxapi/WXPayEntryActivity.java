package com.cloudpick.yunna.wxapi;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.ImageView;
import android.widget.TextView;

import com.cloudpick.yunna.R;
import com.cloudpick.yunna.ui.base.BaseActivity;
import com.cloudpick.yunna.utils.WXApi;
import com.tencent.mm.opensdk.constants.ConstantsAPI;
import com.tencent.mm.opensdk.modelbase.BaseReq;
import com.tencent.mm.opensdk.modelbase.BaseResp;
import com.tencent.mm.opensdk.openapi.IWXAPIEventHandler;

import butterknife.BindView;
import butterknife.ButterKnife;

import static com.cloudpick.yunna.utils.Constants.LOG_TAG;

public class WXPayEntryActivity extends BaseActivity implements IWXAPIEventHandler {

    public static WXPayResponse wxPayResp = null;

    @BindView(R.id.tv_pay_result)
    TextView tv_pay_result;

    @BindView(R.id.img_pay_result)
    ImageView img_pay_result;

    @Override
    protected int getContentViewId(){
        return R.layout.wx_pay_result;
    }

    @Override
    protected void initView(Bundle savedInstanceState){
        ButterKnife.bind(this);
        WXApi.getInstance(this).getApi().handleIntent(getIntent(), this);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        WXApi.getInstance(this).getApi().handleIntent(intent, this);
    }

    @Override
    public void onReq(BaseReq req) {
    }

    @Override
    public void onResp(BaseResp resp) {
        Log.d(LOG_TAG, "onPayFinish, errCode = " + resp.errCode);
        if (resp.getType() == ConstantsAPI.COMMAND_PAY_BY_WX) {
            int result = resp.errCode;
            if(result == WXApi.PAY_RESULT_SUCCESSED){
                img_pay_result.setImageResource(R.drawable.pay_success);
                tv_pay_result.setText(R.string.message_wechat_pay_result_success);
            }else{
                img_pay_result.setImageResource(R.drawable.pay_fail);
                if(result == WXApi.PAY_RESULT_CANCELED){
                    tv_pay_result.setText(R.string.message_wechat_pay_result_cancel);
                }else{
                    tv_pay_result.setText(R.string.message_wechat_pay_result_fail);
                }
            }

            getHandler().postDelayed(()->{
                if(wxPayResp != null){
                    wxPayResp.onResponse(resp.errCode);
                }
                WXPayEntryActivity.this.finish();
            }, 1500);
        }
    }

    public interface WXPayResponse{
        void onResponse(int respErrCode);
    }
}