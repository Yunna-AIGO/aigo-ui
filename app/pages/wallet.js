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

			redPackage: 0,
			coupon: 0,
		};
	}

	render(){
		return (
			<View>
				<View style={{backgroundColor:'orange',padding:15,}}>
					<Text style={{color:'#eee',marginBottom:5,marginTop:15,}}>账户余额</Text>
					<Text style={{fontSize:36,color:'#fff',marginBottom:15,}}>{this.state.accountInfo.availableAmount || '0.00'}</Text>
				</View>

				<TouchableOpacity
					onPress={()=>{
						this.props.navigation.navigate('Topup', {userId:this.state.userId});
					}}
					style={{flexDirection:'row',alignItems:'center',height:50,backgroundColor:'#fff',paddingLeft:15,paddingRight:15,borderColor:'#ddd',borderTopWidth:0.5,borderBottomWidth:0.5,}}>
						<Image  
							source={require('../images/topup.png')}
							style={{width:24,height:24,marginRight:15,}}>
						</Image>
						<Text style={{flex:1}}>充值</Text>
				</TouchableOpacity>
				<TouchableOpacity 
					style={{flexDirection:'row',marginBottom:15,alignItems:'center',height:50,backgroundColor:'#fff',paddingLeft:15,paddingRight:15,borderColor:'#ddd',borderTopWidth:0.5,borderBottomWidth:0.5,}}>
						<Image  
							source={require('../images/wallet.png')}
							style={{width:24,height:24,marginRight:15,}}>
						</Image>
						<Text style={{flex:1}}>提现</Text>
				</TouchableOpacity>

				<TouchableOpacity 
					style={{flexDirection:'row',alignItems:'center',height:50,backgroundColor:'#fff',paddingLeft:15,paddingRight:15,borderColor:'#ddd',borderTopWidth:0.5,borderBottomWidth:0.5,}}>
						<Image  
							source={require('../images/redpackage.png')}
							style={{width:24,height:24,marginRight:15,}}>
						</Image>
						<Text style={{flex:1}}>红包</Text>
						<Text style={[styles.rowText, styles.rowTextRight]}>{this.state.redPackage} 个</Text>
				</TouchableOpacity>
				<TouchableOpacity 
					style={{flexDirection:'row',alignItems:'center',height:50,backgroundColor:'#fff',paddingLeft:15,paddingRight:15,borderColor:'#ddd',borderTopWidth:0.5,borderBottomWidth:0.5,}}>
						<Image  
							source={require('../images/coupon.png')}
							style={{width:24,height:24,marginRight:15,}}>
						</Image>
						<Text style={{flex:1}}>优惠券</Text>
						<Text style={[styles.rowText, styles.rowTextRight]}>{this.state.coupon} 张</Text>
				</TouchableOpacity>

				{/*<View style={[styles.cell, styles.spaceBetween]}>
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
					onPress={() => this.props.navigation.navigate('Topup', {userId:this.state.userId})}>
					充  值
				</Button>*/}
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