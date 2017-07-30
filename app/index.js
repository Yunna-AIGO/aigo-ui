import React from 'react';

import {
  AppRegistry,
  Text,
  View,
  Button,
  Image,
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import QrCodeScreen from './pages/qrcode.js';
import BooksScreen from './pages/books.js';
import BookDetailScreen from './pages/bookDetail.js';
import UserHomeScreen from './pages/userHome.js';
import UserDetailScreen from './pages/userDetail.js';
import HistoryScreen from './pages/history.js';
import LoginScreen from './pages/login.js';

const QrCodeStackNavigator = StackNavigator({
  QrCode: { screen: QrCodeScreen },
  Login: { screen: LoginScreen },
});

const BooksStackNavigator = StackNavigator({
  Books: { screen: BooksScreen },
  BookDetail: { screen: BookDetailScreen },
});

const UserStackNavigator = StackNavigator({
  UserHome: { screen: UserHomeScreen },
  UserDetail: { screen: UserDetailScreen },
  History: { screen: HistoryScreen },
});

import { TabNavigator } from "react-navigation";

// QrCodeStackNavigator.navigationOptions = {
//   title:'二维码'
// }
// BooksStackNavigator.navigationOptions = {
//   title:'书架'
// }
// UserStackNavigator.navigationOptions = {
//   title:'个人中心'
// }

const MainTabNavigator = TabNavigator({
  QrCode: {
    screen: QrCodeStackNavigator,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: '二维码',
      tabBarIcon: ({tintColor}) => (
        <Image
            source={require('./images/QRCode.png')}
            style={[{width: 20},{height:20}]}
        />
      ),
    }),
  },
  Books : {
    screen:BooksStackNavigator,
    navigationOptions: ({ navigation }) => ({
        tabBarLabel: '书架',
        tabBarIcon: ({tintColor}) => (
        <Image
            source={require('./images/book.png')}
            style={[{width: 24},{height:24}]}
        />
      ),
    }),
  },
  User: {
    screen: UserStackNavigator,
    navigationOptions: ({ navigation }) => ({
        tabBarLabel: '个人中心',
        tabBarIcon: ({tintColor}) => (
        <Image
            source={require('./images/account.png')}
            style={[{width: 20},{height:20}]}
        />
      ),
    }),
  },
});

AppRegistry.registerComponent('MyApp', () => MainTabNavigator);