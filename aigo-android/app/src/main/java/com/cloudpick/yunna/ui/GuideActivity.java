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

import butterknife.BindView;
import butterknife.ButterKnife;
import pl.droidsonroids.gif.GifDrawable;
import pl.droidsonroids.gif.GifImageView;


public class GuideActivity extends AppCompatActivity implements ViewPager.OnPageChangeListener {

    @BindView(R.id.pager_guide)
    ViewPager pager_guid;
    @BindView(R.id.ll_indicator)
    ViewGroup ll_indicator;
    @BindView(R.id.tb_guide)
    Toolbar toolbar;

    /**
     * 装indicator的ImageView数组
     */
    private ImageView[] indicators;

    /**
     * 装ImageView数组
     */
    //private ImageView[] mImageViews;
    private GifImageView[] gifViews;

    /**
     * gif资源id
     */
    private int[] gifIdArray = new int[]{
            R.drawable.guide_one,
            R.drawable.guide_two,
            R.drawable.guide_three,
            R.drawable.guide_four
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
        loadGif();
        setPagerViewAdapter();
    }

    private void initIndicators(){
        indicators = new ImageView[gifIdArray.length];
        for(int i=0;i<indicators.length;i++){
            ImageView imageView = new ImageView(this);
            imageView.setLayoutParams(new LinearLayout.LayoutParams(20,20));
            indicators[i] = imageView;
            setIndicatorStatus(indicators[i], i == 0);
            LinearLayout.LayoutParams lp = (LinearLayout.LayoutParams)imageView.getLayoutParams();
            lp.leftMargin = 10;
            lp.rightMargin = 10;
            ll_indicator.addView(imageView, lp);
        }
    }

    private void loadGif(){
        //将图片装载到数组中
        gifViews = new GifImageView[gifIdArray.length];
        for(int i=0;i<gifViews.length;i++){
            GifImageView gifView = new GifImageView(this);
            LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(
                    new ViewGroup.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT));
            gifView.setLayoutParams(lp);
            gifView.setScaleType(ImageView.ScaleType.CENTER_CROP);
            gifViews[i] = gifView;
            try{
                GifDrawable gifDrawable = new GifDrawable(getResources(), gifIdArray[i]);
                gifView.setImageDrawable(gifDrawable);
            }catch (Exception e){
                System.out.println(e.getMessage());
            }
        }
    }

    private void setPagerViewAdapter(){
        //设置Adapter
        pager_guid.setAdapter(new GuidAdapter());
        //设置监听，主要是设置点点的背景
        pager_guid.setOnPageChangeListener(this);
        //设置ViewPager的默认项, 设置为长度的100倍，这样子开始就能往左滑动
        pager_guid.setCurrentItem((gifViews.length) * 100);
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
        int index = position % gifViews.length;
        for(int i=0; i<indicators.length; i++){
            setIndicatorStatus(indicators[i], i == index);
        }
    }

    public static Intent newIntent(Context packageContext){
        Intent intent = new Intent(packageContext, GuideActivity.class);
        return intent;
    }


    public class GuidAdapter extends PagerAdapter {

        public GuidAdapter(){

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
            ((ViewPager)container).removeView(gifViews[position % gifViews.length]);
        }

        /**
         * 载入图片进去，用当前的position 除以 图片数组长度取余数是关键
         */
        @Override
        public Object instantiateItem(View container, int position) {
            ImageView imgView = gifViews[position % gifViews.length];
            ((ViewPager)container).addView(imgView, 0);
            return imgView;
        }

    }
}
