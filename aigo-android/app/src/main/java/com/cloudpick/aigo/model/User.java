package com.cloudpick.aigo.model;

import android.content.SharedPreferences;
import android.support.annotation.Nullable;

import com.cloudpick.aigo.utils.Constants;

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

    private SharedPreferences sp = null;
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

    public User init(SharedPreferences sp){
        this.sp = sp;
        return this;
    }

    /*
     * check user in local
     * if not pass return false
     */
    public boolean checkUser(){
        userId = sp.getString(Constants.KEY_USER_ID, "");
        token = sp.getString(Constants.KEY_TOKEN, "");
        return userId != "" && token != "";
    }

    public void saveToken(String userId, String token){
        this.userId = userId;
        this.token = token;
        SharedPreferences.Editor editor = sp.edit();
        editor.putString(Constants.KEY_USER_ID, userId);
        editor.putString(Constants.KEY_TOKEN, token);
        editor.commit();
    }

    public void signout(){
        SharedPreferences.Editor editor = sp.edit();
        editor.putString(Constants.KEY_TOKEN, "");
        editor.commit();
    }

    public void setUserInfo(String nickName, String mobile, String picUrl){
        this.nickName = nickName;
        this.mobile = mobile;
        this.picUrl = picUrl;
    }

}
