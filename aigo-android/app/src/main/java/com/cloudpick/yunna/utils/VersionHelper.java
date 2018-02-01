package com.cloudpick.yunna.utils;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Handler;
import android.os.Looper;
import android.text.TextUtils;
import android.util.Log;

import com.cloudpick.yunna.ui.dialog.NewAppVersionDialog;
import com.cloudpick.yunna.utils.http.Callback;
import com.cloudpick.yunna.utils.http.Requests;
import com.cloudpick.yunna.utils.http.Response;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by maxwell on 18-1-4.
 */

public class VersionHelper {

    private static final String TAG = "CloudPick";
    public static final String CHECK_VERSION_KEY = "com.cloudpick.yunna.ui.checkVersionKey";

    private Context context = null;
    private boolean needCheckVersion = false;

    public VersionHelper(Context context, Intent intent){
        this.context = context;
        needCheckVersion = intent == null? false:intent.getBooleanExtra(CHECK_VERSION_KEY, false);
    }

    public void checkVersion(checkVersionAction action){
        if(!needCheckVersion){
            return;
        }
        Map<String, String> queryParams = new HashMap<>();
        queryParams.put("osType", "android");
        Requests.getAsync(Constants.URL_APP_VERSION, queryParams, new Callback<Response<Map<String, Object>>>() {
            @Override
            public void error(Exception e) {
                System.out.println(e.toString());
            }
            @Override
            public void ok(Response<Map<String, Object>> r) {
                if(r.isSuccess()){
                    try{
                        final String version = r.getVersionNo();
                        final boolean isForce = r.isForce();
                        final String downloadUrl = r.getDownloadUrl();
                        final String osType = r.getOsType().toLowerCase();
                        if("android".equals(osType) && hasNewVersion(version) && !TextUtils.isEmpty(downloadUrl)){
                            new Handler(Looper.getMainLooper()).post(()->{
                                NewAppVersionDialog dlg = new NewAppVersionDialog(context, version, isForce,
                                        new NewAppVersionDialog.DialogCallback() {
                                            @Override
                                            public void ok() {
                                                Intent intent = new Intent();
                                                intent.setAction("android.intent.action.VIEW");
                                                Uri content_url = Uri.parse(downloadUrl);
                                                intent.setData(content_url);
                                                context.startActivity(intent);
                                                action.onUpgrade();
                                            }
                                            @Override
                                            public void cancel() {
                                            }
                                        });
                                dlg.show();
                            });
                        }
                    }catch (Exception e){
                        System.out.println(e.toString());
                    }
                }
            }
        });
    }

    private boolean hasNewVersion(String version){
        if(TextUtils.isEmpty(version)){
            return false;
        }
        String currentVersion = Define.getAppVersion();
        String[] versionParts = version.split("\\.");
        String[] currentVersionParts = currentVersion.split("\\.");
        try{
            int iterationCount = Math.max(versionParts.length, currentVersionParts.length);
            for(int i=0;i<iterationCount;i++){
                int nv = 0, cv = 0;
                if(i < versionParts.length){
                    nv = Integer.parseInt(versionParts[i]);
                }
                if(i < currentVersionParts.length){
                    cv = Integer.parseInt(currentVersionParts[i]);
                }
                if(nv > cv){
                    return true;
                }else if(nv < cv){
                    return false;
                }
            }
            return false;
        }catch (Exception ex){
            ex.printStackTrace();
            Log.d(TAG, "version error!");
            return false;
        }
    }

    public interface checkVersionAction{
        void onUpgrade();
    }
}
