package com.cloudpick.yunna.ui.settings.payment;

import com.cloudpick.yunna.utils.enums.ThirdType;
import com.cloudpick.yunna.widget.PaymentCard;

/**
 * Created by maxwell on 18-1-30.
 */

public interface IPaymentCard {
    PaymentCard getPaymentCard();
    void setPaymentCardStatus(boolean signed);
    String getPaymentCardTag();
    ThirdType getThirdType();
    boolean isSigned();
}