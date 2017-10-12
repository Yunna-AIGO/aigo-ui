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
import Payment from '../tools/payment';

export default class TopupScreen extends React.Component {
	constructor(props){
		super(props);

		this.payment = null;
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
			<View style={{backgroundColor:'white'}}>
				<View style={styles.cell}>
					<Text style={styles.rowText}>充值金额</Text>
				</View>

				<RadioButtons options={this.state.enumMoney}
					onSelection={(option) => this.setState({money: option.value})}
					selectedOption={this.state.money}
					renderOption={this.renderOption}
					renderContainer={this.renderContainer}
					extractText={(option) => option.label}
					testOptionEqual={(selectedValue, option) => selectedValue === option.value}
				/>

				<View style={styles.cell}>
					<Text style={styles.rowText}>请选择支付方式</Text>
				</View>

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
					<Text style={{color:'white',fontSize:16}}>立即充值</Text>
				</Button>

				<Text style={{fontSize:12, marginLeft:30, marginRight:30, marginBottom:10, color:'#999'}}>
					点击立即充值，表示您已阅读并同意
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
		console.log('topup.componentWillUnmount');
		this.payment && this.payment.clear();
	}

	renderOption(option, selected, onSelect, index){
		const style = {
			width: 150,
			borderWidth: 1,
			padding: 10,
			margin: 10,
			fontSize: 18,
			textAlign: 'center',
			borderColor: 'lightgray',
			borderRadius: 5,
			overflow:'hidden',
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
		}}>{optionNodes}</View>
	}

	async topupNow(){
		console.log('topup.topupNow');
		this.payment = new Payment();
		this.payment.recharge(this.state.userId, this.state.money, this.state.payType);
	}

}