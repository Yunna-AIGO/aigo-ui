package com.cloudpick.yunna.utils;

/**
 * Created by maxwell on 17-12-9.
 */

public class Constants {
    // options

    // local test
    //private static final String urlPrefix = "http://192.168.2.120:9000/api/v1/";
    //test
    private static final String urlPrefix = "http://10.10.10.130:8080/cloudpick/rest/api/v1/";
    //云
    //private static final String urlPrefix = "http://47.100.13.231/cloudpick/rest/api/v1/";

    //签约代扣界面是否显示“跳过”按钮
    public static final boolean OPT_SHOW_SKIP_IN_PAYMENT_ACTIVITY = true;



    //app
    public static final String VERSION = "1.0.0.alpha";
    public static final String APP_NAMESPACE = "com.cloudpick.yunna";
    public static final Integer REFRESH_QRCODE_INTERVAL = 1000 * 60;
    public static final Integer ORDER_PAGE_SIZE = 10;
    public static final String TERM_OF_SERVICE_URL = "http://www.cloudpick.me/TermOfService.html";
    public static final String PACKAGE_NAME_ALIPAY = "com.eg.android.AlipayGphone";
    public static final String APP_SCHEME = "yunna";
    public static final String ALIPAY_URL_PREFIX = "alipays://platformapi/startapp?appId=20000067&url=";


    //response
    public static final String RESP_SUCCESS = "0000";


    //Keys
    public static final String KEY_TOKEN_EXPIREDIN = "expiredIn";
    public static final String KEY_USER_ID = "userId";
    public static final String KEY_TOKEN = "token";
    public static final String KEY_ENTRY_URL = "entryUrl";
    public static final String KEY_NICKNAME = "nickName";
    public static final String KEY_MOBILE = "mobile";
    public static final String KEY_PIC_URL = "picUrl";
    public static final String KEY_SIGNED = "signed";
    public static final String KEY_AGREEMENT_STATUS = "agreementStatus";
    public static final String KEY_SIGN_REQUEST_INFO = "signRequestInfo";


    //apis
    public static final String URL_ENTRY = urlPrefix + "logon/entry";
    public static final String URL_SENDSMS = urlPrefix + "logon/sendsms?mobile=%s";
    public static final String URL_QRCODE = urlPrefix + "logon/qrcode";
    public static final String URL_USER_INFO = urlPrefix + "user/%s/getNormalUser";
    public static final String URL_ORDERS = urlPrefix + "order/%s/list?pageNum=%s&pageSize=%s&orderStatus=%s&orderType=%s&startDate=%s&endDate=%s";
    public static final String URL_ORDER_INFO = urlPrefix + "order/%s/info";
    public static final String URL_DUT_QUERY = urlPrefix + "dut/query?userId=%s&thirdType=%s";
    public static final String URL_DUT_SIGN = urlPrefix + "dut/sign";
    public static final String URL_DUT_UNSIGN = urlPrefix + "dut/unsign";

}
