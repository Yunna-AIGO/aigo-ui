import React from 'react';

import {
  AppRegistry,
  Text,
  TextInput,
  View,
  Button,
  Image,
} from 'react-native';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: '登录',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Image source={require('.././images/diao.jpg')}
          style={{
            height:100,
            width:100,
            marginBottom: 20
          }} />
        <View style={{flexDirection: 'row',width:300,borderColor:'red',borderWidth:2}}>
          <TextInput placeholder="请输入手机号" style={{padding:5,height: 40, width:180,borderColor: 'black', borderWidth: 1}} />
          <Button onPress={() => {
            alert('发送成功')
          }} title="发送验证码" style={{padding:5,width:80,height: 40,borderColor: 'black', borderWidth: 1}} />
        </View> 
        <View style={{width:300,borderColor:'red',borderWidth:2,marginTop:20}}>
          <TextInput placeholder="请输入验证码" style={{padding:5,height: 40, borderColor: 'black', borderWidth: 1}} />
        </View> 
        <Button
          onPress={() => {
            console.log('navigate',navigate);
            this.props.navigation.goBack();
          }}
          title="登录"
        />
      </View>
    );
  }
}

