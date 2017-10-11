import React, { Component } from 'react';

import { 
  AppRegistry,
  View,
  StatusBar,
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
            normalImage={require('./images/icon_qrcode.png')}
            selectedImage={require('./images/icon_qrcode_active.png')}
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
            normalImage={require('./images/icon_order.png')}
            selectedImage={require('./images/icon_order.png')}
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
            normalImage={require('./images/icon_mine.png')}
            selectedImage={require('./images/icon_mine_active.png')}
        />
      ),
    }),
  },
},{
  tabBarComponent: TabBarBottom,
  tabBarPosition : 'bottom',
  swipeEnabled: true,
  animationEnabled: true,
  lazy : true,
  tabBarOptions: {
      activeTintColor: theme.orange,
      inactiveTintColor: '#333',
      style: { backgroundColor: '#fff',},
  },
});

const GlobalPage = StackNavigator({
  Home: { screen: TabNavigatorMain },
  Login: {screen: LoginScreen},
  TermOfService: {screen: TermOfServiceScreen},
  OrderDetail: { screen: OrderDetailScreen },
  UserDetail : { screen: UserDetailScreen },
  Wallet: {screen: WalletScreen},
  Topup: {screen: TopupScreen},
  TermOfServiceTopup: {screen: TermOfServiceTopupScreen},
  Setting: {screen: SettingScreen},
},{
  onTransitionEnd:(navi)=>{
    console.log('onTransitionEnd');
  },
  navigationOptions: {
    //使用统一的header背景色,注意,header包含statusBar和body,本质上是个View
    //headerStyle: { backgroundColor: color.theme,},
    headerBackTitle: null, //只显示回退图标,不显示上个router的标题
    headerTintColor: '#666', //正常模式下标题颜色(bd部分),注意,会包含回退按钮>的颜色
    showIcon: true,
  },
});

export default class MyApp extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    console.log('index.componentDidMount');

    // 必须初始化（有且只有）一次
    WeChat.registerApp(constants.APPID);
  }

  render(){
    return (
      <View style={{flex:1}}>
        <StatusBar hidden={false} 
          barStyle={'light-content'}
          translucent={false}
          networkActivityIndicatorVisible={false}/>
        <GlobalPage />
      </View>
    )
  }
}

AppRegistry.registerComponent('MyApp', () => MyApp);
