package com.cloudpick.aigo.utils.enums;

/**
 * Created by maxwell on 17-12-13.
 */

public enum TerminalChannel {
    ALIPAYAPP("ALIPAYAPP"), //支付宝钱包
    PC("PC"), //PC端访问
    WAP("WAP"); //WAP访问

    private final String value;

    TerminalChannel(String value){
        this.value = value;
    }

    public String getValue(){
        return value;
    }
}
