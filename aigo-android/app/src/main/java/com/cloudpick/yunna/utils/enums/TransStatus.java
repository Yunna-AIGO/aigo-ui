package com.cloudpick.yunna.utils.enums;

import java.util.ArrayList;

/**
 * Created by maxwell on 17-12-26.
 */

public enum TransStatus {
    INIT("INIT", "init"),
    PENDING_PAYMENT("PENDING_PAYMENT", "pending_payment"),
    PROCESSING("PROCESSING", "processing"),
    SUCCEEDED("SUCCEEDED", "succeeded"),
    FAILED("FAILED", "failed"),
    TIMEOUT("TIMEOUT", "timeout"),
    PAY_CANCEL("PAY_CANCEL", "pay_cancel"),
    CLOSED("CLOSED", "closed");

    private final String code;
    private final String name;

    TransStatus(String code, String name){
        this.code = code;
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public static boolean isPending(String code){
        return pendingList.contains(code);
    }

    public static boolean isSuccess(String code){
        return successList.contains(code);
    }

    public static boolean isFailed(String code){
        return failedList.contains(code);
    }


    private static ArrayList<String> pendingList = new ArrayList<String>(){
        {
            pendingList.add("INIT");
            pendingList.add("PENDING_PAYMENT");
            pendingList.add("PROCESSING");
        }
    };
    private static ArrayList<String> successList = new ArrayList<String>(){
        {
            successList.add("SUCCEEDED");
        }
    };
    private static ArrayList<String> failedList = new ArrayList<String>(){
        {
            failedList.add("FAILED");
            failedList.add("TIMEOUT");
            failedList.add("PAY_CANCEL");
            failedList.add("CLOSED");
        }
    };
}