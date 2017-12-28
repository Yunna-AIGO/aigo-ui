package com.cloudpick.yunna.model;

import android.os.Parcel;
import android.os.Parcelable;
import android.text.TextUtils;

import com.cloudpick.yunna.utils.enums.FeedbackStatus;

/**
 * Created by maxwell on 17-12-28.
 */

public class Feedback extends BaseModel implements Parcelable {

    private String recordId;
    private String userId;
    private String orderNo;
    private String status;
    private String desc;
    private String handleResult;

    public Feedback(){
    }

    public String getOrderNo() {
        return orderNo;
    }

    public String getDesc() {
        return desc;
    }

    public String getHandleResult() {
        return handleResult;
    }

    public FeedbackStatus getFeedbackStatus(){
        FeedbackStatus fbs = FeedbackStatus.ACCEPT;
        try{
            fbs = FeedbackStatus.valueOf(status.toUpperCase());
        }catch (Exception e){
        }
        return fbs;
    }

    public boolean isDone(){
        return !TextUtils.isEmpty(status) && status.equals(FeedbackStatus.DONE.getCode());
    }




    //implement Parcelable

    public int describeContents()
    {
        return 0;
    }

    public void writeToParcel(Parcel out, int flags)
    {
        out.writeString(recordId);
        out.writeString(userId);
        out.writeString(orderNo);
        out.writeString(status);
        out.writeString(desc);
        out.writeString(handleResult);
    }

    private Feedback(Parcel in)
    {
        recordId = in.readString();
        userId = in.readString();
        orderNo = in.readString();
        status = in.readString();
        desc = in.readString();
        handleResult = in.readString();
    }

    public static final Parcelable.Creator<Feedback> CREATOR = new Parcelable.Creator<Feedback>()
    {
        public Feedback createFromParcel(Parcel in)
        {
            return new Feedback(in);
        }

        public Feedback[] newArray(int size)
        {
            return new Feedback[size];
        }
    };
}
