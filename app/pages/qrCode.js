import React from 'react';

import {
  AppRegistry,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Modal,
} from 'react-native';

import { color, NavigationItem, SearchBar, SpacingView } from '../widget'

import MyButton from '../mods/myButton.js';

import Storage from '../tools/storage.js';

import QRCode from 'react-native-qrcode';

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
        title : '二维码',
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
                titleStyle={{ color: '#333' }}
                onPress={() => {
                    that.showLogin();
                }}
            />
        ),
        headerStyle: { backgroundColor: '#fff' },
    })

  componentWillMount(){
    console.log('componentWillMount');
    this.detectLogin();
  }

  detectLogin(){
    console.log('login');
    Storage.get('token').then((token)=>{
      if(!token){
        //debug
        //this.showLogin();
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
    console.log('sendMessage');
    fetch('http://localhost:8081/sendMessage')
    .then((res)=>{
      return res.text()
      //return res.text()
    }).then((res)=>{
      console.log('text',res)
      res = true;
      if(res){
        //debug
        console.log('验证码发送成功');
      }else{
        //debug
        console.log('验证码发送失败');
      }
    })
  }

  checkCaptcha(text){
    this.setState({
      captchaReady : (text.length>3 && text.length < 7)
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
      <View>

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.loginVisible}
        >
          <View style={{backgroundColor:'#fff',flex:1,padding:50}}>

            <Text style={{fontSize:60,fontWeight:'bold',marginBottom:20,color:'#1ABC9C',marginTop:40,textAlign:'center',}}>Aigo</Text>
            <View style={{flexDirection:'row'}}>
              <TextInput style={[globalStyle.TextInput]} placehoder="请输入手机号" 
              onChangeText={
                (text)=>{
                  this.checkPhoneNo(text)
                }
              }></TextInput>
            </View>

            <Button title="发送验证码" disabled={!this.state.phoneNoReady} onPress={()=>{
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
        

        <View style={{justifyContent:'center',alignItems:'center',marginTop:'30%'}}>
          

          <TouchableHighlight 
            onPress={()=>{
              this.getQrCode();
            }}
            underlayColor='transparent'
          >
            <View>
              <QRCode
                value={this.state.qrcode}
                size={200}
                bgColor='black'
                fgColor='white'
              />
              <Text style={{textAlign:'center',marginTop:10}}>点击刷新二维码</Text>
            </View>
          </TouchableHighlight>
          
          <Text style={{display:(this.state.qrcode?'flex':'none'),backgroundColor:'#2C3E50',width:200,marginTop:20,padding:5,fontSize:16,color:'#fff'}}>{this.state.qrcode}</Text>

        </View>
        
      </View>
    )
  }
}


