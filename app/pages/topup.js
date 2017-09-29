import React from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity,
} from 'react-native';
import Button from 'apsl-react-native-button';
import Toast from '../tools/toast';
import {
	RadioButtons
} from 'react-native-radio-buttons';
import Alipay from '../tools/alipay';
import * as WeChat from 'react-native-wechat';
import * as constants from '../tools/constants';
import {TransStatus} from '../tools/enums';
import styles from '../styles/global';
import format from 'string-format';

export default class TopupScreen extends React.Component {
	constructor(props){
		super(props);

		this.timers = [];
		this.count = 0;
		this.MAX_COUNT = 4;

		this.state = {
			userId: this.props.navigation.state.params.userId,
			enumMoney: [
				// {label:'充0.01元', value:"0.01"},
				{label:'充10元', value:"10"},
				{label:'充50元', value:"50"},
				{label:'充100元', value:"100"},
				{label:'充200元', value:"200"},
				{label:'充300元', value:"300"},
				{label:'充500元', value:"500"},
			],
			enumPayTypes: [
				{label:'支付宝支付', value:'alipay', logo:require('../images/alipay.png')},
				{label:'微信支付 ', value:'wechat_pay', logo:require('../images/wechat.png')},
			],
			money: "10",
			payType: 'alipay',
		};
	}

	render(){
		return (
			<View>
				{/*<View style={styles.cell}>
					<Text style={styles.rowText}>充值金额</Text>
				</View>*/}

				<RadioButtons options={this.state.enumMoney}
					onSelection={(option) => this.setState({money: option.value})}
					selectedOption={this.state.money}
					renderOption={this.renderOption}
					renderContainer={this.renderContainer}
					extractText={(option) => option.label}
					testOptionEqual={(selectedValue, option) => selectedValue === option.value}
				/>

				{/*<View style={styles.cell}>
					<Text style={styles.rowText}>请选择支付方式</Text>
				</View>*/}

				<RadioButtons options={this.state.enumPayTypes}
					onSelection={(option) => this.setState({payType: option.value})}
					selectedOption={this.state.payType}
					renderOption={this.renderPayOption}
					renderContainer={this.renderPayContainer}
					extractText={(option) => option.label}
					testOptionEqual={(selectedValue, option) => selectedValue === option.value}
				/>

				<Button style={[styles.rowButton, {marginTop:0}]} 
					onPress={() => this.topupNow()}>
					立即充值
				</Button>

				<Text style={{fontSize:12, marginLeft:30, marginRight:30, marginBottom:10}}>
					点击立即充值，即表示您已阅读并同意
					<Text onPress={() => this.props.navigation.navigate('TermOfServiceTopup')}
						style={styles.textLink}>
						《充值活动协议》
					</Text>
				</Text>
			</View>
		);
	}

	static navigationOptions = ({navigation}) =>{
		const {params = {}} = navigation.state;
		return {
			title: '充值',
		};
	};

	componentDidMount(){
		console.log('topup.componentDidMount');
	}

	componentWillUnmount(){
		for(let i in this.timers){
			clearTimeout(this.timers[i]);
		}
	}

	renderOption(option, selected, onSelect, index){
		const style = {
			width: 150,
			borderWidth: 1,
			padding: 10,
			margin: 10,
			fontSize: 20,
			textAlign: 'center',
			borderColor: 'lightgray',
			borderRadius: 5,
			overflow:'hidden',
			backgroundColor: '#fff',
		};
		const styleSelected = selected ? {backgroundColor:'orange', color:'#fff'} : {};
		return (
			<TouchableOpacity key={index} onPress={onSelect}>
				{/* add another View to fix error: Attempted to transition from state `RESPONDER_INACTIVE_PRESS_IN` to `RESPONDER_ACTIVE_LONG_PRESS_IN` */}
				<View>
					<Text style={[style, styleSelected]}>{option.label}</Text>
				</View>
			</TouchableOpacity>
		)
	}

	renderContainer(optionNodes){
		return <View style={{
			flexDirection:'row', 
			flexWrap:'wrap',
			justifyContent:'center',
		}}>{optionNodes}</View>
	}

	renderPayOption(option, selected, onSelect, index){
		const styleSelected = selected ? {backgroundColor:'gold'} : {};
		return (
			<TouchableOpacity key={index} onPress={onSelect}>
				{/* add another View to fix error: Attempted to transition from state `RESPONDER_INACTIVE_PRESS_IN` to `RESPONDER_ACTIVE_LONG_PRESS_IN` */}
				<View style={{flexDirection:'row', margin:10, justifyContent:'space-between'}}>
					<View style={{flexDirection:'row', marginLeft:10}}>
						<Image source={option.logo} style={styles.icon} /> 
						<View style={{justifyContent:'center'}}>
							<Text style={[styles.rowText, {marginLeft:10, fontSize:16}]}>{option.label}</Text>
						</View>
					</View>

					<View style={{justifyContent:'center', marginRight:10}}>
						{ selected &&
							<Image source={require('../images/checked.png')} style={styles.iconSmall} />
						}
						{ !selected &&
							<Image source={require('../images/unchecked.png')} style={styles.iconSmall} />
						}
					</View>
				</View>
			</TouchableOpacity>
		)
	}

	renderPayContainer(optionNodes){
		return <View style={{
			flexDirection:'column', 
			margin:10,
			// justifyContent:'center',
		}}>{optionNodes}</View>
	}

	async topupNow(){
		console.log('topup.topupNow');
		console.log(this.state.payType);
		try{
			let request = { 
				userId : this.state.userId,
				rechargeAmt: this.state.money,
				payType: this.state.payType, 
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
				switch(this.state.payType){
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
}