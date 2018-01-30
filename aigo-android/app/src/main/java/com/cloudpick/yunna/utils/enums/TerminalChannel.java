package com.cloudpick.yunna.utils.enums;

/**
 * Created by maxwell on 17-12-13.
 */

public enum TerminalChannel {
    ALIPAYAPP("ALIPAYAPP", "支付宝钱包"),
    WECHAT("WECHAT", "微信钱包"),
    PC("PC", "PC端访问"),
    WAP("WAP", "WAP访问");

    private final String code;
    private final String name;

    TerminalChannel(String code, String name){
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
