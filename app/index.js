import React, { Component } from 'react';

import { 
  AppRegistry,
  View,
  Text,
  TextInput,
  Image,
  Button,
  AsyncStorage,
  ActivityIndicator,
  Modal,
  TouchableHighlight,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { StackNavigator ,TabBarBottom, TabNavigator  } from 'react-navigation';

import globalStyle from './styles/global.js';



import UserDetailScreen from './pages/userDetail.js';
import UserCenterScreen from './pages/userCenter.js';

import HistoryScreen from './pages/history.js';
import BooksScreen from './pages/books.js';
import BookDetailScreen from './pages/bookDetail.js';

import QrCodeScreen from './pages/qrCode.js';

import TabBarItem from './mods/tabBarItem.js';


const TabNavigatorMain = TabNavigator({
  QrCode: {
    screen: QrCodeScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: '二维码',
      tabBarIcon: ({focused,tintColor}) => (
        <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={require('./images/QRCode.png')}
            selectedImage={require('./images/QRCode.png')}
        />
      ),
    }),

  },
  Books: {
    screen: BooksScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: '书架',
      tabBarIcon: ({focused,tintColor}) => (
        <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={require('./images/book.png')}
            selectedImage={require('./images/book.png')}
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
            normalImage={require('./images/account.png')}
            selectedImage={require('./images/account.png')}
        />
      ),
    }),
  },
},{
  tabBarComponent: TabBarBottom,
  tabBarPosition : 'bottom',
  lazy : true,
  tabBarOptions: {
      activeTintColor: 'orange',
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
  }
},{
  onTransitionEnd:(navi)=>{}
});



AppRegistry.registerComponent('MyApp', () => GlobalPage);


