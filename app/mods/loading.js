import React from 'react';

import {
  AppRegistry,
  Text,
  TextInput,
  View,
  Button,
  Image,
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

export default class Loading extends React.Component {
  constructor(props){
    console.log('constructor');
    super(props);
    //组件私有属性
    this.state = {
    }
    //修复组件方法,一般用不到
    //this.sendCaptcha = this.sendCaptcha.bind(this); 
    //this.doLogin = this.doLogin.bind(this);
    //this.storageToken = this.storageToken.bind(this);
  }
  //组件对外共享属性
  static defaultProps = {
        display: 'flex', //接收外部参数
  }
  componentWillMount(){
    console.log('componentWillMount');
  } 
  render() {
    console.log('render');
    return (
      <View style={{display:this.props.display,position:'absolute',left:0,top:0,width:'100%',
      height:675,backgroundColor:'rgba(0,0,0,0.5)',alignItems: 'center',justifyContent:'center',}}>
         <Image
            source={require('../images/book.png')}
            style={[{width: 50},{height:50}]}
        />

      </View>
    )
  }
  componentDidMount(){
    console.log('componentDidMount');
  }
}
