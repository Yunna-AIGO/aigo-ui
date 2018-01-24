package com.cloudpick.yunna.ui.dialog;

import android.app.AlertDialog;
import android.content.Context;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.cloudpick.yunna.R;
import com.cloudpick.yunna.utils.ShapeUtil;

import butterknife.BindView;
import butterknife.ButterKnife;

/**
 * Created by maxwell on 18-1-4.
 */

public class NewAppVersionDialog extends AlertDialog implements View.OnClickListener {

    @BindView(R.id.btn_ok)
    Button btn_ok;
    @BindView(R.id.btn_cancel)
    Button btn_cancel;
    @BindView(R.id.tv_new_version_message)
    TextView tv_new_version_message;


    private String version;
    private boolean isForce = false;
    private DialogCallback callback;

    public NewAppVersionDialog(Context context, String version, boolean isForce, DialogCallback callback){
        super(context);
        this.version = version;
        this.isForce = isForce;
        this.callback = callback;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.dialog_new_app_version);
        ButterKnife.bind(this);
        initDialog();
    }

    private void initDialog(){
        setCanceledOnTouchOutside(false);
        setCancelable(false);
        ShapeUtil.TextOnlyShape().render(btn_ok);
        ShapeUtil.TextOnlyShape().render(btn_cancel);
        btn_ok.setOnClickListener(this);
        btn_cancel.setOnClickListener(this);
        String msg = getContext().getResources().getString(R.string.message_new_app_version);
        tv_new_version_message.setText(msg);
        btn_cancel.setVisibility(isForce? View.GONE: View.VISIBLE);
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.btn_ok:
                callback.ok();
                this.dismiss();
                break;
            case R.id.btn_cancel:
                callback.cancel();
                this.dismiss();
                break;
            default:
                break;
        }
    }

    public interface DialogCallback{
        void ok();
        void cancel();
    }
}
