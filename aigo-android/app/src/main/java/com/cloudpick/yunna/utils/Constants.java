package com.cloudpick.yunna.utils;

/**
 * Created by maxwell on 17-12-9.
 */

public class Constants {
    // options
    public static final String LOG_TAG = "CloudPick";

    private static final String urlPrefix = Define.getUrlPrefix();
    public static final String imgUrlPrefix = "http://img.yunatop.com/";

    //app
    public static final String APP_NAMESPACE = "com.cloudpick.yunna";
    public static final Integer REFRESH_QRCODE_INTERVAL = 1000 * 60;
    public static final Integer ORDER_PAGE_SIZE = 10;
    public static final String TERM_OF_SERVICE_URL = "http://www.cloudpick.me/TermOfService.html";
    public static final String PACKAGE_NAME_ALIPAY = "com.eg.android.AlipayGphone";
    public static final String PACKAGE_NAME_WECHAT = "com.tencent.mm";
    public static final String APP_SCHEME = "yunna";
    public static final String ALIPAY_URL_PREFIX = "alipays://platformapi/startapp?appId=20000067&url=";
    public static final boolean SHOW_SKIP_IN_BINDING_PAYMENT = Define.showSkipInBindingPayment();

    //response
    public static final String RESP_SUCCESS = "0000";


    //Keys
    public static final String KEY_TOKEN_EXPIREDIN = "expiredIn";
    public static final String KEY_USER_ID = "userId";
    public static final String KEY_TOKEN = "token";
    public static final String KEY_CAPTCHA_URL = "captchaUrl";
    public static final String KEY_HAS_COUPON = "coupon";
    public static final String KEY_COUPON_TYPE = "couponType";
    public static final String KEY_ORDER_ID = "orderId";
    public static final String KEY_PAY_TYPE = "payType";
    public static final String KEY_TRADE_STATUS = "transStatus";
    public static final String KEY_ENTRY_URL = "entryUrl";
    public static final String KEY_NICKNAME = "nickName";
    public static final String KEY_MOBILE = "mobile";
    public static final String KEY_PIC_URL = "picUrl";
    public static final String KEY_SIGN_REQUEST_INFO = "signRequestInfo";
    public static final String KEY_PUSH_TYPE = "type";
    public static final String KEY_SUBSCRIBER_ID = "receiverId";
    public static final String KEY_SUBSCRIBER_ID_REGIST_STATUS = "subscriberIdRegisted";



    //apis
    public static final String URL_ENTRY = urlPrefix + "logon/entry";
    public static final String URL_SENDSMS_V2 = urlPrefix + "logon/sendsmsV2";
    public static final String URL_REFRESH_CAPTCHA = urlPrefix + "logon/captcha";
    public static final String URL_QRCODE = urlPrefix + "logon/qrcode";
    public static final String URL_USER_INFO = urlPrefix + "user/%s/getNormalUser";
    public static final String URL_ORDERS = urlPrefix + "order/%s/list";
    public static final String URL_ORDER_INFO = urlPrefix + "order/%s/info";
    public static final String URL_DUT_LIST = urlPrefix + "dut/%s/list";
    public static final String URL_DUT_SIGN = urlPrefix + "dut/sign";
    public static final String URL_DUT_UNSIGN = urlPrefix + "dut/unsign";
    public static final String URL_COUPON = urlPrefix + "coupon/%s/list";
    public static final String URL_TRADE_PAY = urlPrefix + "trade/pay";
    public static final String URL_FEEDBACK_INSERT = urlPrefix + "feedback/insert";
    public static final String URL_FEEDBACK_QUERY = urlPrefix + "feedback/select/%s";
    public static final String URL_APP_VERSION = urlPrefix + "app/version";
    public static final String URL_LOGOUT = urlPrefix + "logon/out";
    public static final String URL_SKD_INFO = urlPrefix + "logon/sdkInfo";
    public static final String TRADE_INFO = urlPrefix + "trade/%s/info";


}
