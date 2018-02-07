package com.cloudpick.yunna.utils.enums;

import java.util.ArrayList;

/**
 * Created by maxwell on 17-12-26.
 */

public enum TransStatus {
    INIT("00","待支付"),
    PENDING_PAYMENT("01","支付进行中"), //已经发送第三方支付
    PROCESSING("02","交易处理中"),//查询第三方支付交易状态为处理中
    SUCCEEDED("04","支付成功"),
    FAILED("05","交易失败"), //明确支付失败
    TIMEOUT("08"," 交易过期"), //过了一段时间没有支付会过期
    PAY_CANCEL("09","交易取消"),//第三方不存在该笔交易
    CLOSED("10","交易关闭");//第三方交易超时未支付或关闭

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

    public static TransStatus codeOf(String code) throws Exception{
        switch (code){
            case "00":
                return INIT;
            case "01":
                return PENDING_PAYMENT;
            case "02":
                return PROCESSING;
            case "04":
                return SUCCEEDED;
            case "05":
                return FAILED;
            case "08":
                return TIMEOUT;
            case "09":
                return PAY_CANCEL;
            case "10":
                return CLOSED;
            default:
                throw new Exception(String.format("code %s is not convert to TransStatus", code));
        }
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

    private static ArrayList<String> pendingList = new ArrayList<String>();
    private static ArrayList<String> successList = new ArrayList<String>();
    private static ArrayList<String> failedList = new ArrayList<String>();
    static {
        pendingList.add("01");
        pendingList.add("02");

        successList.add("04");

        failedList.add("05");
        failedList.add("08");
        failedList.add("09");
        failedList.add("10");
    }
}