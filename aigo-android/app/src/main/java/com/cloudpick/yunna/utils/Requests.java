package com.cloudpick.yunna.utils;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Map;

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

    public static <T> T get(String url) throws IOException{
        Request request = new Request.Builder().url(url).build();
        Response response = new OkHttpClient().newCall(request).execute();
        Type objectType = new TypeToken<T>(){}.getType();
        return new Gson().fromJson(response.body().string(), objectType);
    }

    public static <T> T post(String url, Map<?, ?> data) throws IOException{
        RequestBody body = RequestBody.create(JSON, new Gson().toJson(data));
        Request request = new Request.Builder().url(url).post(body).build();
        Response response = new OkHttpClient().newCall(request).execute();
        Type objectType = new TypeToken<T>(){}.getType();
        return new Gson().fromJson(response.body().string(), objectType);
    }


    /**
     * @param url
     * @param <T>
     * @return
     * @throws IOException
     */
    public static <T> T getAsync(String url) throws IOException{
        Request request = new Request.Builder().url(url).build();
        Response response = new OkHttpClient().newCall(request).execute();
        Type objectType = new TypeToken<T>(){}.getType();
        return new Gson().fromJson(response.body().string(), objectType);
    }

    public static <T> T postAsync(String url, Map<?, ?> data) throws IOException{
        RequestBody body = RequestBody.create(JSON, new Gson().toJson(data));
        Request request = new Request.Builder().url(url).post(body).build();
        Response response = new OkHttpClient().newCall(request).execute();
        Type objectType = new TypeToken<T>(){}.getType();
        return new Gson().fromJson(response.body().string(), objectType);
    }
}
