import React from 'react';

import {
  AppRegistry,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native';


import { Heading1, Heading2, Paragraph } from '../widget/Text.js';

import { color, NavigationItem, SearchBar, SpacingView } from '../widget'

import { screen, system } from '../common';


export default class UserCenterScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
        title : '个人中心',
        headerRight: (
            <NavigationItem
                title='消息'
                titleStyle={{ color: '#333' }}
                onPress={() => {
                    
                }}
            />
        ),
        headerStyle: { backgroundColor: '#fff' },
    })

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
            <Image source={require('../images/diao.jpg')} style={{flex:1,width:'100%',borderRadius:20}}/>
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
          <Image source={require('../images/account.png')} style={{width:20,height:20,marginRight:20,flex:0,}}></Image>
          <Text style={{flex:1,fontSize:16,}}>个人信息</Text>
        </TouchableOpacity>

        <TouchableOpacity style={globalStyle.cell} onPress={
          ()=>{
            this.props.navigation.navigate('Wallet')
          }
        }
        >
          <Image source={require('../images/wallet.png')} style={{width:20,height:20,marginRight:20,flex:0,}}></Image>
          <Text style={{flex:1,fontSize:16,}}>我的钱包</Text>
        </TouchableOpacity>

        <TouchableOpacity style={globalStyle.cell} onPress={
          ()=>{
            this.props.navigation.navigate('Setting')
          }
        }
        >
          <Image source={require('../images/set.png')} style={{width:20,height:20,marginRight:20,flex:0,}}></Image>
          <Text style={{flex:1,fontSize:16,}}>设置</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[globalStyle.cell,{marginTop:20,}]}>
          <Image style={{width:20,height:20,marginRight:20,flex:0,}}></Image>
          <Text style={{flex:1,fontSize:16,color:'red'}}>退出账户</Text>
        </TouchableOpacity>

      </View>
    )
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


