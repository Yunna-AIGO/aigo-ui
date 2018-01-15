package com.cloudpick.yunna.ui.main;

import com.cloudpick.yunna.ui.MainActivity;
import com.cloudpick.yunna.ui.base.BaseFragment;

/**
 * Created by maxwell on 18-1-15.
 */

public abstract class MainActivityFragment extends BaseFragment {

    protected String title = "";

    public void setFragmentVisible(boolean visible){
    }

    protected void switchToFramgent(MainActivity.MainFragment mainFragment){
        if (getHostActivity() instanceof MainActivity){
            ((MainActivity)getHostActivity()).switchTo(mainFragment);
        }
    }

    public String getTitle(){
        return title;
    }

}
