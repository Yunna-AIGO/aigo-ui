package com.cloudpick.aigo.utils.enums;

/**
 * Created by maxwell on 17-12-13.
 */

public enum AgreementStatus {
    NORMAL("NORMAL"),//正常
    TEMP("TEMP"),//未生效
    STOP("STOP"),//暂停使用
    UNSIGN("UNSIGN");//解约

    private final String value;

    AgreementStatus(String value){
        this.value = value;
    }

    public String getValue(){
        return value;
    }
}