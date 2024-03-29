package com.cloudpick.yunna.ui;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.cloudpick.yunna.R;
import com.cloudpick.yunna.ui.base.BaseActivity;
import com.cloudpick.yunna.utils.Constants;

import butterknife.BindView;
import butterknife.ButterKnife;

public class TermOfServiceActivity extends BaseActivity {

    @BindView(R.id.tb_term_of_service)
    Toolbar toolbar;
    @BindView(R.id.wv_term_of_service)
    WebView webView;

    @Override
    protected int getContentViewId(){
        return R.layout.activity_term_of_service;
    }

    @Override
    protected void initView(Bundle savedInstanceState){
        ButterKnife.bind(this);

        setSupportActionBar(toolbar);
        toolbar.setNavigationIcon(R.drawable.back);
        toolbar.setNavigationOnClickListener((v)->{
            TermOfServiceActivity.this.finish();
        });
        webView.getSettings().setDomStorageEnabled(true);
        webView.getSettings().setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);
        webView.loadUrl(Constants.TERM_OF_SERVICE_URL);
        //覆盖WebView默认使用第三方或系统默认浏览器打开网页的行为，使网页用WebView打开
        webView.setWebViewClient(new WebViewClient(){
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                //返回值是true的时候控制去WebView打开，为false调用系统浏览器或第三方浏览器
                view.loadUrl(url);
                return true;
            }
        });
    }
}
