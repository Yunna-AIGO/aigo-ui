package com.cloudpick.yunna.utils.message;

import android.os.Parcel;
import android.os.Parcelable;

import com.cloudpick.yunna.utils.enums.AppActionTypes;

/**
 * Created by maxwell on 18-1-25.
 */

public class AppAction implements Parcelable {

    private AppActionTypes appActionTypes;

    public AppAction(AppActionTypes appActionTypes){
        this.appActionTypes = appActionTypes;
    }

    public AppActionTypes getAppActionTypes() {
        return appActionTypes;
    }

    // implements Parcelable

    public int describeContents()
    {
        return 0;
    }

    public void writeToParcel(Parcel out, int flags)
    {
        out.writeString(appActionTypes.getCode());
    }

    private AppAction(Parcel in)
    {
        appActionTypes = AppActionTypes.valueOf(in.readString());
    }

    public static final Parcelable.Creator<AppAction> CREATOR = new Parcelable.Creator<AppAction>()
    {
        public AppAction createFromParcel(Parcel in)
        {
            return new AppAction(in);
        }

        public AppAction[] newArray(int size)
        {
            return new AppAction[size];
        }
    };

}
