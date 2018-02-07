package com.cloudpick.yunna.utils.http;

import android.net.Uri;

import com.cloudpick.yunna.utils.AppData;
import com.cloudpick.yunna.utils.Constants;
import com.google.gson.Gson;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import okhttp3.Call;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;

/**
 * Created by maxwell on 17-12-14.
 * 对okhttp3简单封装
 */

public class Requests {

    private static final String TAG = "CloudPick";
    private static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");
    private static final int ConnectionTimeout = 3 * 1000;
    private static final int ReadTimeout = 3 * 1000;
    private static final int WriteTimeout = 3 * 1000;


    public Requests(){

    }

    /**
     * get
     * @param url
     * @param queryParams
     * @param clazz
     * @param <T>
     * @return
     * @throws IOException
     */
    public static <T> T get(String url, Map<String, String> queryParams, Class<T> clazz) throws IOException{
        String u = parseUrl(url, queryParams);
        Request request = handleCustomHanders(new Request.Builder().url(u), getCustomeHeaders()).build();
        okhttp3.Response response = newClient().newCall(request).execute();
        if(response.isSuccessful()){
            String json = response.body().string();
            return new Gson().fromJson(json, clazz);
        }else{
            throw new IOException("request failed, code:" + response.code());
        }
    }

    /**
     * get
     * @param url
     * @param queryParams
     * @param type
     * @param <T>
     * @return
     * @throws IOException
     */
    public static <T> T get(String url, Map<String, String> queryParams, Type type) throws IOException{
        //TODO 将获取类型封装到内部
        String u = parseUrl(url, queryParams);
        Request request = handleCustomHanders(new Request.Builder().url(u), getCustomeHeaders()).build();
        okhttp3.Response response = newClient().newCall(request).execute();
        if(response.isSuccessful()){
            String json = response.body().string();
            return new Gson().fromJson(json, type);
        }else{
            throw new IOException("request failed, code:" + response.code());
        }
    }

    public static <T> T post(String url, Map<?, ?> data, Class<T> clazz) throws IOException{
        RequestBody body = RequestBody.create(JSON, new Gson().toJson(data));
        Request request = handleCustomHanders(new Request.Builder().url(url).post(body), getCustomeHeaders()).build();
        okhttp3.Response response = newClient().newCall(request).execute();
        if(response.isSuccessful()){
            String json = response.body().string();
            return new Gson().fromJson(json, clazz);
        }else{
            throw new IOException("request failed, code:" + response.code());
        }
    }

    public static <T> T post(String url, Map<?, ?> data, Type type) throws IOException{
        //TODO 将获取类型封装到内部
        RequestBody body = RequestBody.create(JSON, new Gson().toJson(data));
        Request request = handleCustomHanders(new Request.Builder().url(url).post(body), getCustomeHeaders()).build();
        okhttp3.Response response = newClient().newCall(request).execute();
        if(response.isSuccessful()){
            String json = response.body().string();
            return new Gson().fromJson(json, type);
        }else{
            throw new IOException("request failed, code:" + response.code());
        }
    }


    /**
     * get 异步
     * @param url
     * @param queryParams
     * @param c callback
     */
    public static void getAsync(String url, Map<String, String> queryParams, final Callback c){
        String u = parseUrl(url, queryParams);
        Request request = handleCustomHanders(new Request.Builder().url(u), getCustomeHeaders()).build();
        Call call = newClient().newCall(request);
        call.enqueue(new okhttp3.Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                c.error(e);
            }

            @Override
            public void onResponse(Call call, okhttp3.Response response) throws IOException {
                if(response.isSuccessful()){
                    String json = response.body().string();
                    Object o = new Gson().fromJson(json, c.getType());
                    c.ok(o);
                }else{
                    c.error(new IOException("request failed, code:" + response.code()));
                }
            }
        });
    }

    /**
     * post 异步
     * @param url
     * @param data
     * @param c callback
     */
    public static void postAsync(String url, Map<?, ?> data, final Callback c){
        RequestBody body = RequestBody.create(JSON, new Gson().toJson(data));
        Request request = handleCustomHanders(new Request.Builder().url(url).post(body), getCustomeHeaders()).build();
        Call call = newClient().newCall(request);
        call.enqueue(new okhttp3.Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                c.error(e);
            }

            @Override
            public void onResponse(Call call, okhttp3.Response response) throws IOException {
                if(response.isSuccessful()){
                    String json = response.body().string();
                    Object o = new Gson().fromJson(json, c.getType());
                    c.ok(o);
                }else{
                    c.error(new IOException("request failed, code:" + response.code()));
                }
            }
        });
    }


    private static OkHttpClient newClient(){
        return new OkHttpClient.Builder()
                .connectTimeout(ConnectionTimeout, TimeUnit.MILLISECONDS)
                .writeTimeout(WriteTimeout, TimeUnit.MILLISECONDS)
                .readTimeout(ReadTimeout, TimeUnit.MILLISECONDS)
                .build();
    }

    private static String parseUrl(String url, Map<String, String> queryParams){
        if(queryParams == null){
            return url;
        }
        Uri.Builder builder = Uri.parse(url).buildUpon();
        for (String key : queryParams.keySet()) {
            builder.appendQueryParameter(key, queryParams.get(key));
        }
        return builder.build().toString();
    }

    private static Request.Builder handleCustomHanders(Request.Builder builder, Map<String, String> headers){
        for (String key : headers.keySet()) {
            builder.addHeader(key, headers.get(key));
        }
        return builder;
    }

    private static Map<String, String> getCustomeHeaders(){
        Map<String, String> headers = new HashMap<>();
        String token = AppData.getAppData().getAsString(Constants.KEY_TOKEN);
        if(token == null){
            token = "";
        }
        headers.put(Constants.KEY_TOKEN, token);
        return headers;

    }
}
