import React, { Component } from 'react';

import { 
  AppRegistry,
} from 'react-native';

import { StackNavigator ,TabBarBottom, TabNavigator  } from 'react-navigation';
import globalStyle from './styles/global.js';
import theme from './styles/theme.js';

import QrCodeScreen from './pages/qrCode.js';
import BooksScreen from './pages/books.js';
import UserDetailScreen from './pages/userDetail.js';
import UserCenterScreen from './pages/userCenter.js';
import HistoryScreen from './pages/history.js';

import BookDetailScreen from './pages/bookDetail.js';
import TabBarItem from './mods/tabBarItem.js';


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
  Books: {
    screen: BooksScreen,
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
  Home: { 
    screen: TabNavigatorMain,
  },
  BookDetail: {
    screen: BookDetailScreen
  },
  UserDetail : {
    screen: UserDetailScreen
  },
  History : {
    screen: HistoryScreen
  },
},{
  onTransitionEnd:(navi)=>{}
});



AppRegistry.registerComponent('MyApp', () => GlobalPage);


