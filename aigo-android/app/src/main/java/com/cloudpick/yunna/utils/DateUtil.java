package com.cloudpick.yunna.utils;


import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;

import java.util.Locale;

/**
 * Created by maxwell on 17-12-14.
 */

public class DateUtil {

    public static String getDayOfWeek(String dateTimeStr){
        DateTime dt = DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss").parseDateTime(dateTimeStr);
        return dt.dayOfWeek().getAsShortText(Locale.CHINA);
    }

    public static String getShortDate(String dateTimeStr){
        DateTime dt = DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss").parseDateTime(dateTimeStr);
        return dt.toString("MM-dd");
    }
}
