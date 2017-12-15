package com.cloudpick.aigo.utils;

import java.util.Map;

/**
 * Created by maxwell on 17-12-11.
 */

public class RespUser{
    private String code;
    private String message;
    private Map<String, String> userInfo;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Map<String, String> getUserInfo() {
        return userInfo;
    }
}
