package com.cloudpick.yunna.utils.http;

import android.text.TextUtils;

import com.cloudpick.yunna.utils.Constants;

import java.util.Map;

/**
 * Created by maxwell on 17-12-19.
 */

public class Response<T>{

    public Response(){

    }

    private String code;
    private String message;
    private T data;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public String getMessage(String prefix){
        if(TextUtils.isEmpty(message)){return prefix;}
        else{return prefix + ":" + message;}
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public boolean isSuccess(){
        return code.equals(Constants.RESP_SUCCESS);
    }


    //TODO user信息格式不规范，后期调整，统一用data
    private T userInfo;
    public T getUserInfo() {
        return userInfo;
    }

    //版本api返回数据格式
    //{"code":"0000","osType":"android","versionNo":"1.2.2","downloadUrl":"https://www.pgyer.com/JomV","force":false,"success":true}
    private String osType;
    private String versionNo;
    private String downloadUrl;
    private boolean force;

    public String getOsType() {
        return osType;
    }

    public String getVersionNo() {
        return versionNo;
    }

    public String getDownloadUrl() {
        return downloadUrl;
    }

    public boolean isForce() {
        return force;
    }
}
