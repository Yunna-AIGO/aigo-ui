package com.cloudpick.yunna.ui;

import android.content.Context;
import android.content.Intent;
import android.support.v4.view.PagerAdapter;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.cloudpick.yunna.utils.Tools;

import butterknife.BindView;
import butterknife.ButterKnife;
import pl.droidsonroids.gif.GifDrawable;
import pl.droidsonroids.gif.GifImageView;

import static android.util.DisplayMetrics.DENSITY_HIGH;


public class GuideActivity extends AppCompatActivity implements ViewPager.OnPageChangeListener {

    @BindView(R.id.pager_guide)
    ViewPager pager_guide;
    @BindView(R.id.ll_indicator)
    ViewGroup ll_indicator;
    @BindView(R.id.tb_guide)
    Toolbar toolbar;

    /**
     * 装indicator的ImageView数组
     */
    private ImageView[] indicators;

    /**
     * 装View的数组
     */
    private View[] guideViews;

    /**
     * gif资源id
     */
    private int[] gifIdArray = new int[]{
            R.drawable.guide_one,
            R.drawable.guide_two,
            R.drawable.guide_three,
            R.drawable.guide_four
    };
    private int[] titleArray = new int[]{
            R.string.guide_title_one,
            R.string.guide_title_two,
            R.string.guide_title_three,
            R.string.guide_title_four,
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_guide);
        ButterKnife.bind(this);
        initComponent();
    }

    private void initComponent(){
        setSupportActionBar(toolbar);
        toolbar.setNavigationIcon(R.drawable.back);
        toolbar.setNavigationOnClickListener((v)->{
            GuideActivity.this.finish();
        });
        initIndicators();
        loadViews();
        setPagerViewAdapter();
    }

    private void initIndicators(){
        int wh = 20;
        int margin = 10;
        int bottomMargin = 30;
        if(getResources().getDisplayMetrics().densityDpi <= DENSITY_HIGH){
            wh = 10;
            margin = 5;
            bottomMargin = 15;
        }

        indicators = new ImageView[gifIdArray.length];
        for(int i=0;i<indicators.length;i++){
            ImageView imageView = new ImageView(this);
            imageView.setLayoutParams(new LinearLayout.LayoutParams(wh, wh));
            indicators[i] = imageView;
            setIndicatorStatus(indicators[i], i == 0);
            LinearLayout.LayoutParams lp = (LinearLayout.LayoutParams)imageView.getLayoutParams();
            lp.leftMargin = margin;
            lp.rightMargin = margin;
            ll_indicator.addView(imageView, lp);
        }
        RelativeLayout.LayoutParams rp = (RelativeLayout.LayoutParams)ll_indicator.getLayoutParams();
        rp.bottomMargin = bottomMargin;
        ll_indicator.setLayoutParams(rp);
    }

    private void loadViews(){
        guideViews = new View[gifIdArray.length];
        for(int i=0;i<guideViews.length;i++){
            View v = getLayoutInflater().inflate(R.layout.viewpage_guide, null);
            GifImageView gifView = new GifImageView(this);
            LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(
                    new ViewGroup.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT));
            gifView.setLayoutParams(lp);
            gifView.setScaleType(ImageView.ScaleType.CENTER_CROP);
            try{
                GifDrawable gifDrawable = new GifDrawable(getResources(), gifIdArray[i]);
                gifView.setImageDrawable(gifDrawable);
                ((LinearLayout)v.findViewById(R.id.ll_guide_gif)).addView(gifView);
            }catch (Exception e){
                System.out.println(e.getMessage());
            }
            ((TextView)v.findViewById(R.id.tv_guide_title)).setText(titleArray[i]);
            guideViews[i] = v;
        }
    }

    private void setPagerViewAdapter(){
        //设置Adapter
        pager_guide.setAdapter(new GuideAdapter());
        //设置监听，主要是设置点点的背景
        pager_guide.setOnPageChangeListener(this);
        //设置ViewPager的默认项, 设置为长度的100倍，这样子开始就能往左滑动
        pager_guide.setCurrentItem((guideViews.length) * 100);
    }

    private void setIndicatorStatus(ImageView indicator, boolean selected){
        int resId = selected?R.drawable.indicator_focused:R.drawable.indicator_unfocused;
        indicator.setBackgroundResource(resId);
    }

    @Override
    public void onPageScrollStateChanged(int arg0) {

    }

    @Override
    public void onPageScrolled(int arg0, float arg1, int arg2) {

    }

    @Override
    public void onPageSelected(int position) {
        int index = position % guideViews.length;
        for(int i=0; i<indicators.length; i++){
            setIndicatorStatus(indicators[i], i == index);
        }
    }

    public static Intent newIntent(Context packageContext){
        Intent intent = new Intent(packageContext, GuideActivity.class);
        return intent;
    }


    public class GuideAdapter extends PagerAdapter {

        public GuideAdapter(){

        }

        @Override
        public int getCount() {
            return Integer.MAX_VALUE;
        }

        @Override
        public boolean isViewFromObject(View view, Object object) {
            return view == object;
        }

        @Override
        public void destroyItem(View container, int position, Object object) {
            ((ViewPager)container).removeView(guideViews[position % guideViews.length]);
        }

        /**
         * 载入图片进去，用当前的position 除以 图片数组长度取余数是关键
         */
        @Override
        public Object instantiateItem(View container, int position) {
            View v = guideViews[position % guideViews.length];
            ((ViewPager)container).addView(v, 0);
            return v;
        }

    }
}
