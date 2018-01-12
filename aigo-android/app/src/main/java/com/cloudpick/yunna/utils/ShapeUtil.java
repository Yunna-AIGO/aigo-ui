package com.cloudpick.yunna.utils;

import android.content.Context;
import android.graphics.drawable.GradientDrawable;
import android.view.View;

import com.cloudpick.yunna.ui.R;

/**
 * Created by maxwell on 18-1-12.
 */

public class ShapeUtil {

    private int backgroundColorResId = R.color.colorDefault;
    private int borderColorResId = R.color.colorDefault;
    private int borderWidth = 1;
    private float cornerRadius = 5;

    private ShapeUtil(Builder builder){
        if(builder.backgroundColorResId > 0){
            this.backgroundColorResId = builder.backgroundColorResId;
        }
        if(builder.borderColorResId > 0){
            this.borderColorResId = builder.borderColorResId;
        }
        if(builder.borderWidth >= 0){
            this.borderWidth = builder.borderWidth;
        }
        if(builder.cornerRadius >= 0){
            this.cornerRadius = builder.cornerRadius;
        }
    }

    public void render(View v){
        GradientDrawable d = null;
        try{
            d = (GradientDrawable)v.getBackground();
        }catch (Exception ex){
        }
        if(d == null){
            return;
        }
        Context ctx = v.getContext();
        d.setColor(ctx.getResources().getColor(backgroundColorResId));
        d.setStroke(Tools.dp2px(ctx, borderWidth), ctx.getResources().getColor(borderColorResId));
        d.setCornerRadius(Tools.dp2px(ctx, cornerRadius));
    }

    public static class Builder{
        private int backgroundColorResId = -1;
        private int borderColorResId = -1;
        private int borderWidth = -1;
        private float cornerRadius = -1;

        public ShapeUtil build(){
            return new ShapeUtil(this);
        }

        public Builder setColor(int backgroundColorResId){
            this.backgroundColorResId = backgroundColorResId;
            return this;
        }

        public Builder setBorderColor(int borderColorResId){
            this.borderColorResId = borderColorResId;
            return this;
        }

        public Builder setBorderWidth(int borderWidth){
            this.borderWidth = borderWidth;
            return this;
        }

        public Builder setCornerRadius(float cornerRadius){
            this.cornerRadius = cornerRadius;
            return this;
        }
    }



    public static ShapeUtil DefaultButtonShape(boolean hasBackground){
        Builder builder = new Builder();
        if(!hasBackground){
            builder.setColor(R.color.colorTransparent);
        }
        return builder.build();
    }

    public static ShapeUtil TextAreaShape(){
        return new Builder().setBorderWidth(0).setColor(R.color.colorLightGrey).build();
    }

    public static ShapeUtil TextOnlyShape(){
        return new Builder().setBorderWidth(0).setColor(R.color.colorTransparent).build();
    }

    public static ShapeUtil CommonButtonShape(){
        return new Builder().setBorderColor(R.color.colorBlack).setColor(R.color.colorTransparent).build();
    }

    public static ShapeUtil CardShape(int backgroundColorResId){
        return new Builder().setBorderWidth(0).setColor(backgroundColorResId).build();
    }
}
