import React, { Component } from 'react';

import { 
  AppRegistry,
  View,
} from 'react-native';

import { StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation';
import globalStyle from './styles/global';
import theme from './styles/theme';
import TabBarItem from './mods/tabBarItem';
import Storage from './tools/storage';
import * as WeChat from 'react-native-wechat';
import * as constants from './tools/constants';

import QrCodeScreen from './pages/qrCode';
import TermOfServiceScreen from './pages/termOfService';

import OrdersScreen from './pages/orders';
import OrderDetailScreen from './pages/orderDetail';

import UserCenterScreen from './pages/userCenter';
import UserDetailScreen from './pages/userDetail';
import WalletScreen from './pages/wallet';
import TopupScreen from './pages/topup';
import TermOfServiceTopupScreen from './pages/termOfServiceTopup';
import SettingScreen from './pages/setting';

import LoginScreen from './pages/login.js';

const TabNavigatorMain = TabNavigator({
  QrCode: {
    screen: QrCodeScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: '扫一扫',
      tabBarIcon: ({focused,tintColor}) => (
        <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={require('./images/qrcode1.png')}
            selectedImage={require('./images/qrcode2.png')}
        />
      ),
    }),

  },
  Orders: {
    screen: OrdersScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: '订单',
      tabBarIcon: ({focused,tintColor}) => (
        <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={require('./images/book1.png')}
            selectedImage={require('./images/book2.png')}
        />
      ),
    }),
  },
  UserCenter: {
    screen: UserCenterScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: '我的',
      tabBarIcon: ({focused,tintColor}) => (
        <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={require('./images/account1.png')}
            selectedImage={require('./images/account2.png')}
        />
      ),
    }),
  },
},{
  tabBarComponent: TabBarBottom,
  tabBarPosition : 'bottom',
  lazy : true,
  tabBarOptions: {
      activeTintColor: theme.orange,
      inactiveTintColor: '#333',
      style: { backgroundColor: '#fff',},
  },
});

const GlobalPage = StackNavigator({
  Home: { screen: TabNavigatorMain },
  TermOfService: {screen: TermOfServiceScreen},
  OrderDetail: { screen: OrderDetailScreen },
  UserDetail : { screen: UserDetailScreen },
  Wallet: {screen: WalletScreen},
  Topup: {screen: TopupScreen},
  TermOfServiceTopup: {screen: TermOfServiceTopupScreen},
  Setting: {screen: SettingScreen},
},{
  onTransitionEnd:(navi)=>{}
});

var that = null;
export default class MyApp extends React.Component {
  constructor(props) {
    super(props);
    that = this;
    this.state = {
      loginVisible: false,
    };
  }
  componentWillMount(){
    console.log('componentWillMount');

    // 必须初始化（有且只有）一次
    WeChat.registerApp(constants.APPID);

    //StatusBar.setBarStyle('light-content')
    this.detectLogin();
  }

  async detectLogin(){
    console.log('detectLogin');
    let userId = await Storage.get('userId');
    let token = await Storage.get('token');

    if(!userId || !token){
      this.setState({
        loginVisible : true
      });
    }
  }

  render(){
    return (
      <View style={{flex:1}}>
        <LoginScreen 
        hideLoginHandle={()=>{
          this.setState({
            loginVisible : false
          })
        }}
        loginVisible={this.state.loginVisible}
         />
        <GlobalPage />
      </View>
    )
  }
}


AppRegistry.registerComponent('MyApp', () => MyApp);


