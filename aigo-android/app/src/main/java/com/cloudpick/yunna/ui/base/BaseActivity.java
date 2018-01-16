package com.cloudpick.yunna.ui.base;

import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.view.KeyEvent;

import com.cloudpick.yunna.ui.dialog.LoadingDialog;
import com.cloudpick.yunna.utils.Tools;

import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.locks.ReentrantLock;

/**
 * Created by maxwell on 18-1-15.
 */

public abstract class BaseActivity extends AppCompatActivity {

    /**
     * 标记Activity中View的资源是否已经准备好
     */
    private boolean isViewResReady = false;
    public boolean isViewResReady() {
        return isViewResReady;
    }

    /**
     * 标记Activity是否正在执行runActivityTask
     */
    private boolean isActivityBusy = false;

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
    protected Fragment getCurrentFragment(){
        return null;
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        setContentView(getContentViewId());
        initView(savedInstanceState);
        isViewResReady = true;
    }

    /**
     * 以独占方式执行一个任务，即在执行任务时显示loading框
     * 如果原本的方法已经是异步操作了，可以将action设置未null。
     * 但是必须手动调用TerminateFakeActivityTask方法来退出loading
     * @param action 需要运行的任务以及任务结束后的方法委托的操作类
     */
    public void runActivityTask(String title, String subTitle, ActivityTaskAction action){
        if(isActivityBusy){
            System.out.println("activity is busy now!");
            return;
        }
        isActivityBusy = true;
        LoadingDialog.Builder builder = new LoadingDialog.Builder();
        if(!TextUtils.isEmpty(title)){
            builder.setTitle(title);
        }
        if(!TextUtils.isEmpty(subTitle)){
            builder.setSubTitle(subTitle);
        }
        builder.setLoadingAction(new LoadingDialog.LoadingAction() {
            @Override
            public Object exec() {
                if(action == null){
                    ActivityTaskAction defaultAction = fakeActivityTaskAction();
                    return defaultAction.execTask();
                }else{
                    return action.execTask();
                }
            }
            @Override
            public void onComplete(Object param) {
                if(action != null){
                    action.complete(param);
                }
                isActivityBusy = false;
            }
        });
        builder.build(BaseActivity.this).loading();
    }

    public interface ActivityTaskAction{
        /**
         * 任务具体实现
         * @return 任务返回结果
         */
        Object execTask();

        /**
         * 任务完成后需要执行的方法
         * @param param execTask返回的结果
         */
        void complete(Object param);
    }

    private AtomicBoolean isFakeTaskRunning = new AtomicBoolean(false);
    private ActivityTaskAction fakeActivityTaskAction(){
        return new ActivityTaskAction() {
            @Override
            public Object execTask() {
                isFakeTaskRunning.set(true);
                while(isFakeTaskRunning.get()){
                    Tools.Sleep(500);
                }
                return null;
            }
            @Override
            public void complete(Object param) {
            }
        };
    }

    /**
     * 终止fake activity task
     */
    public void TerminateFakeActivityTask(){
        isFakeTaskRunning.set(false);
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
