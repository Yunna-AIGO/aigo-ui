package com.cloudpick.yunna.ui.settings.payment;

import com.cloudpick.yunna.controller.PaymentController;
import com.cloudpick.yunna.utils.enums.ThirdType;
import com.cloudpick.yunna.widget.PaymentCard;

/**
 * Created by maxwell on 18-1-30.
 */

public class WechatPaymentCard implements IPaymentCard {

    //fields
    private final ThirdType thirdType = ThirdType.WECHAT;
    private PaymentController controller = null;
    private PaymentCard paymentCard = null;

    public WechatPaymentCard(PaymentController controller){
        this.controller = controller;
        paymentCard = new PaymentCard();
        paymentCard.init(thirdType);
        paymentCard.setOperation(new PaymentCard.CardOperation() {
            @Override
            public void sign() {
                controller.signWechat();
            }
            @Override
            public boolean unsign() {
                return controller.unsignPayment(thirdType);
            }
            @Override
            public boolean isSigned(){
                return PaymentController.isSignedPayment(thirdType);
            }
        });
    }


    //interface

    /**
     * 更新签约状态,外部初始化时统一调用
     * @param signed
     */
    public void setPaymentCardStatus(boolean signed){
        paymentCard.updateSignStatus(signed? PaymentCard.SignStatus.SIGN: PaymentCard.SignStatus.UNSIGN);
    }

    public PaymentCard getPaymentCard(){
        return paymentCard;
    }

    public String getPaymentCardTag(){
        return "Frag_" + thirdType.getCode();
    }

    public ThirdType getThirdType(){
        return thirdType;
    }

    public boolean isSigned(){
        return paymentCard.isSigned();
    }
}
