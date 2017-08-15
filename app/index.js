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

import { StackNavigator ,TabNavigator  } from 'react-navigation';
import Storage from './tools/storage.js';

import globalStyle from './styles/global.js';

import QRCode from 'react-native-qrcode';

import MyButton from './mods/myButton.js';

import UserDetailScreen from './pages/userDetail.js';

import HistoryScreen from './pages/history.js';
import BooksScreen from './pages/books.js';


class QrCodeScreen extends React.Component {
  constructor(props) {
    super(props);
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
  static navigationOptions= {
    title: '二维码'
  }

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
          animationType={"none"}
          transparent={false}
          visible={this.state.loginVisible}
        >
          <View style={[globalStyle.devtool]}>
            <Text>PhoneNumber:{this.state.phoneNo}</Text>
            <Text>PhoneNoReady:{''+this.state.phoneNoReady}</Text>
            <Text>captchaReady:{''+this.state.captchaReady}</Text>
            <Text style={{color:'red',fontSize:20}}>123<Text style={{flex:1,color:'blue'}}>456</Text></Text>
          </View>
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

        <View style={[globalStyle.devtool]}>
          <Text>this.state.qrcode:{this.state.qrcode}</Text>
          <Text>this.state.loginVisible:{''+this.state.loginVisible}</Text>
        </View>
        
        

        <View style={{justifyContent:'center',alignItems:'center',marginTop:'30%'}}>
          <Button title="手动登录" onPress={()=>{
            this.showLogin();
          }}></Button>

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


class UserCenterScreen extends React.Component {
  static navigationOptions= {
    title: '个人中心'
  }

  constructor(props) {
    super(props);
    this.state = {
      userName : 'yuxiao',
      avatar : 'null',
    };
  }


  componentWillMount(){
    console.log('个人中心componentWillMount');
  }

  componentDidMount(){
    console.log('个人中心componentDidMount');
  }

  reload(){
    console.log('reloding')
    this.setState({userName:'于晓'})
  }
  render() {
    //console.log('11',this.props.navigation.state);
    return (
      <View>
        <View style={globalStyle.card}>
          <View style={[globalStyle.avatar,{marginBottom:10}]}>
            <Image source={require('./images/diao.jpg')} style={{flex:1,width:'100%',borderRadius:20}}/>
          </View>
          <Text>{this.state.userName||'未登录'}</Text>
        </View>

        <TouchableOpacity style={globalStyle.cell} 
          onPress={
            ()=>{
              this.props.navigation.navigate('UserDetail',{
                //跳转的时候携带一个参数去下个页面
                callback: (data)=>{
                  //console.log(data); //回调入参
                  if(data==='reload'){
                    this.reload();
                  }
                }
              })
            }
          }
        >
          <Image source={require('./images/set.png')} style={{width:20,height:20,marginRight:20,flex:0,}}></Image>
          <Text style={{flex:1,fontSize:16,}}>个人信息</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyle.cell} onPress={
          ()=>{
            this.props.navigation.navigate('History')
          }
        }
        >
          <Image source={require('./images/history.png')} style={{width:20,height:20,marginRight:20,flex:0,}}></Image>
          <Text style={{flex:1,fontSize:16,}}>历史记录</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[globalStyle.cell,{marginTop:20,}]}>
          <Image style={{width:20,height:20,marginRight:20,flex:0,}}></Image>
          <Text style={{flex:1,fontSize:16,color:'red'}}>退出账户</Text>
        </TouchableOpacity>

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
                source={require('./images/QRCode.png')}
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
            source={require('./images/book.png')}
            style={[{width: 20},{height:20}]}
        />
      ),
    }), 
  },
  UserCenter: {
    screen: UserCenterScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: '我的',
      tabBarIcon: ({tintColor}) => (
        <Image
            source={require('./images/account.png')}
            style={[{width: 20},{height:20}]}
        />
      ),
    }), 
  },
},{
  tabBarPosition : 'bottom',
  lazy : true,
});


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
  onTransitionEnd:(a)=>{ console.log(a); }
});



AppRegistry.registerComponent('MyApp', () => GlobalPage);


