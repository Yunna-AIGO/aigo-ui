import React from 'react';

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';

import * as WeChat from 'react-native-wechat';

import { color, NavigationItem, SearchBar, SpacingView } from '../widget'

// import MyButton from '../mods/myButton';

import Storage from '../tools/storage';

import QRCode from 'react-native-qrcode';

import Button from 'apsl-react-native-button';

import styles from '../styles/global';

import theme from '../styles/theme';

import * as constants from '../tools/constants';

import format from 'string-format';

import Toast from '../tools/toast';

export default class loginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      qrcode : '',
      phoneNo : '',
      phoneNoReady : false,
      captcha : '',
      captchaReady : false,

      userName : '123',
      userId: '',
      token: '',
    };
  }

  static navigationOptions = {
    title: '登录',
    headerLeft: null,
  };

  render() {
    var loginBtnReady = this.state.phoneNoReady && this.state.captchaReady;

    return (
      <View>
        <View style={[styles.cell, {height:60}]}>
          <Text style={{color:'#999',fontSize:16,textAlign:'right',marginRight:15,width:60,}}>+86</Text>
          <TextInput autoFocus={true}
            style={{height: 50,flex:1,fontSize:16,}}
            onChangeText={(text) => this.checkPhoneNo(text)}
            placeholder="请输入手机号"
          />

          <Button style={{height:30,borderWidth:0.5,backgroundColor:'#eee',borderColor:'#ccc',borderRadius:3,marginLeft:15,padding:5,}} 
            isDisabled={!this.state.phoneNoReady}
            onPress={() => this.sendMessage()}>
            <Text style={{fontSize:12}}>获取验证码</Text>
          </Button>
        </View>

        <View style={{height:0.5,}}></View>
        <View style={[styles.cell, {height:60}]}>
          <Text style={{color:'#999',fontSize:16,textAlign:'right',marginRight:15,width:60,}}>验证码</Text>
          <TextInput
              style={{height: 50,flex:1,fontSize:16,}}
              onChangeText={(text) => this.checkCaptcha(text)}
              placeholder="验证码"
            />
        </View>

        <Button style={[styles.rowButton, {marginTop:15}]} 
          isDisabled={!loginBtnReady}
          onPress={() => this.doLogin()}>
          <Text style={{color:'white', fontSize:18}}>登录</Text>
        </Button>

        <Text style={{marginTop:0,marginBottom:20,color:'#999',fontSize:11,textAlign:'center'}}>
          点击登录，表示您已阅读并同意
          <Text onPress={() => this.showTermOfService()}
            style={styles.textLink}>
            《服务条款》
          </Text>
        </Text>
      </View>     
    )
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
    console.log(text);
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
      const {navigate,goBack,state} = this.props.navigation;
      // 在第二个页面,在goBack之前,将上个页面的方法取到,并回传参数,这样回传的参数会重走render方法
      state.params.callback('reload');
      // 登录成功后，总是回到二维码页面
      // goBack();
      navigate('QrCode');
    },1000)
  }

  showTermOfService(){
    this.props.navigation.navigate('TermOfService');
  }

}
