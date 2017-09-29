import React from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	Switch,
	Picker,
} from 'react-native';
import Button from 'apsl-react-native-button';
import Toast from 'react-native-root-toast';
import {
	SUCCESS, 
	loginState,
} from '../tools/constants';
import styles from '../styles/global';

export default class SettingScreen extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			allowSendMsg: true,
			allowAutoPay: true,
			showPicker: true,
			needNotLogin: 'sixMonth',
			needNotLoginTmp: 'sixMonth',
			version: '1.0.0.alpha',
		};
	}

	render(){
		return (
			<View>
				<View style={[styles.cell, styles.spaceBetween]}>
					<Text style={styles.rowText}>允许推送消息</Text>
					<Switch value={this.state.allowSendMsg}
						onValueChange={(value) => this.setState({allowSendMsg: value})} 
						style={styles.rowTextRight}/>
				</View>

				<View style={[styles.cell, styles.spaceBetween]}>
					<Text style={styles.rowText}>开启小额免密(200元)</Text>
					<Switch value={this.state.allowAutoPay}
						onValueChange={(value) => this.setState({allowAutoPay: value})} 
						style={styles.rowTextRight}/>
				</View>

				<View style={[styles.cell, styles.spaceBetween]}>
					<Text style={styles.rowText}>免登录</Text>
					<View>
						<TouchableOpacity
							onPress={()=>{
								this.setState({showPicker:true})
							}}
						>
							<Text>{this.state.needNotLogin}</Text>
						</TouchableOpacity>
					</View>
					{/*<Picker style={[styles.rowTextRight, {width:70}]}
						itemStyle={{height:40}}
						selectedValue={this.state.needNotLogin}
						onValueChange={(value) => this.setState({needNotLogin: value})}>
						<Picker.Item label='1个月' value='oneMonth'/>
						<Picker.Item label='3个月' value='threeMonth'/>
						<Picker.Item label='6个月' value='sixMonth'/>
					</Picker>*/}
				</View>

				<View style={[styles.cell, styles.spaceBetween]}>
					<Text style={styles.rowText}>版本号</Text>
					<Text style={[styles.rowText, styles.rowTextRight]}>{this.state.version}</Text>
				</View>

				<View
					class={'selectMod'}
					style={{position:'absolute',left:0,bottom:0,right:0,display:this.state.showPicker?'flex':'none'}}>
					<View class={'selectHead'}
						style={{paddingLeft:15,paddingRight:15,height:40,alignItems:'center',backgroundColor:'#fff',flexDirection:'row'}}>
						<TouchableOpacity
							onPress={()=>{
								this.setState({showPicker:false})
							}} >
							<Text>取消</Text>
						</TouchableOpacity>
						<Text style={{textAlign:'center',flex:1}}>请选择</Text>
						<TouchableOpacity
							onPress={()=>{
								this.setState({needNotLogin:this.state.needNotLoginTmp,showPicker:false})
							}} >
							<Text>确定</Text>
						</TouchableOpacity>
					</View>

					<Picker
            //Picker样式 dialog弹窗样式默认 dropdown显示在下边
            mode={'dropdown'}
            //显示选择内容
            selectedValue={this.state.needNotLogin}
            //选择内容时调用此方法
            onValueChange={(value)=>this.setState({needNotLoginTmp: value})}
            //设置Title 当设置为dialog时有用
            prompt={'请选择'} >
            <Picker.Item label='1个月' value='oneMonth'/>
						<Picker.Item label='3个月' value='threeMonth'/>
						<Picker.Item label='6个月' value='sixMonth'/>
        	</Picker>
				</View>

			</View>
		);
	}

	static navigationOptions = ({navigation}) =>{
		const {params = {}} = navigation.state;
		return {
			title: '设置',
		};
	};

	componentDidMount(){
		console.log('setting.componentDidMount');
	}
}