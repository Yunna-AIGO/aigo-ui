package com.cloudpick.yunna.model;

import com.cloudpick.yunna.utils.enums.AgreementStatus;
import com.cloudpick.yunna.utils.enums.ThirdType;

/**
 * Created by maxwell on 18-2-5.
 */

public class ThirdTypeSignInfo extends BaseModel {

    private String thirdType = "";
    private String agreementStatus = "";
    private String validTime = "";
    private String invalidTime = "";

    public ThirdTypeSignInfo(){

    }


    public ThirdType getThirdType(){
        try{
            return ThirdType.valueOf(thirdType);
        }catch (Exception ex){
            ex.printStackTrace();
            return ThirdType.UNKNOWN;
        }
    }

    public boolean isSigned(){
        return agreementStatus.equals(AgreementStatus.NORMAL.getValue());
    }

}
