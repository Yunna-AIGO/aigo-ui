import React from 'react';

import {
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  StatusBar
} from 'react-native';

import * as WeChat from 'react-native-wechat';

import { color, NavigationItem, SearchBar, SpacingView } from '../widget'

import MyButton from '../mods/myButton';

import Storage from '../tools/storage';

import QRCode from 'react-native-qrcode';

import theme from '../styles/theme';

import * as constants from '../tools/constants';

import format from 'string-format';

import Toast from '../tools/toast';

let that;
export default class loginScreen extends React.Component {
  constructor(props) {
    super(props);
    that = this;
    this.state = {
      qrcode : '',
      phoneNo : '',
      phoneNoReady : false,
      captcha : '',
      captchaReady : false,
      loginBtnReady : false,

      userName : '123',
      userId: '',
      token: '',

    };
  }

  //输入
  checkPhoneNo(text){
    console.log(text);
    // console.log((/^1[0-9]{10}$/.test(text)));
    this.setState({
      phoneNo : text,
      phoneNoReady : (/^1[0-9]{10}$/.test(text))
    })
  }

  //发送短消息
  sendMessage(){
    this.sendMessageImpl().then(response => {
      if(constants.SUCCESS === response.code){
        Toast.show('短信已发送，请查收');
      }else{
        Toast.show('发送失败：'+response.message);
      }
    }, error => {
      console.log(error);
    });
  }
  async sendMessageImpl(){
    let url = format(constants.sendsms, {mobile: this.state.phoneNo});
    console.log('url: '+url);
    let response = await fetch(url);
    let resJson = await response.json();
    return resJson;
  }

  //检测短消息
  checkCaptcha(text){
    this.setState({
      captcha: text,
      captchaReady : (text.length == 6)
    })
  }

  //登录
  doLogin(){
    this.loginImpl().then(response => {
      console.log(response);
      if(constants.SUCCESS === response.code){
        Toast.show('注册/登录成功！');
        let {userId, token} = response.data;
        this.saveToken(userId, token);
      }else{
        Toast.show('注册/登录失败：'+response.message);
      }
    }, error => {
      console.log(error);
    });
  }

  async loginImpl(){
    try{
      console.log(constants.entry);
      let request = {
        mobile: this.state.phoneNo,
        smsCode: this.state.captcha,
      };
      let response = await fetch(constants.entry, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(request),
      });
      let resJson = await response.json();
      return resJson;
    }catch(error){
      console.error(error);
    }
  }

  saveToken(userId, token){
    this.setState({
      userId: userId,
      token: token,
    })

    Storage.save('userId', userId);
    Storage.save('token', token);

    setTimeout(()=>{
      this.props.hideLoginHandle();
    },1000)
  } 

  render() {
    var loginBtnReady = this.state.phoneNoReady && this.state.captchaReady;

    return (
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.props.loginVisible}
        >
          <View style={{backgroundColor:'#fff',flex:1,padding:50,marginTop:'20%'}}>

            <Image 
              source={require('../images/yunna.png')}
              style={{width:'100%',height:50,marginBottom:20}}
              resizeMode="stretch"
            />
            
            <View style={{flexDirection:'row'}}>
              <TextInput style={[globalStyle.TextInput]} 
                autoFocus={true}
                placehoder="请输入手机号" 
                onChangeText={
                (text)=>{
                  this.checkPhoneNo(text);
                }
              }></TextInput>
            </View>

            <Button 
              title="发送验证码" 
              color="orange" 
              disabled={!this.state.phoneNoReady} 
              onPress={()=>{
                this.sendMessage();
              }}
            ></Button>

            <View style={{flexDirection:'row'}}>
              <TextInput style={[globalStyle.TextInput]} placehoder="请输入验证码" 
              onChangeText={
                (text)=>{
                  this.checkCaptcha(text)
                }
              }>
              </TextInput>
            </View>

            <View>
              <MyButton
                disabled={!loginBtnReady}
                style={{marginTop:30}}
                onPress={()=>{
                  this.doLogin();
                }}
              >登录</MyButton>
            </View>
          </View>
        </Modal>        
    )
  }
}


