package com.cloudpick.yunna.utils;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Map;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

/**
 * Created by maxwell on 17-12-14.
 */

public class Requests {

    private static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");

    public Requests(){

    }

    /**
     * get
     * @param url
     * @param <T> 数据类型
     * @return
     * @throws IOException
     */
    public static <T> T get(String url) throws IOException{
        Request request = new Request.Builder().url(url).build();
        Response response = new OkHttpClient().newCall(request).execute();
        Type objectType = new TypeToken<T>(){}.getType();
        return new Gson().fromJson(response.body().string(), objectType);
    }

    /**
     * post
     * @param url
     * @param data
     * @param <T> 数据类型
     * @return
     * @throws IOException
     */
    public static <T> T post(String url, Map<?, ?> data) throws IOException{
        RequestBody body = RequestBody.create(JSON, new Gson().toJson(data));
        Request request = new Request.Builder().url(url).post(body).build();
        Response response = new OkHttpClient().newCall(request).execute();
        Type objectType = new TypeToken<T>(){}.getType();
        return new Gson().fromJson(response.body().string(), objectType);
    }


    /**
     * get 异步
     * @param url
     * @param <T> 数据类型
     * @return
     * @throws IOException
     */
    public static <T> void getAsync(String url, final Failure failure, final Ok ok) throws IOException{
        Request request = new Request.Builder().url(url).build();
        Call call = new OkHttpClient().newCall(request);
        call.enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                failure.onFailure(e);
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                Type objectType = new TypeToken<T>(){}.getType();
                ok.onOk(new Gson().fromJson(response.body().string(), objectType));
            }
        });
    }

    /**
     * post 异步
     * @param url
     * @param data
     * @param <T> 数据类型
     * @return
     * @throws IOException
     */
    public static <T> void postAsync(String url, Map<?, ?> data, final Failure failure, final Ok ok) throws IOException{
        RequestBody body = RequestBody.create(JSON, new Gson().toJson(data));
        Request request = new Request.Builder().url(url).post(body).build();
        Call call = new OkHttpClient().newCall(request);
        call.enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                failure.onFailure(e);
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                Type objectType = new TypeToken<T>(){}.getType();
                ok.onOk(new Gson().fromJson(response.body().string(), objectType));
            }
        });
    }

    public interface Failure{
        void onFailure(Exception ex);
    }

    public interface Ok<T>{
        void onOk(T data);
    }

}
