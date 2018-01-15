package com.cloudpick.yunna.ui.base;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatActivity;
import android.view.KeyEvent;

/**
 * Created by maxwell on 18-1-15.
 */

public abstract class BaseActivity extends AppCompatActivity {

    private boolean isViewResReady = false;

    public boolean isViewResReady() {
        return isViewResReady;
    }

    /**
     * 布局文件ID
     * @return
     */
    protected abstract int getContentViewId();

    protected abstract void initView(Bundle savedInstanceState);

    /**
     * 获取当前显示的fragment
     * @return
     */
    protected abstract Fragment getCurrentFragment();


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(getContentViewId());
        initView(savedInstanceState);
        isViewResReady = true;
    }


//    /**
//     * 添加fragment
//     * @param fragment
//     */
//    protected void addFragment(BaseFragment fragment) {
//        if (fragment != null) {
//            getSupportFragmentManager().beginTransaction()
//                    .replace(getFragmentContentId(), fragment, fragment.getClass().getSimpleName())
//                    .addToBackStack(fragment.getClass().getSimpleName())
//                    .commitAllowingStateLoss();
//        }
//    }
//
//    /**
//     * 移除fragment
//     */
//    protected void removeFragment() {
//        if (getSupportFragmentManager().getBackStackEntryCount() > 1) {
//            getSupportFragmentManager().popBackStack();
//        } else {
//            finish();
//        }
//    }
//
//    /**
//     * 返回键返回事件
//     * @param keyCode
//     * @param event
//     * @return
//     */
//    @Override
//    public boolean onKeyDown(int keyCode, KeyEvent event) {
//        if (KeyEvent.KEYCODE_BACK == keyCode) {
//            if (getSupportFragmentManager().getBackStackEntryCount() == 1) {
//                finish();
//                return true;
//            }
//        }
//        return super.onKeyDown(keyCode, event);
//    }
}
