import React, { Component } from 'react';
import { 
  AppRegistry,
  View,
  Text,
  TextInput,
  Image,
  Button,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';

import LoginScreen from './pages/login.js';
//import Loading from './mods/loading.js';

/*
{js代码}
{{js对象}}
<dom代码>
 */

//登录页
class MyAppGlobal extends Component {
  constructor(props){
    console.log('constructor');
    super(props);
    //组件私有属性
    this.state = {
      loginDisplay : 'none',
    }
    //修复组件方法,一般用不到
    //this.sendCaptcha = this.sendCaptcha.bind(this); 
    //this.doLogin = this.doLogin.bind(this);
    //this.storageToken = this.storageToken.bind(this);
  }
  render(){
    return (
      <View style={{position:'relative'}}>

        <Text>{this.state.loginDisplay}</Text>
        <Text>{}</Text>
        
        <Button
          onPress={() => {
            this.setState((preState)=>{
              var result = '';
              if(preState.loginDisplay === 'flex'){
                result = 'none';
              }else{
                result = 'flex';
              }
              return {
                loginDisplay: result
              }
              
            });
          }}
          title="登录"
        />

        <LoginScreen display={this.state.loginDisplay} onDisplayChange={(display)=>{
          this.setState({loginDisplay : (display==='none'?'flex':'none')})
        }} />

        <ActivityIndicator animating={true} color="red" style={{transform: [{scale: 0.2}],height:80,backgroundColor:'#fff',}} size="large"/>

      </View>
    )
  } 
}

AppRegistry.registerComponent('MyApp', () => MyAppGlobal);


