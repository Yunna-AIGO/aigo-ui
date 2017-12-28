package com.cloudpick.yunna.utils.enums;

/**
 * Created by maxwell on 17-12-28.
 */

public enum FeedbackStatus {
    ACCEPT("accept", "已受理"),
    INPROCESS("inprocess", "处理中"),
    DONE("done", "已处理");

    private final String code;
    private final String name;

    FeedbackStatus(String code, String name){
        this.code = code;
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }
}