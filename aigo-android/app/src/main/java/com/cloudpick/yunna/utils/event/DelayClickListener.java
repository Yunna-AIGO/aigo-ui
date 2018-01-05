package com.cloudpick.yunna.utils.event;

import android.util.Log;
import android.view.View;

import com.cloudpick.yunna.utils.Constants;

import java.util.Calendar;

/**
 * Created by maxwell on 18-1-5.
 */

public abstract class DelayClickListener implements View.OnClickListener {
    public static final int MIN_CLICK_DELAY_TIME = 1000;//1s
    private long lastClickTime = 0;

    public abstract void onNoDoubleClick(View v);
    @Override
    public void onClick(View v) {
        Log.d(Constants.LOG_TAG, "on click");
        long currentTime = Calendar.getInstance().getTimeInMillis();
        if (currentTime - lastClickTime > MIN_CLICK_DELAY_TIME) {
            lastClickTime = currentTime;
            onNoDoubleClick(v);
        }
    }
}