package com.cloudpick.yunna.utils.http;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Map;

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

    private static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");

    public Requests(){

    }

    /**
     * get
     * @param url
     * @param clazz
     * @param <T>
     * @return
     * @throws IOException
     */
    public static <T> T get(String url, Class<T> clazz) throws IOException{
        Request request = new Request.Builder().url(url).build();
        okhttp3.Response response = new OkHttpClient().newCall(request).execute();
        return new Gson().fromJson(response.body().string(), clazz);
    }

    /**
     * get
     * @param url
     * @param type
     * @param <T>
     * @return
     * @throws IOException
     */
    public static <T> T get(String url, Type type) throws IOException{
        //TODO 将获取类型封装到内部
        Request request = new Request.Builder().url(url).build();
        okhttp3.Response response = new OkHttpClient().newCall(request).execute();
        return new Gson().fromJson(response.body().string(), type);
    }


    public static <T> T post(String url, Map<?, ?> data, Class<T> clazz) throws IOException{
        RequestBody body = RequestBody.create(JSON, new Gson().toJson(data));
        Request request = new Request.Builder().url(url).post(body).build();
        okhttp3.Response response = new OkHttpClient().newCall(request).execute();
        return new Gson().fromJson(response.body().string(), clazz);
    }


    /**
     * get 异步
     * @param url
     * @param c callback
     */
    public static void getAsync(String url, final Callback c){
        Request request = new Request.Builder().url(url).build();
        Call call = new OkHttpClient().newCall(request);
        call.enqueue(new okhttp3.Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                c.error(e);
            }

            @Override
            public void onResponse(Call call, okhttp3.Response response) throws IOException {
                Object o = new Gson().fromJson(response.body().string(), c.getType());
                c.ok(o);
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
        Request request = new Request.Builder().url(url).post(body).build();
        Call call = new OkHttpClient().newCall(request);
        call.enqueue(new okhttp3.Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                c.error(e);
            }

            @Override
            public void onResponse(Call call, okhttp3.Response response) throws IOException {
                Object o = new Gson().fromJson(response.body().string(), c.getType());
                c.ok(o);
            }
        });
    }

}
