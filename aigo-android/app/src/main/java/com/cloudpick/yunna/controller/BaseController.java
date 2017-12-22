package com.cloudpick.yunna.controller;

import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.os.Parcel;
import android.os.Parcelable;
import android.util.Log;

/**
 * Created by maxwell on 17-12-18.
 */

public class BaseController implements Parcelable {

    protected Context context;
    protected Handler handler = null;

    public BaseController(Context context){
        this.context = context;
        this.handler = new Handler(Looper.getMainLooper());
    }


    /**
     * 保存控制器相关状态,如果需要，子类重载该方法
     * @param out
     * @param flags
     */
    public void saveControllerStatus(Parcel out, int flags){

    }

    /**
     * 恢复控制器相关状态,如果需要，子类重载该方法
     * @param in
     */
    public void restoreControllerStatus(Parcel in){

    }


    public int describeContents()
    {
        return 0;
    }

    public void writeToParcel(Parcel out, int flags)
    {
        saveControllerStatus(out, flags);
    }

    private BaseController(Parcel in)
    {
        restoreControllerStatus(in);
    }

    public static final Parcelable.Creator<BaseController> CREATOR = new Parcelable.Creator<BaseController>()
    {
        public BaseController createFromParcel(Parcel in)
        {
            return new BaseController(in);
        }

        public BaseController[] newArray(int size)
        {
            return new BaseController[size];
        }
    };


}
