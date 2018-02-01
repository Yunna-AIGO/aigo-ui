package com.cloudpick.yunna.widget;

import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.drawable.Drawable;
import android.util.AttributeSet;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.cloudpick.yunna.R;
import com.cloudpick.yunna.utils.Tools;

import butterknife.BindView;
import butterknife.ButterKnife;

/**
 * Created by maxwell on 18-1-31.
 */

public class CellView extends LinearLayout {
    private static final String TAG = "CloudPick_Widget";

    @BindView(R.id.tv_cellCaption)
    TextView tv_cellCaption;
    @BindView(R.id.img_cellIcon)
    ImageView img_cellIcon;


    private Drawable icon = null;
    private String title = "";
    private float textSize = 16;
    private int cellBackgroundColor = getResources().getColor(R.color.colorWhite);

    public CellView(Context context){
        this(context, null);
    }

    public CellView(Context context, AttributeSet attrs){
        this(context, attrs, 0);
    }

    public CellView(Context context, AttributeSet attrs, int defStyleAttr){
        super(context, null, defStyleAttr);
        View v =  inflate(getContext(), R.layout.widget_cell, this);
        ButterKnife.bind(this, v);

//        setOrientation(HORIZONTAL);
//        setGravity(Gravity.CENTER_VERTICAL);
        /**
         * 获得我们所定义的自定义样式属性
         */
        TypedArray a = context.getTheme().obtainStyledAttributes(attrs, R.styleable.CellView, defStyleAttr, 0);
        for (int i = 0; i < a.getIndexCount(); i++) {
            int attr = a.getIndex(i);
            switch (attr) {
                case R.styleable.CellView_cellIcon:
                    icon = a.getDrawable(R.styleable.CellView_cellIcon);
                    break;
                case R.styleable.CellView_cellTitle:
                    title = a.getString(R.styleable.CellView_cellTitle);
                    break;
                case R.styleable.CellView_cellTitleSize:
                    textSize = Tools.px2sp(context, a.getDimensionPixelSize(R.styleable.CellView_cellTitleSize, 16));
                    break;
                case R.styleable.CellView_cellBackgroundColor:
                    cellBackgroundColor = a.getColor(R.styleable.CellView_cellBackgroundColor, getResources().getColor(R.color.colorWhite));
                    break;
            }
        }
        a.recycle();
        initView();
        //setBackgroundColor(cellBackgroundColor);

//        setClickable(true);
//        addIcon(context);
//        addCaption(context);
    }

//    private void addIcon(Context ctx){
//        img_icon = new ImageView(ctx);
//        LayoutParams lp = new LayoutParams(
//                (int)getRawSize(TypedValue.COMPLEX_UNIT_DIP, 20),
//                (int)getRawSize(TypedValue.COMPLEX_UNIT_DIP, 20));
//        lp.setMargins(
//                (int)getRawSize(TypedValue.COMPLEX_UNIT_DIP, 16),
//                0,
//                (int)getRawSize(TypedValue.COMPLEX_UNIT_DIP, 20),
//                0);
//        img_icon.setLayoutParams(lp);
//        img_icon.setBackground(getResources().getDrawable(R.color.colorTransparent));
//        if(icon != null){
//            img_icon.setImageDrawable(icon);
//        }
//        addView(img_icon);
//    }
//
//    private void addCaption(Context ctx){
//        tv_title = new TextView(ctx);
//        tv_title.setLayoutParams(new LayoutParams(
//                LayoutParams.WRAP_CONTENT,
//                LayoutParams.WRAP_CONTENT));
//        tv_title.setText(title);
//        tv_title.setTextSize(textSize);
//        tv_title.setBackground(getResources().getDrawable(R.color.colorTransparent));
//        addView(tv_title);
//    }

    public float getRawSize(int unit, float value) {
        return TypedValue.applyDimension(unit, value, getResources().getDisplayMetrics());
    }

    private void initView(){
        if(icon != null){
            img_cellIcon.setImageDrawable(icon);
        }
        tv_cellCaption.setText(title);
        tv_cellCaption.setTextSize(textSize);
    }

}
