package com.cloudpick.yunna.model;

import android.content.Context;
import android.text.TextUtils;

import com.cloudpick.yunna.utils.ACache;
import com.cloudpick.yunna.utils.Constants;

/**
 * Created by maxwell on 17-12-9.
 */

public class User {

    private volatile static User user = null;

    public static User getUser(){
        if(user == null){
            synchronized(User.class){
                if(user == null){
                    user = new User();
                }
            }
        }
        return user;
    }

    private final Integer defaultTokenExpiredIn = 90 * ACache.TIME_DAY;

    private ACache cache = null;
    private String userId;
    private String mobile;
    private String nickName;
    private String token;
    private String picUrl;

    public String getUserId() {
        return userId;
    }

    public String getToken() {
        return token;
    }

    public String getMobile() {
        return mobile;
    }

    public String getNickName() {
        return nickName;
    }

    public String getPicUrl() {
        return picUrl;
    }

    private User(){
    }

    public User init(Context context){
        cache = ACache.get(context);
        return this;
    }

    /*
     * check user in local
     * if not pass return false
     */
    public boolean checkUser(){
        userId = cache.getAsString(Constants.KEY_USER_ID);
        token = cache.getAsString(Constants.KEY_TOKEN);
        return !TextUtils.isEmpty(userId) && !TextUtils.isEmpty(token);
    }

    public void saveToken(String userId, String token){
        this.userId = userId;
        this.token = token;
        cache.put(Constants.KEY_USER_ID, userId);
        cache.put(Constants.KEY_TOKEN, token, getTokenExpiredIn());
    }

    private int getTokenExpiredIn(){
        try{
            String expiredIn = cache.getAsString(Constants.KEY_TOKEN_EXPIREDIN);
            if(expiredIn == null){
                cache.put(Constants.KEY_TOKEN_EXPIREDIN, defaultTokenExpiredIn.toString());
                return defaultTokenExpiredIn;
            }
            return Integer.parseInt(expiredIn);
        }catch(Exception ex){
            System.out.println(ex.getMessage());
            return defaultTokenExpiredIn;
        }
    }

    public void signout(){
        cache.remove(Constants.KEY_TOKEN);
    }

    public void setUserInfo(String nickName, String mobile, String picUrl){
        this.nickName = nickName;
        this.mobile = mobile;
        this.picUrl = picUrl;
    }

    public void setTokenExpiredIn(String expiredInStr){
        Integer expiredIn = defaultTokenExpiredIn;
        switch(expiredInStr){
            case "1周":
                expiredIn = 7 * ACache.TIME_DAY;
                break;
            case "1个月":
                expiredIn = 30 * ACache.TIME_DAY;
                break;
            case "3个月":
                expiredIn = 90 * ACache.TIME_DAY;
                break;
            case "6个月":
                expiredIn = 180 * ACache.TIME_DAY;
                break;
            case "9个月":
                expiredIn = 270 * ACache.TIME_DAY;
                break;
            case "1年":
                expiredIn = 365 * ACache.TIME_DAY;
                break;
        }
        cache.put(Constants.KEY_TOKEN_EXPIREDIN, expiredIn.toString());
    }

    public int getTokenExpiredInSelection(){
        int ep = getTokenExpiredIn() / ACache.TIME_DAY;
        switch(ep){
            case 7:
                return 0;
            case 30:
                return 1;
            case 90:
                return 2;
            case 180:
                return 3;
            case 270:
                return 4;
            case 365:
                return 5;
        }
        return 2;
    }

}
