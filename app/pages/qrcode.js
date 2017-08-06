import React from 'react';

import {
  AppRegistry,
  Text,
  TextInput,
  View,
  Button,
  Image,
  TouchableHighlight,
  Modal,
} from 'react-native';

import Storage from '../tools/storage.js';

import globalStyle from '../styles/global.js';

import QRCode from 'react-native-qrcode';

export default class QrCodeScreen extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        qrcode: '',
        modalVisible : false,
        btnReady : false,
      }
  }

  static navigationOptions = {
    title: '二维码',
  }

  

  detectLogin(){
    Storage.get('token').then((token)=>{

      if(!token){
        setTimeout(()=>{
          this.showLogin();
        },2000)
      }
      // if(token){
      //   this.getQrCode();
      // }else{
      //   this.showLogin();
      // }
    });
  }

  showLogin(){
    this.setState({modalVisible : true})
  }

  hideLogin(){
    this.setState({modalVisible : false})
  }

  doLogin(){
    this.hideLogin()
    this.getCode()
  }

  getCode(){
    fetch('http://localhost:8081/getCode')
    .then((res)=>{
      //获取fetch结果body
      return res.text()
    })
    .then((res)=>{
      res = 'http://'+Math.random()+'.com/';
      this.setState({qrcode : res});
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    var btnReady = this.state.btnReady;
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Modal
          animationType={"none"}
          transparent={false}
          visible={this.state.modalVisible}
        > 
          <View style={{flex:1,padding:50,justifyContent: 'center',alignItems: 'center',}}>
            <Image source={{uri:'http://www.bootcss.com/p/flat-ui/images/illustrations/compass.png'}} style={{width:140,height:140,marginBottom:40}}></Image>
            
            <View style={{flexDirection: 'row',marginBottom:10,}}>
              <TextInput style={[globalStyle.input,{flex:1}]} placeholder="请输入手机号"></TextInput>
            </View>

            <View style={{flexDirection: 'row',marginBottom:10,}}>
              <TextInput style={[globalStyle.input,{flex:1}]} placeholder="验证码" onChangeText={(text)=>{
                this.setState({btnReady:text.length>3})
              }}></TextInput>
              <View>
                <Button title="发送验证" onPress={() => {
                  this.setState({
                    modalVisible: false
                  })
                }}>
                </Button>
              </View>
            </View>
            
            <View style={{borderRadius:3,borderWidth:0.5,borderColor:btnReady?'#2980B9':'#ccc',width:'100%',}}>
              <TouchableHighlight onPress={()=>{
                this.doLogin();
              }}>
                <Text style={{fontSize:20,backgroundColor:btnReady?'#3498db':'#eee',textAlign:'center',color:btnReady?'#fff':'#666',padding:10,}}>登录</Text>
              </TouchableHighlight>
            </View>
            
          </View>
          
        </Modal>

        <Button
          onPress={() => {
            this.setState({
              modalVisible: true
            })
          }}
          title="登录"
        >
        </Button>

        <Text>this.state.token:{this.state.token}</Text>

        <QRCode
          value={this.state.qrcode}
          size={200}
          bgColor='black'
          fgColor='white'
        />

      </View>
    );
  }

  componentDidMount(){
    console.log('componentDidMount');
    this.detectLogin();
  }
}



