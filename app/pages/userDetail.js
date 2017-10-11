import React from 'react';

import {
  AppRegistry,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

import Cell from '../mods/cell.js';

import Toast from '../tools/toast';

import Storage from '../tools/storage';

import format from 'string-format';

import * as constants from '../tools/constants';

// import Button from '../widget/Button';

import Button from 'apsl-react-native-button';

import styles from '../styles/global';

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
    // headerRight: <Button title="编辑" onPress={()=>{
    //   that.doSave();   
    // }} />,
  }

  render() {
    return (
      <View>
        <View style={[styles.cell, {height:60}]}>
          <Text style={{marginRight:16,fontSize:16,width:70,color:'#999'}}>手机号</Text>
          <TextInput 
            style={{height: 50,flex:1,fontSize:16,}} 
            value={this.state.userInfo.mobile}
            onChangeText={(text)=>this.doSetState('mobile', text)}>
          </TextInput>
        </View>
        <View style={[styles.cell, {height:60}]}>
          <Text style={{marginRight:16,fontSize:16,width:70,color:'#999'}}>昵称</Text>
          <TextInput 
            style={{height: 50,flex:1,fontSize:16}} 
            value={this.state.userInfo.nickName}
            onChangeText={(text)=>this.doSetState('nickName', text)}>
          </TextInput>
        </View>
        <View style={[styles.cell, {height:60}]}>
          <Text style={{marginRight:16,fontSize:16,width:70,color:'#999'}}>邮箱</Text>
          <TextInput 
            style={{height: 50,flex:1,fontSize:16}} 
            value={this.state.userInfo.email}
            onChangeText={(text)=>this.doSetState('email', text)}>
          </TextInput>
        </View>
        <View style={[styles.cell, {height:60}]}>
          <Text style={{marginRight:16,fontSize:16,width:70,color:'#999'}}>姓名</Text>
          <TextInput 
            style={{height: 50,flex:1,fontSize:16}} 
            value={this.state.userInfo.realName}
            onChangeText={(text)=>this.doSetState('realName', text)}>
          </TextInput>
        </View>
        <View style={[styles.cell, {height:60}]}>
          <Text style={{marginRight:16,fontSize:16,width:75,color:'#999'}}>证件类型</Text>
          <TextInput 
            style={{height: 50,flex:1,fontSize:16}} 
            value={this.state.userInfo.identityType}
            onChangeText={(text)=>this.doSetState('identityType', text)}>
          </TextInput>
        </View>
        <View style={[styles.cell, {height:60}]}>
          <Text style={{marginRight:16,fontSize:16,width:70,color:'#999'}}>证件号</Text>
          <TextInput 
            style={{height: 50,flex:1,fontSize:16}} 
            value={this.state.userInfo.identityId}
            onChangeText={(text)=>this.doSetState('identityId', text)}>
          </TextInput>
        </View>

        <Button style={[styles.rowButton, {marginTop:15}]} 
          onPress={() => {
            const {navigate,goBack,state} = this.props.navigation;
            // 在第二个页面,在goBack之前,将上个页面的方法取到,并回传参数,这样回传的参数会重走render方法
            state.params.callback('reload');
            goBack();
          }}>
          <Text style={{color:'white',fontSize:16}}>确定</Text>
        </Button>
      </View>
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

