import React from 'react';

import {
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  StatusBar,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { color, NavigationItem, SearchBar, SpacingView } from '../widget'

import MyButton from '../mods/myButton';

import Storage from '../tools/storage';

import QRCode from 'react-native-qrcode';

import theme from '../styles/theme';

import * as constants from '../tools/constants';

import format from 'string-format';

import Toast from '../tools/toast';

let that;
export default class QrCodeScreen extends React.Component {
  constructor(props) {
    super(props);
    that = this;
    this.state = {
      currentPage: 0,

      qrcode : '',
      // loginVisible: false,
      phoneNo : '',
      phoneNoReady : false,
      captcha : '',
      captchaReady : false,
      loginBtnReady : false,

      userName : '123',
      userId: '',
      token: '',
    };

    this.timer = null;
  }

  static navigationOptions = ({ navigation }) => ({
        title: '扫一扫',
        // headerTitle: (
        //     <TouchableOpacity>
        //         <Text style={{color:'#fff',fontSize:16}}>扫一扫</Text>
        //     </TouchableOpacity>
        // ),
        // headerRight: (
        //     <NavigationItem
        //         icon={require('../images/scanning.png')}
        //         onPress={() => {
        //             alert(this)
        //         }}
        //     />
        // ),
        // headerLeft: (
        //     <NavigationItem
        //         title='登录'
        //         titleStyle={{ color: '#fff' }}
        //         onPress={() => {
        //             that.showLogin();
        //         }}
        //     />
        // ),
        // headerStyle: { backgroundColor: theme.orange, borderColor:'#fff',},
  })

  onScroll(e: any) {
    //scroll的唯一目的竟然是获取更改currentPage
    let x = e.nativeEvent.contentOffset.x
    let currentPage = Math.round(x / 375)

    console.log('onScroll  ' + e.nativeEvent.contentOffset.x + '  page ' + currentPage + '  current ' + this.state.currentPage)
    if (this.state.currentPage != currentPage) {
      this.setState({
        currentPage: currentPage
      })
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        <View style={{height:200, position:'relative'}}>
          <ScrollView horizontal
            contentContainerStyle={styles.contentContainer}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onScroll={(e)=>this.onScroll(e)}>
            <View style={styles.menuContainer}>
              <View style={styles.itemsView}>
                <Image 
                style={{width:'100%',maxHeight:200}}
                source={require('../images/slider_1.jpeg')} />
              </View>
              <View style={styles.itemsView}>
                <Image
                  style={{width:'100%',maxHeight:200}}
                  source={require('../images/slider_2.jpeg')} />
              </View>
               <View style={styles.itemsView}>
                <Image 
                  style={{width:'100%',maxHeight:200}}
                  source={require('../images/slider_3.jpeg')} />
              </View>
            </View>
          </ScrollView>

          <View style={{position:'absolute',bottom:0,left:0,right:0,flexDirection:'row',justifyContent:'center', alignItems:'center',}}>
            <View style={{width:10,height:10,margin:5,borderRadius:5,backgroundColor:this.state.currentPage==0?'gold':'#fff'}}></View>
            <View style={{width:10,height:10,margin:5,borderRadius:5,backgroundColor:this.state.currentPage==1?'gold':'#fff'}}></View>
            <View style={{width:10,height:10,margin:5,borderRadius:5,backgroundColor:this.state.currentPage==2?'gold':'#fff'}}></View>
          </View>
        </View>

        <View style={{flex:1, backgroundColor:'#fff'}}>
          <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <View style={{width:160, height:160, transform:[{rotate:'45deg'}]}}>
              <TouchableOpacity 
                onPress={()=>{
                  this.getQrCode();
                }} >
                  <QRCode
                    value={this.state.qrcode}
                    size={160}
                    bgColor='#333'
                    fgColor='#fff'
                  />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text style={{textAlign:'center',fontWeight:'bold',marginBottom:5,color:'#999'}}>欢迎光临</Text>
            <Text style={{textAlign:'center',color:'#999',fontSize:12,marginBottom:10,}}>请扫二维码进店</Text>
          </View>

        </View>
      </View>
    )
  }

  componentWillMount(){
    console.log('qrcode.componentWillMount');
    StatusBar.setBarStyle('light-content');
  }

  componentDidMount(){
    console.log('qrcode.componentDidMount');
    this.detectLogin();
  }

  componentWillUnmount(){
    console.log('qrcode.componentWillUnmount');
    this.timer && clearInterval(this.timer);
  }

  async detectLogin(){
    console.log('detectLogin');
    let userId = await Storage.get('userId');
    let token = await Storage.get('token');

    if(!userId || !token){
      this.props.navigation.navigate('Login',{
        //跳转的时候携带一个参数去下个页面
        callback: (data)=>{
          //console.log(data); //回调入参
          if(data==='reload'){
            this.getQrCode();
          }
        },
      });
    }else{
      this.getQrCode();
      this.timer = setInterval(()=>this.getQrCode(), 60 * 1000);
    }
  }

  async getQrCode(){
    try{
      console.log('qrCode.getQrCode');
      let userId = this.state.userId;
      let token = this.state.token;

      if(!userId || !token){
        userId = await Storage.get('userId');
        token = await Storage.get('token');

        if(!userId || !token) {
          console.log('getQrCode: can not get userId or token');
          return;
        }

        this.setState({
          userId: userId,
          token: token,
        });
      }

      let request = {
        userId: userId,
        token: token,
      };
      console.log(constants.qrcode);
      let response = await fetch(constants.qrcode, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(request),
      });
      let resJson = await response.json();
      console.log(resJson);

      if(resJson.code === constants.SUCCESS){
        this.setState({qrcode: resJson.data.entryUrl});
      }else{
        Toast.show('获取二维码失败: '+resJson.message);
      }
    }catch(error){
      console.error(error);
    }
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  contentContainer: {
  },
  menuContainer: {
    flexDirection: 'row',
  },
  itemsView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 375,
  },
  pageControl: {
    margin: 10,
  }
});
