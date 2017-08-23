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
export default class QrCodeScreen extends React.Component {
  constructor(props) {
    super(props);
    that = this;
    this.state = {
      qrcode : '',
      loginVisible: false,
      phoneNo : '',
      phoneNoReady : false,
      captcha : '',
      captchaReady : false,
      loginBtnReady : false,
      userName : '123',
    };
  }
  static navigationOptions = ({ navigation }) => ({
        headerTitle: (
            <TouchableOpacity>
                <Text style={{color:'#fff',fontSize:16,}}>扫一扫</Text>
            </TouchableOpacity>
        ),
        headerRight: (
            <NavigationItem
                icon={require('../images/scanning.png')}
                onPress={() => {
                    alert(this)
                }}
            />
        ),
        headerLeft: (
            <NavigationItem
                title='登录'
                titleStyle={{ color: '#fff' }}
                onPress={() => {
                    that.showLogin();
                }}
            />
        ),
        headerStyle: { backgroundColor: theme.orange,borderColor:'#fff',},
    })

  componentWillMount(){
    console.log('componentWillMount');
    StatusBar.setBarStyle('light-content')
    this.detectLogin();
  }

  componentDidMount(){
    console.log('qrcode.componentDidMount');

    // 必须初始化（有且只有）一次
    WeChat.registerApp(constants.APPID);
  }

  detectLogin(){
    console.log('login');
    Storage.get('token').then((token)=>{
      if(!token){
        //debug
        this.showLogin();
      }else{
        this.getQrCode();
      }
    })
  }

  showLogin(){
    console.log('show login');
    this.setState({
      loginVisible : !this.state.loginVisible
    })
  }

  hideLogin(){
    console.log('hide login');
    this.setState({
      loginVisible : !this.state.loginVisible
    })
  }

  checkPhoneNo(text){
    console.log(text);
    // console.log((/^1[0-9]{10}$/.test(text)));
    this.setState({
      phoneNo : text,
      phoneNoReady : (/^1[0-9]{10}$/.test(text))
    })
  }

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

  checkCaptcha(text){
    this.setState({
      captchaReady : (text.length == 6)
    })
  }

  getQrCode(){
    console.log('getQrCode');

    fetch('http://localhost:8081/getQrCode').then(res=>{
      res.qrcode = 'http://'+ Math.random().toFixed(5) + '.com';
      this.setState({
        qrcode : res.qrcode
      });
    })
  }

  doLogin(){
    console.log('doLogin');
    fetch('http://localhost:8081/login').then(res=>{
      return res.text()
    }).then(res=>{
      console.log('login rsp',res);
      var token = new Date().getTime();
      //debug
      if(token){
        this.saveToken(token);
      }
    })
  }

  saveToken(token){
    console.log('saveToken',token);
    setTimeout(()=>{
      this.hideLogin();
      this.getQrCode();
    },1000)
  } 

  render() {

    var loginBtnReady = this.state.phoneNoReady && this.state.captchaReady;

    return (
      <View  style={{backgroundColor:theme.orange,flex:1}}>

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.loginVisible}
        >
          <View style={{backgroundColor:'#fff',flex:1,padding:50,marginTop:'20%'}}>

            <Image 
              source={require('../images/yunna.png')}
              style={{width:'100%',height:50,marginBottom:20}}
              resizeMode="stretch"
            />
            
            <View style={{flexDirection:'row'}}>
              <TextInput style={[globalStyle.TextInput]} placehoder="请输入手机号" 
              onChangeText={
                (text)=>{
                  this.checkPhoneNo(text)
                }
              }></TextInput>
            </View>

            <Button title="发送验证码" color="orange" disabled={!this.state.phoneNoReady} onPress={()=>{
              this.sendMessage();
            }}></Button>

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
        


        <View style={{backgroundColor:'#fff',margin:20,borderRadius:3,overflow:'hidden'}}>
          <View style={{backgroundColor:theme.lightgrey,}}>
            <Text style={{fontSize:12,padding:10}}>出示进入</Text>
          </View>
          <View style={{padding:20,alignItems:'center',}}>
            <TouchableOpacity 
            onPress={()=>{
              this.getQrCode();
            }}
          >
            <View style={{alignItems:'center',}}>
              <QRCode
                value={this.state.qrcode}
                size={160}
                bgColor='black'
                fgColor='white'
              />
              <Text style={{textAlign:'center',marginTop:10}}>点击刷新二维码</Text>
            </View>
          </TouchableOpacity>
          <Text style={{textAlign:'center',display:(this.state.qrcode?'flex':'none'),backgroundColor:theme.lightgrey,width:200,marginTop:20,padding:5,fontSize:16,color:theme.orange}}>{this.state.qrcode}</Text>
          </View>
        </View>
        
      </View>
    )
  }
}


