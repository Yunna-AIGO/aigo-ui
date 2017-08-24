import React from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity,
} from 'react-native';
import Button from 'apsl-react-native-button';
import styles from '../styles/global';
import Toast from '../tools/toast';
import Storage from '../tools/storage';
import format from 'string-format';
import * as constants from '../tools/constants';

export default class WalletScreen extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			userId: this.props.navigation.state.params.userId,
			accountInfo: {},

			redPackage: 1,
			coupon: 4,
		};
	}

	render(){
		return (
			<View>
				<View style={[styles.cell, styles.spaceBetween]}>
					<Text style={styles.rowText}>余额</Text>
					<Text style={[styles.rowText, styles.rowTextRight]}>{this.state.accountInfo.availableAmount} 元</Text>
				</View>

				<View style={[styles.cell, styles.spaceBetween]}>
					<Text style={styles.rowText}>红包</Text>
					<Text style={[styles.rowText, styles.rowTextRight]}>{this.state.redPackage} 个</Text>
				</View>

				<View style={[styles.cell, styles.spaceBetween]}>
					<Text style={styles.rowText}>优惠券</Text>
					<Text style={[styles.rowText, styles.rowTextRight]}>{this.state.coupon} 张</Text>
				</View>

				<Button style={styles.rowButton} 
					onPress={() => this.props.navigation.navigate('Topup')}>
					充  值
				</Button>
			</View>
		);
	}

	static navigationOptions = ({navigation}) =>{
		const {params = {}} = navigation.state;
		return {
			title: '我的钱包',
		};
	};

	componentDidMount(){
		console.log('wallet.componentDidMount');
		this.getAccountInfo();
	}

	async getAccountInfo(){
		try{
      let url = format(constants.accountInfo, {userId: this.state.userId});
      console.log('url: '+url);
      let response = await fetch(url);
      let resJson = await response.json();
      console.log(resJson);
      if(constants.SUCCESS == resJson.code){
      	this.setState({accountInfo: resJson.data});
      }else{
      	Toast.show('获取账户失败：'+resJson.message);
      }
    }catch(error){
      console.error(error);
    }
	}
}