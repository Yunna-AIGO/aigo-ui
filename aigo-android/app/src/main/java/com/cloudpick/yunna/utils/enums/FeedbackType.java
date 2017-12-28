package com.cloudpick.yunna.utils.enums;

/**
 * Created by maxwell on 17-12-28.
 */

public enum FeedbackType {
    ADVICE("advice", "建议"),
    PROBLEM("problem", "问题"),
    APPEAL("appeal", "订单申诉");

    private final String code;
    private final String name;

    FeedbackType(String code, String name){
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
