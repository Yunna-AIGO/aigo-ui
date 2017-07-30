import React from 'react';

import {
  AppRegistry,
  Text,
  View,
  Button,
  Image,
} from 'react-native';

import Storage from '../tools/storage.js';

import QRCode from 'react-native-qrcode'

export default class QrCodeScreen extends React.Component {
  constructor(props) {
      super(props);
      //初始化state
      this.created();
      
      this.method = {
        mymethod(){
          console.log('mymy');
        }
      }
      this.state = {
        qrcode: '',
      }
  };
  //method
  created(){
    this.detectLogin();
  };

  detectLogin(){
    //Storage.delete('token');
    Storage.get('token').then((token)=>{
      if(!token){
        this.goLogin();
      }
    });
  };

  goLogin(){
    //this.props.navigation.navigate('Login')
    console.log(this.props.navigation)
  };
  static navigationOptions = {
    title: '二维码',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <QRCode
          value={this.state.qrcode}
          size={200}
          bgColor='black'
          fgColor='white'
          />

        <Button
          onPress={() => {
            this.setState((preState)=>{
              console.log(JSON.stringify(preState))
              return {
                qrcode: 'http://baidu.com/'
              }
              
            });
          }}
          title="刷新"
        />
      </View>
    );
  }
}

