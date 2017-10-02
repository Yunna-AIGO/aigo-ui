import React from 'react';

import {
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';

import { Heading1, Heading2, Paragraph } from '../widget/Text.js';

import { color, NavigationItem, SearchBar, SpacingView } from '../widget'

import { screen, system } from '../common';

import Toast from '../tools/toast';

import Storage from '../tools/storage';

import format from 'string-format';

import * as constants from '../tools/constants';

export default class UserCenterScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title : '个人中心',
    // headerRight: (
    //     <NavigationItem
    //         title='消息'
    //         titleStyle={{ color: '#333' }}
    //         onPress={() => {
                
    //         }}
    //     />
    // ),
    // headerStyle: { backgroundColor: '#fff' },
  })

  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      token: '',
      userInfo: {
        nickName: '',
        mobile: '',
        picUrl: '',
      },
    };
  }

  render() {
    let name = '';
    if(this.state.userInfo != null){
      name = this.state.userInfo.nickName || this.state.userInfo.mobile || '未登录';
    }else{
      name = '未登录';
    }
    return (
      <View>
        <View style={globalStyle.card}>
          <View style={[globalStyle.avatar,{marginBottom:10}]}>
            <Image source={require('../images/fire.png')} style={{flex:1,width:'100%',borderRadius:20}}/>
          </View>
          <Text>{name}</Text>
        </View>

        <TouchableOpacity style={globalStyle.cell} 
          onPress={
            ()=>{
              this.props.navigation.navigate('UserDetail',{
                userInfo: this.state.userInfo,
                //跳转的时候携带一个参数去下个页面
                callback: (data)=>{
                  //console.log(data); //回调入参
                  if(data==='reload'){
                    this.getUserInfo();
                  }
                },
              })
            }
          }
        >
          <Image source={require('../images/star.png')} 
            style={{width:20,height:20,marginRight:20,flex:0,tintColor:'tomato'}}></Image>
          <Text style={{flex:1,fontSize:16}}>个人信息</Text>
        </TouchableOpacity>

        <TouchableOpacity style={globalStyle.cell} onPress={
          ()=>{
            this.props.navigation.navigate('Wallet', {userId: this.state.userId})
          }
        }
        >
          <Image source={require('../images/wallet.png')} style={{width:20,height:20,marginRight:20,flex:0,}}></Image>
          <Text style={{flex:1,fontSize:16,}}>我的钱包</Text>
        </TouchableOpacity>

        <TouchableOpacity style={globalStyle.cell} onPress={
          ()=>{
            this.props.navigation.navigate('Message')
          }
        }
        >
          <Image source={require('../images/message.png')} 
            style={{width:20,height:20,marginRight:20,flex:0,tintColor:'dodgerblue'}}></Image>
          <Text style={{flex:1,fontSize:16,}}>消息中心</Text>
        </TouchableOpacity>

        <TouchableOpacity style={globalStyle.cell} onPress={
          ()=>{
            this.props.navigation.navigate('Setting')
          }
        }
        >
          <Image source={require('../images/set.png')} 
            style={{width:20,height:20,marginRight:20,flex:0,tintColor:'#999'}}></Image>
          <Text style={{flex:1,fontSize:16,}}>设置</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[globalStyle.cell,{marginTop:20,}]} onPress={()=>this.logout()}>
          <Image source={require('../images/logout.png')} style={{width:20,height:20,marginRight:20,flex:0,}}></Image>
          <Text style={{flex:1,fontSize:16,color:'red'}}>退出账户</Text>
        </TouchableOpacity>

      </View>
    )
  }

  componentWillMount(){
    console.log('个人中心componentWillMount');
  }

  componentDidMount(){
    console.log('个人中心componentDidMount');
    this.detectLogin();
  }

  async detectLogin(){
    let userId = await Storage.get('userId');
    let token = await Storage.get('token');

    if(!userId || !token){
      // this.showLogin();
    }else{
      this.setState({
        userId: userId,
        token: token,
      });
      this.getUserInfo();
    }
  }

  async getUserInfo(){
    try{
      let url = format(constants.userInfo, {userId: this.state.userId});
      console.log('url: '+url);
      let response = await fetch(url);
      let resJson = await response.json();
      console.log(resJson);
      this.setState({userInfo: resJson.userInfo});
    }catch(error){
      console.error(error);
    }
  }

  logout(){
    Alert.alert('提示', '确认退出登录？', [
      {text:'取消', onPress:()=>console.log('cancel'), style:'cancel'},
      {text:'确定', onPress:()=>{
        // Storage.delete('userId');
        Storage.delete('token');
        Toast.show('已成功退出！');
        this.props.navigation.navigate('Login',{
          //跳转的时候携带一个参数去下个页面
          callback: (data)=>{
            //console.log(data); //回调入参
            if(data==='reload'){
              this.getQrCode();
            }
          },
        });
      }},
    ]);
  }

}


// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background
    },
    recommendHeader: {
        height: 35,
        justifyContent: 'center',
        borderWidth: screen.onePixel,
        borderColor: color.border,
        paddingVertical: 8,
        paddingLeft: 20,
        backgroundColor: 'white'
    },
    searchBar: {
        width: screen.width * 0.7,
        height: 30,
        borderRadius: 19,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        alignSelf: 'center',
    },
    searchIcon: {
        width: 20,
        height: 20,
        margin: 5,
    }
});


