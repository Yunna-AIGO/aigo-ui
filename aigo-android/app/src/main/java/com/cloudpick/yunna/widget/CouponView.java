package com.cloudpick.yunna.widget;

import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.util.AttributeSet;
import android.widget.LinearLayout;

import com.cloudpick.yunna.ui.R;

/**
 * Created by maxwell on 17-12-22.
 */

public class CouponView extends LinearLayout {

    private Paint paint;
    /**
     * 半径
     */
    private float radius = 10;
    /**
     * 圆间距
     */
    private float gap = 8;
    /**
     * 圆背景色
     */
    private int circle_color = Color.WHITE;
    private int circle_side = 1;
    /**
     * Y方向圆数量
     */
    private int circleNumY;
    private float remainY;
    /**
     * X方向圆数量
     */
    private int circleNumX;
    private float remainX;

    public CouponView(Context context){
        this(context, null);
    }

    public CouponView(Context context, AttributeSet attrs){
        this(context, attrs, 0);
    }

    public CouponView(Context context, AttributeSet attrs, int defStyleAttr){
        super(context, null, defStyleAttr);

        /**
         * 获得我们所定义的自定义样式属性
         */
        TypedArray a = context.getTheme().obtainStyledAttributes(attrs, R.styleable.CouponView, defStyleAttr, 0);
        for (int i = 0; i < a.getIndexCount(); i++) {
            int attr = a.getIndex(i);
            switch (attr) {
                case R.styleable.CouponView_radius:
                    radius = a.getDimensionPixelSize(R.styleable.CouponView_radius, 10);
                    break;
                case R.styleable.CouponView_gap:
                    gap = a.getDimensionPixelSize(R.styleable.CouponView_gap, 8);
                    break;
                case R.styleable.CouponView_circle_color:
                    circle_color = a.getColor(R.styleable.CouponView_circle_color, Color.WHITE);
                    break;
                case R.styleable.CouponView_circle_side:
                    circle_side = a.getInt(R.styleable.CouponView_circle_side, 1);
                    break;
            }
        }
        a.recycle();

        paint = new Paint(Paint.ANTI_ALIAS_FLAG);
        setWillNotDraw(false);
        paint.setDither(true);
        paint.setColor(circle_color);
        paint.setStyle(Paint.Style.FILL);
    }


    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(w, h, oldw, oldh);
        if(remainX == 0){
            //计算不整除的剩余部分
            remainX = (int) (w - gap) % (2 * radius + gap);
        }
        circleNumX = (int) ((w - gap) / (2 * radius + gap));
        if (remainY == 0) {
            //计算不整除的剩余部分
            remainY = (int) (h - gap) % (2 * radius + gap);
        }
        circleNumY = (int) ((h - gap) / (2 * radius + gap));
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        drawCircle(canvas);
    }

    private void drawCircle(Canvas canvas){
        boolean drawLeft = (circle_side & CircleSide.Left.getValue()) == CircleSide.Left.getValue();
        boolean drawRight = (circle_side & CircleSide.Right.getValue()) == CircleSide.Right.getValue();
        boolean drawTop = (circle_side & CircleSide.Top.getValue()) == CircleSide.Top.getValue();
        boolean drawBottom = (circle_side & CircleSide.Bottom.getValue()) == CircleSide.Bottom.getValue();
        for (int i = 0; i < circleNumY; i++) {
            float y = gap + radius + remainY / 2 + ((gap + radius * 2) * i);
            if(drawLeft){
                canvas.drawCircle(0, y, radius, paint);
            }
            if(drawRight){
                canvas.drawCircle(getWidth(), y, radius, paint);
            }
        }
        for(int i = 0; i < circleNumX; i++){
            float x = gap + radius + remainX / 2 + ((gap + radius * 2) * i);
            if(drawTop){
                canvas.drawCircle(x, 0, radius, paint);
            }
            if(drawBottom){
                canvas.drawCircle(x, getHeight(), radius, paint);
            }
        }
    }

    private enum CircleSide{
        Top("1"), Right("2"), Bottom("4"), Left("8");

        private final String value;

        CircleSide(String value){
            this.value = value;
        }

        public int getValue(){
            return Integer.parseInt(value);
        }
    }

}
