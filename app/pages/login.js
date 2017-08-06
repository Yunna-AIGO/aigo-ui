import React from 'react';

import {
  AppRegistry,
  Text,
  TextInput,
  View,
  Button,
  Image,
  Modal,
  StyleSheet,
} from 'react-native';

import globalStyle from '../styles/global.js';

/*
顺序是
1.constructor
2.componentWillMount
3.render
4.componentDidMount
*/

export default class LoginScreen extends React.Component {
  constructor(props){
    console.log('constructor');
    super(props);
    //组件私有属性
    this.state = {
      phoneNo : '',
      captchaBtnReady : false,
      captcha : '',
      loginBtnReady : false
    }
    //修复组件方法,一般用不到
    //this.sendCaptcha = this.sendCaptcha.bind(this); 
    //this.doLogin = this.doLogin.bind(this);
    //this.storageToken = this.storageToken.bind(this);
  }
  //组件对外共享属性
  static defaultProps = {
        display: 'flex', //接收外部参数
        onClose : (display)=>{} //默认一个空事件占位,代表该组件接收该回调参
  }
  componentWillMount(){
    console.log('componentWillMount');
  } 
  render() {
    console.log('render');
    return (
      <Modal>
        <Text>登录</Text>
      </Modal>
      
    );
  }
  componentDidMount(){
    console.log('componentDidMount');
  }
  //custom method
  onChangePhoneNoText(text){
    this.setState({phoneNo:text});

    if(/^1[0-9]{10}$/.test(text)){
      this.setState({captchaBtnReady:true});
    }else{
      this.setState({captchaBtnReady:false});
    }
  }
  sendCaptcha(){
    //debug
    this.state.phoneNo = '18601687765';

    if(/^1[0-9]{10}$/.test(this.state.phoneNo)){
      fetch('http://localhost:8081/getMessage').then((res)=>{
        //debug
        res.success = true;

        if(res.success){
          alert('验证码已发送,请查收短信')
        }

      })
    } else{
      alert('手机号格式有误,请重新填写')
    }
    
  }
  doLogin(){
    fetch('http://localhost:8081/doLogin').then((res)=>{
      res.success = true;
      if(res.success){
        this.storageToken(res.token);
        //登陆成功
      }else{
        alert('登录失败,请检查验证码是否正确')
      }
    })
    console.log('doLogin');
  }
  storageToken(){
    console.log('storageToken');
    this.props.onDisplayChange(this.props.display);
  }

}

//  class LoginScreen extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       phoneNo : '', //手机号
//       captcha: '', //验证码
//       phoneNoReady : false, //手机号准备OK
//       captchaReady : false, //验证码准备OK
//       text1 : '',
//       display : 'flex'
//     };
//     this.foo = this.foo.bind(this); 
//   }

//   componentDidMount() {
//     this.foo();
//   }

//   foo() {
//     //alert(this);
//   }

//   static navigationOptions = {
//     title: '登录',
//   };

//   render() {
//     var display = this.state.display==='none'?'none':'flex';
//     return (
//       <View style={globalStyle.border,{display:display}}>
//         <Button title="关闭" onPress={()=>{
//           this.setState({display:'none'})
//         }}></Button>
//         <TextInput style={[globalStyle.input]} placeholder="请输入手机号" onChangeText={(text) => {
//           this.setState({text1:text});
//         }} />
//         <Text>{this.state.text1}</Text>
//         <Text>{this.state.captcha}</Text>
        
//       </View>
//     );
//   }
// }

