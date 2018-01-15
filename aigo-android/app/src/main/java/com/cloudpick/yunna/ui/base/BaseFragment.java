package com.cloudpick.yunna.ui.base;


import android.content.Context;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

/**
 * Created by maxwell on 18-1-15.
 */

public abstract class BaseFragment extends Fragment {

    protected BaseActivity hostActivity;

    /**
     * 初始化Fragment View
     * @param view
     * @param savedInstanceState
     */
    protected abstract void initView(View view, Bundle savedInstanceState);

    /**
     * 获取布局文件ID
     * @return
     */
    protected abstract int getLayoutId();

    /**
     * 获取宿主Activity
     * @return
     */
    protected BaseActivity getHostActivity() {
        return hostActivity;
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        this.hostActivity = (BaseActivity)context;
    }

//    /**
//     * 添加fragment
//     * @param fragment
//     */
//    protected void addFragment(BaseFragment fragment) {
//        if (null != fragment) {
//            getHostActivity().addFragment(fragment);
//        }
//    }
//
//    /**
//     * 移除fragment
//     */
//    protected void removeFragment() {
//        getHostActivity().removeFragment();
//    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(getLayoutId(), container, false);
        initView(view, savedInstanceState);
        return view;
    }




}
