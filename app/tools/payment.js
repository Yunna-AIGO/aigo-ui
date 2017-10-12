import Alipay from './alipay'
import * as WeChat from 'react-native-wechat'
import Toast from './toast'
import * as constants from './constants'
import {TransStatus} from './enums'
import format from 'string-format'

// 务必在componentWillUnmount里调用clear()
export default class Payment {
	timers = [];
	count = 0;
	MAX_COUNT = 4;

	clear(){
		for(let i in this.timers){
			clearTimeout(this.timers[i]);
		}
	}

	async recharge(userId, rechargeAmt, payType) {
		console.log(userId+' recharge '+rechargeAmt+' by '+payType);
		try{
			let request = { 
				userId : userId,
				rechargeAmt: rechargeAmt,
				payType: payType, 
			};
			let response = await fetch(constants.recharge, {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify(request),
			});
			console.log(response);
			let resJson = await response.json();
			console.log(resJson);

			if(resJson.code !== constants.SUCCESS){
				Toast.show('获取订单号失败，支付取消');
				return;
			}else{
				let {orderId, orderInfo, transId} = resJson.data;
				switch(payType){
					case 'alipay':
						this.alipay(orderInfo, transId);
						break;
					case 'wechat_pay':
						this.wxpay();
						break;
					default:
						console.error('unknown payType');
				}
			}
		} catch(error){
			console.log(error);
		}
	}

	async pay(userId, orderId, payType) {
		console.log('userId('+userId+') pay orderId('+orderId+') by '+payType);
		try{
			let request = { 
				userId : userId,
				orderId: orderId,
				payType: payType, 
			};
			let response = await fetch(constants.pay, {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify(request),
			});
			console.log(response);
			let resJson = await response.json();
			console.log(resJson);

			if(resJson.code !== constants.SUCCESS){
				Toast.show('获取订单号失败，支付取消');
				return;
			}else{
				let {orderId, orderInfo, transId, message} = resJson.data;
				switch(payType){
					case 'alipay':
						this.alipay(orderInfo, transId);
						break;
					case 'wechat_pay':
						this.wxpay();
						break;
					case 'cp_pay':
						Toast.show(message);
						break;
					default:
						console.error('unknown payType');
				}
			}
		} catch(error){
			console.log(error);
		}
	}

	alipay(orderInfo, transId){
		console.log('alipay');
		//let orderInfo = 'charset=utf-8&biz_content=%7B%22out_trade_no%22%3A%22170821000P00000035%22%2C%22total_amount%22%3A%2220.36%22%2C%22subject%22%3A%22%E4%B8%8A%E6%B5%B7%E4%BA%91%E6%8B%BF%E6%99%BA%E8%83%BD%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%22%2C%22body%22%3A%22%E4%BA%91%E6%8B%BF%E8%B4%A6%E6%88%B7%E5%85%85%E5%80%BC%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%7D&method=alipay.trade.app.pay&format=JSON&sign=ff%2F7u4E6XmNyGi6DAfgrz%2BQc%2BQaqdnYqTgTO35LKDmiWd9kLuJNJEk6dlKw3NsxIPOETQARr5qITbVZ3w4f1FFDlzDWzA6BT1TG8fFhNu1uo%2BkuzSTqx9l0HV96yH9yR3r3m9OQvrUnvY%2B7PD%2BvnC11kRtEMr3NpycLmjbt68t0i%2FGiw4yQFA3rVqycPEyHal2iEzZ8U8KNWdu4jcI9esZmSfX472gKpLA8ss7%2B08tdOVDSpOV3K3B%2Bl5JhCvK5b4Tl6XfaQzMscZVxCeAoLZDFWcFCVM64XiyAHbbGzGDS2ZbsDOTNhIUZDpqRuDSGAawUZTVailHfQx16yrW98KQ%3D%3D&notify_url=http%3A%2F%2F10.10.10.141%3A8080%2Frest%2Fapi%2Fv1%2Ftrade%2Falipay_notify&app_id=2016080700190975&version=1.0&sign_type=RSA2&timestamp=2017-08-21+11%3A15%3A13';
		console.log(orderInfo);
		Alipay.pay(orderInfo).then((data) => {
			console.log(data);
			Toast.show('正在后台查询交易状态');
			this.count = 0;
			this.delayCheckTrans(transId);
			// if (data && data.resultStatus) {
			// 	switch (data.resultStatus) {
			// 		case "9000":
			// 			Toast.show('支付成功');
			// 			break;
			// 		case "8000":
			// 			Toast.show('支付结果未知,请查询订单状态');
			// 			break;
			// 		case "4000":
			// 			Toast.show('订单支付失败');
			// 			break;
			// 		case "5000":
			// 			Toast.show('重复请求');
			// 			break;
			// 		case "6001":
			// 			Toast.show('用户中途取消');
			// 			break;
			// 		case "6002":
			// 			Toast.show('网络连接出错');
			// 			break;
			// 		case "6004":
			// 			Toast.show('支付结果未知,请查询订单状态');
			// 			break;
			// 		default:
			// 			Toast.show('其他失败原因');
			// 			break;
			// 	}
			// } else {
			// 	Toast.show('其他失败原因');
			// }
		}, (err) => {
			console.log(err);
			Toast.show('支付失败，请重新支付');
		});
	}

	async wxpay(){
		console.log('weixin pay');
		let res = {
			appid: 'wx8888888888888888',	/*微信开放平台审核通过的应用APPID*/
      partnerId: '1900000109',  		/*商家向财付通申请的商家id*/
      prepayId: 'WX1217752501201407033233368018',    /*预支付订单*/
      nonceStr: '5K8264ILTKCH16CQ2502SI8ZNMTM67VS',    /*随机串，防重发*/
      timeStamp: '1412000000',  /*时间戳，防重发*/
      package: 'Sign=WXPay',      /*商家根据财付通文档填写的数据和签名*/
      sign: 'C380BEC2BFD727A4B6845133519F3AD6',            /*商家根据微信开放平台文档对数据做的签名*/
		};

		try {
	    let result = await WeChat.pay({
	      partnerId: res.partnerid,  /*商家向财付通申请的商家id*/
	      prepayId: res.prepayid,    /*预支付订单*/
	      nonceStr: res.noncestr,    /*随机串，防重发*/
	      timeStamp: res.timestamp,  /*时间戳，防重发*/
	      package: res.package,      /*商家根据财付通文档填写的数据和签名*/
	      sign: res.sign,            /*商家根据微信开放平台文档对数据做的签名*/
	    });

	    console.log(result);
	    if(result.errCode === 0){
	    	Toast.show('支付成功');
	    }else if(result.errCode === -1){
	    	Toast.show('订单支付失败：'+result.errStr);
	    }else if(result.errCode === -2){
	    	Toast.show('用户取消');
	    }
	  } catch (error) {
	  	console.log(error);
	  	Toast.show('失败：'+error);
	  }
	}

	// 如果交易状态不明确，延迟1、2、4、8秒调后端查看交易状态，直到最大重试次数；否则直接返回成功或失败
	delayCheckTrans(transId){
		console.log('topup.delayCheckTrans count = '+this.count);
		if(this.count >= this.MAX_COUNT){
			return;
		}

		let delay = Math.pow(2, this.count++);
		console.log('topup.checkTrans delay = '+delay);
		let timer = setTimeout(() => {
			this.checkTrans(transId).then(transStatus => {
				let pendingList = [TransStatus.INIT, TransStatus.PENDING_PAYMENT, TransStatus.PROCESSING];
				let successList = [TransStatus.SUCCEEDED];
				let failedList = [TransStatus.FAILED, TransStatus.TIMEOUT, TransStatus.PAY_CANCEL, TransStatus.CLOSED];
				if(successList.indexOf(transStatus) >= 0){
					Toast.show('交易成功');
					setTimeout(()=>{
			      const {navigate,goBack,state} = this.props.navigation;
			      // 在第二个页面,在goBack之前,将上个页面的方法取到,并回传参数,这样回传的参数会重走render方法
			      state.params.callback('reload');
			      // 充值成功后，回到上个页面
			      goBack();
			    },1000);
				}else if(failedList.indexOf(transStatus) >= 0){
					Toast.show('交易失败');
				}else if(pendingList.indexOf(transStatus) >= 0){
					this.delayCheckTrans(transId);
				}else{
					console.error('不存在的交易状态：'+transStatus);
				}
			}, error => {
				console.log(error);
				this.delayCheckTrans(transId);
			});
		}, delay * 1000)
		this.timers.push(timer);
	}

	async checkTrans(transId){
		console.log('topup.checkTrans');
    let url = format(constants.queryTrans, {transId: transId});
    console.log('url: '+url);
    let response = await fetch(url);
    let resJson = await response.json();
    console.log(resJson);
    if(resJson && resJson.code == constants.SUCCESS){
    	let {transStatus} = resJson.data;
    	return transStatus;
    }else{ 
    	return TransStatus.FAILED;
    }
	}

}