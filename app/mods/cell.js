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

export default class Cell extends React.Component {
  constructor(props){
    super(props);
    //组件私有属性
    this.state = {}
    //修复组件方法,一般用不到
    //this.sendCaptcha = this.sendCaptcha.bind(this); 
    //this.doLogin = this.doLogin.bind(this);
    //this.storageToken = this.storageToken.bind(this);
  }
  //组件对外共享属性
  static defaultProps = {}
  componentWillMount(){}

  render() {
    return (
      <View style={[globalStyle.cell,this.props.style]}>
        <View style={{flex:0}}>
          {this.props.children[0]}
        </View>
        <View style={{flex:1}}>
          {this.props.children[1]}
        </View>
        <View style={{flex:0}}>
          {this.props.children[2]}
        </View>
      </View>
    )
  }
  componentDidMount(){
    console.log('componentDidMount');
  }
}
