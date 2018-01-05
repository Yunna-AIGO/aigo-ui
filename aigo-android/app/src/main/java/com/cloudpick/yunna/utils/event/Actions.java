package com.cloudpick.yunna.utils.event;

/**
 * Created by maxwell on 18-1-5.
 */

public class Actions {
    public interface Common{
        void success(Object[] args);
        void failure(Object[] args);
    }
}
