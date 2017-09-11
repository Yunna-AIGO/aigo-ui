import React from 'react';

import {
  AppRegistry,
  Text,
  View,
  Button,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

import Cell from '../mods/cell.js';

import Toast from '../tools/toast';

import Storage from '../tools/storage';

import format from 'string-format';

import * as constants from '../tools/constants';

let that;
export default class UserDetailScreen extends React.Component {
  constructor(props){
    super(props);
    that = this;
    //组件私有属性
    this.state = {
      userInfo: this.props.navigation.state.params.userInfo,
    }
  }

  static navigationOptions = {
    title: '个人信息',
    headerRight: <Button title="保存" onPress={()=>{
      that.doSave();   
    }} />,
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <Cell>
          <Text style={{marginRight:16,fontSize:16,width:60,}}>手机号</Text>
          <TextInput 
            style={{height:20,fontSize:16,color:'#999'}} 
            value={this.state.userInfo.mobile}
            onChangeText={(text)=>this.doSetState('mobile', text)}>
          </TextInput>
        </Cell>
        <Cell>
          <Text style={{marginRight:16,fontSize:16,width:60,}}>昵称</Text>
          <TextInput 
            style={{height:20,fontSize:16,color:'#999'}} 
            value={this.state.userInfo.nickName}
            onChangeText={(text)=>this.doSetState('nickName', text)}>
          </TextInput>
        </Cell>
        <Cell style={{marginTop:20,}}>
          <Text style={{marginRight:16,fontSize:16,width:60,}}>邮箱</Text>
          <TextInput 
            style={{height:20,fontSize:16,color:'#999'}} 
            value={this.state.userInfo.email}
            onChangeText={(text)=>this.doSetState('email', text)}>
          </TextInput>
        </Cell>
        <Cell>
          <Text style={{marginRight:16,fontSize:16,width:70,}}>真实姓名</Text>
          <TextInput 
            style={{height:20,fontSize:16,color:'#999'}} 
            value={this.state.userInfo.realName}
            onChangeText={(text)=>this.doSetState('realName', text)}>
          </TextInput>
        </Cell>
        <Cell>
          <Text style={{marginRight:16,fontSize:16,width:70,}}>证件类型</Text>
          <TextInput 
            style={{height:20,fontSize:16,color:'#999'}} 
            value={this.state.userInfo.identityType}
            onChangeText={(text)=>this.doSetState('identityType', text)}>
          </TextInput>
        </Cell>
        <Cell>
          <Text style={{marginRight:16,fontSize:16,width:70,}}>证件号</Text>
          <TextInput 
            style={{height:20,fontSize:16,color:'#999'}} 
            value={this.state.userInfo.identityId}
            onChangeText={(text)=>this.doSetState('identityId', text)}>
          </TextInput>
        </Cell>
      </KeyboardAvoidingView>
    );
  }

  async doSave(){
    try{
      let request = {
        userId: this.state.userInfo.userId,
        mobile: this.state.userInfo.mobile,
        nickName: this.state.userInfo.nickName,
      }
      let url = format(constants.userModify, request);
      console.log(url);
      let response = await fetch(url, {method: 'POST'});
      console.log(response);
      let resJson = await response.json();
      console.log(resJson);
      if(constants.SUCCESS === resJson.code){
        Toast.show('保存成功');
        const {navigate,goBack,state} = this.props.navigation;
        // 在第二个页面,在goBack之前,将上个页面的方法取到,并回传参数,这样回传的参数会重走render方法
        state.params.callback('reload');
        goBack();
      }else{
        Toast.show('保存失败：'+resJson.message);
      }
    }catch(error){
      console.error(error);
    }
  }

  doSetState(propName, value){
    let user = this.state.userInfo;
    user[propName] = value;
    this.setState({userInfo:user});
  }
}

