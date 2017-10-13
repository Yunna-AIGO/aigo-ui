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
	VERSION,
} from '../tools/constants';
import styles from '../styles/global';
import _ from 'underscore';

export default class SettingScreen extends React.Component {
	constructor(props){
		super(props);

		this.enumLogin = [
			{label:'1个月', value:"oneMonth"},
			{label:'3个月', value:"threeMonth"},
			{label:'6个月', value:"sixMonth"},
		];

		this.state = {
			allowSendMsg: true,
			allowAutoPay: true,
			allowGesture: true,
			showPicker: false,
			version: VERSION,
		};

		this.state.needNotLogin = 'threeMonth';
		this.state.needNotLoginTmp = this.state.needNotLogin;
		this.state.needNotLoginDesc = _.findWhere(this.enumLogin, {value:this.state.needNotLogin}).label;
	}

	render(){
		return (
			<View style={{flex:1}}>
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
					<Text style={styles.rowText}>开启手势</Text>
					<Switch value={this.state.allowGesture}
						onValueChange={(value) => this.setState({allowGesture: value})} 
						style={styles.rowTextRight}/>
				</View>

				<View style={[styles.cell, styles.spaceBetween]}>
					<Text style={styles.rowText}>免登录</Text>
					<View style={styles.rowTextRight}>
						<TouchableOpacity
							onPress={()=>{
								this.setState({showPicker:true})
							}}
						>
							<Text style={{fontSize:16}}>{this.state.needNotLoginDesc}</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View style={[styles.cell, styles.spaceBetween]}>
					<Text style={styles.rowText}>版本号</Text>
					<Text style={[{fontSize: 16}, styles.rowTextRight]}>{this.state.version} </Text>
				</View>

				<View style={{position:'absolute',bottom:0,left:0,right:0,opacity:this.state.showPicker?1:0}}>
					<View style={{paddingLeft:15,paddingRight:15,height:40,alignItems:'center',backgroundColor:'#fff',flexDirection:'row'}}>
						<TouchableOpacity
							onPress={()=>{
								this.setState({showPicker:false})
							}} >
							<Text>取消</Text>
						</TouchableOpacity>
						<Text style={{textAlign:'center',flex:1,fontSize:16}}>请选择</Text>
						<TouchableOpacity
							onPress={()=>{
								this.setVal(this.state.needNotLoginTmp);
								this.setState({showPicker:false});
							}} >
							<Text>确定</Text>
						</TouchableOpacity>
					</View>

					<Picker
            //Picker样式 dialog弹窗样式默认 dropdown显示在下边
            mode={'dialog'}
            //显示选择内容
            selectedValue={this.state.needNotLoginTmp}
            //选择内容时调用此方法
            onValueChange={(value, position)=>{
            	this.setState({needNotLoginTmp: value});
            }}
            //设置Title 当设置为dialog时有用
            prompt={'请选择'} >
            {
            	this.enumLogin.map((item, index)=>{
		           return <Picker.Item label={item.label} value={item.value} key={item.value}/>
		          })
            }
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

	setVal(val){
		let desc = _.findWhere(this.enumLogin, {value:val}).label;
		this.setState({
			needNotLogin: val,
			needNotLoginDesc: desc,
		});
	}
}