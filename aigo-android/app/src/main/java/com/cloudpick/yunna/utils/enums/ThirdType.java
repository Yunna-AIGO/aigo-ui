package com.cloudpick.yunna.utils.enums;

/**
 * Created by maxwell on 17-12-13.
 */

public enum ThirdType{
    ALIPAY("ALIPAY"), WECHAT("WECHAT");

    private final String value;

    ThirdType(String value){
        this.value = value;
    }

    public String getValue(){
        return value;
    }
}

//public class ThirdType {
//    ThirdType("ALIPAY","支付宝"),
//    ThirdType("WECHAT","微信"),
//}

//
//public enum Gender{
//    //通过括号赋值,而且必须带有一个参构造器和一个属性跟方法，否则编译出错
//    //赋值必须都赋值或都不赋值，不能一部分赋值一部分不赋值；如果不赋值则不能写构造器，赋值编译也出错
//    MAN("MAN"), WOMEN("WOMEN");
//
//    private final String value;
//
//    //构造器默认也只能是private, 从而保证构造函数只能在内部使用
//    Gender(String value) {
//        this.value = value;
//    }
//
//    public String getValue() {
//        return value;
//    }
//}