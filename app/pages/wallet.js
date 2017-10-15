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
import globalStyle from '../styles/global';

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
						this.props.navigation.navigate('Topup', {
							userId:this.state.userId,
							//跳转的时候携带一个参数去下个页面
			        callback: (data)=>{
			          //console.log(data); //回调入参
			          if(data==='reload'){
			            this.getAccountInfo();
			          }
			        },
						});
					}}
					style={globalStyle.cell}>
						<Image  
							source={require('../images/topup.png')}
							style={{width:24,height:24,marginRight:15,}}>
						</Image>
						<Text style={{flex:1, fontSize:16}}>充值</Text>
				</TouchableOpacity>
				{/*<TouchableOpacity 
					style={[globalStyle.cell, {marginBottom:15}]}>
						<Image  
							source={require('../images/wallet.png')}
							style={{width:24,height:24,marginRight:15,}}>
						</Image>
						<Text style={{flex:1, fontSize:16}}>提现</Text>
				</TouchableOpacity>

				<TouchableOpacity 
					style={globalStyle.cell}>
						<Image  
							source={require('../images/redpackage.png')}
							style={{width:24,height:24,marginRight:15,}}>
						</Image>
						<Text style={{flex:1, fontSize:16}}>红包</Text>
						<Text style={[styles.rowText, styles.rowTextRight]}>{this.state.redPackage} 个</Text>
				</TouchableOpacity>
				<TouchableOpacity 
					style={globalStyle.cell}>
						<Image  
							source={require('../images/coupon.png')}
							style={{width:24,height:24,marginRight:15,}}>
						</Image>
						<Text style={{flex:1, fontSize:16}}>优惠券</Text>
						<Text style={[styles.rowText, styles.rowTextRight]}>{this.state.coupon} 张</Text>
				</TouchableOpacity>*/}
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

	componentWillUnmount(){
		console.log('wallet.componentWillUnmount');
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