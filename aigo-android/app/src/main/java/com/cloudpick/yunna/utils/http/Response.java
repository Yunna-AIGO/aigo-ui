package com.cloudpick.yunna.utils.http;

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
        if(message.equals("")){return prefix;}
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
}
