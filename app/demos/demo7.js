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
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import { TabNavigator } from "react-navigation";

class QrCodeScreen extends React.Component {
  static navigationOptions= {
    title: '二维码'
  }
  render() {
    return (
      <View>
        <Text>我是二维码</Text>
        <Text>我是二维码</Text>
        <Text>我是二维码</Text>
        <Text>我是二维码</Text>
        <Button title='去二维码2' onPress={
          ()=>{
            //this.props.navigation.navigate('All')
            this.props.navigation.navigate('QrCode2')
          }
        }></Button>
        <Button title='去书籍详情' onPress={
          ()=>{
            //this.props.navigation.navigate('All')
            this.props.navigation.navigate('BookDetail')
          }
        }></Button>
      </View>
    )
  }
}

class BooksScreen extends React.Component {
  static navigationOptions= {
    title: '二维码'
  }

  render() {
    return (
      <View>
        <Text>书架</Text>
        <Text>书架</Text>
        <Text>书架</Text>
        <Text>书架</Text>
        <Button title='去书籍详情' onPress={
          ()=>{
            //this.props.navigation.navigate('All')
            this.props.navigation.navigate('BookDetail')
          }
        }></Button>
      </View>
    )
  }
}

const TabNavigatorMain = TabNavigator({
  QrCode: { 
    screen: QrCodeScreen,
    navigationOptions: ({ navigation }) => ({
          tabBarLabel: '二维码',
          tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../images/QRCode.png')}
                style={[{width: 20},{height:20}]}
            />
          ),
        }),
  },
  Books: { 
    screen: BooksScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: '书架',
      tabBarIcon: ({tintColor}) => (
        <Image
            source={require('../images/QRCode.png')}
            style={[{width: 20},{height:20}]}
        />
      ),
    }), 
  },
});

class QrCode2Screen extends React.Component {
  static navigationOptions = {
    title: 'QrCode详情页',
  };
  render() {
    return (
      <View>
        <Text>QrCode详情页</Text>
        <Text>QrCode详情页</Text>
        <Text>QrCode详情页</Text>
        <Button title='去书籍详情' onPress={
          ()=>{
            //this.props.navigation.navigate('All')
            this.props.navigation.navigate('BookDetail')
          }
        }></Button>
      </View>
    );
  }
}


class BookDetailScreen extends React.Component {
  static navigationOptions = {
    title: '图书详情页',
  };
  render() {
    return (
      <View>
        <Text>图书详情页</Text>
      </View>
    );
  }
}


const SimpleApp = StackNavigator({
  Home: { screen: TabNavigatorMain,
    navigationOptions: ({ navigation }) => ({
        //title: '二维码',
    }),
   },
  Books: { screen: BooksScreen },
  QrCode2: { screen: QrCode2Screen },
  BookDetail: { screen: BookDetailScreen },
});

AppRegistry.registerComponent('MyApp', () => SimpleApp);


