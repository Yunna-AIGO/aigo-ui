import React ,{Component } from 'react';

import {
  AppRegistry,
  Text,
  View,
  Button,
  Image,
  ListView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from 'react-native';

import { Heading1, Heading2, Paragraph } from '../widget/Text.js';

import { color, NavigationItem, SearchBar, SpacingView } from '../widget'

import { screen, system } from '../common';

// import HistoryScreen from './history.js';

import Storage from '../tools/storage';

import globalStyle from '../styles/global.js';

import * as constants from '../tools/constants';

import format from 'string-format';

import Toast from '../tools/toast';


export default class OrdersScreen extends Component {
  //类构造函数
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false, //刷新时报错 
      userId: '',
      orders: [],

      pageNum: 1,
      pageSize: 10,
    };
  }

  static navigationOptions = {
    title: '我的订单',
  }

  _renderItem = (row) => {
    let obj = row.item;
    let {navigate} = this.props.navigation;
    let date = new Date(obj.gmtCreate);
    let dateDesc = (date.getMonth()+1)+'-'+date.getDate();
    let weekDay = ['日','一','二','三','四','五','六'][date.getDay()];

    return (
      <TouchableOpacity onPress={() => {
        console.log(obj);
        navigate('OrderDetail', {order:obj});
      }}>
        <View style={globalStyle.cell}>
          <View style={{width:50,marginRight:10,}}>
            <Text style={{textAlign:'center',marginBottom:5,}}>周{weekDay}</Text>
            <Text style={{textAlign:'center'}}>{dateDesc}</Text>
          </View>
          <Image source={require('../images/store.png')} style={{width:30,height:30,marginRight:20,}} />
          <View>
            <Text style={{marginBottom:5,fontSize:14,}}>{obj.storeId}</Text>
            <Text style={{fontWeight:'bold',}}>¥{obj.orderAmt}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  _header = () => {
    return <Text style={{textAlign:'center',lineHeight:40,fontSize:12}}>下拉刷新</Text>;
  }
  _footer = () => {
    return <Text style={{textAlign:'center',lineHeight:40,fontSize:12}}>到底了</Text>;
  }
  _separator = () => {
    return <View style={{ height: 0, backgroundColor: '#eee' }}/>;
  }
  _extractKey(item, index){
    return item.orderId;
  }
  // _onRefresh() {
  //   console.log('正在刷新中.... ');
  //   this.getOrders();
  // }
  render() {
    // var data = [];
    // for (var i = 0; i < 31; i++) {
    //   data.push({ key: i, id: i, store : '我是一家商店', price: 120.00, orderTime:new Date().getTime(), gmtCreate:new Date().getTime(), });
    // }
    return (
      <View style={{ flex: 1 }}>

        <TouchableOpacity activeOpacity={1}
          style={{width:30,height:30,borderColor:'#555',borderWidth:0.5,borderRadius:25,position:'absolute',right:10,bottom:10,zIndex:10,backgroundColor:'white'}}
          onPress={() => {
            //this._flatList.scrollToEnd();
            //this._flatList.scrollToIndex({viewPosition:0,index:8});
            this._flatList.scrollToOffset({ animated: true, offset: 0 });
          }}
        >
          <Image source={require('../images/less.png')} style={{width:30, height:30}}/>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <FlatList
            ref={
              (flatList) => {
                this._flatList = flatList
              }
            }
            ListHeaderComponent={this._header}
            ListFooterComponent={this._footer}
            ItemSeparatorComponent={this._separator}
            renderItem={this._renderItem}

            numColumns ={1}
    
            refreshing={this.state.refreshing}
            getItemLayout={(data, index) => (
              { length: 10, offset: (10 + 2) * index, index }
            )}
            onRefresh={() => this.getOrders()}
            onEndReachedThreshold={0.1}
            onEndReached={(info) => {
              console.log("滑动到底部了");
            } }

            onViewableItemsChanged={(info) => {
              //    alert("可见不可见触发");
            } }
            data={this.state.orders}
            keyExtractor={this._extractKey}>
          </FlatList>
        </View>
      </View>
    );
  }
  
  componentDidMount() {
    console.log('orders.componentDidMount');
    StatusBar.setBarStyle('dark-content');
    this.detectLogin();
  }

  async detectLogin(){
    console.log('detectLogin');
    let userId = await Storage.get('userId');
    let token = await Storage.get('token');

    if(!userId || !token){
      // this.showLogin();
      //TODO: 跳转到全局login页面
    }else{
      this.setState({
        userId: userId,
      });
      this.getOrders();
    }
  }

  async getOrders(){
    this.setState({refreshing: true});
    try{
      let request = {
        userId: this.state.userId,
        pageNum: this.state.pageNum,
        pageSize: this.state.pageSize,
      };
      let url = format(constants.orders, request);
      console.log('url: '+url);
      let response = await fetch(url);
      let resJson = await response.json();
      console.log(resJson);

      if(constants.SUCCESS === resJson.code){
        this.setState({orders: resJson.data});
        Toast.show('订单查询成功');
      }else{
        Toast.show('订单查询失败：'+resJson.message);
      }
    }catch(error){
      console.error(error);
    }
    this.setState({refreshing: false});
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingBottom:10,
    paddingLeft:20,
    paddingRight:20,
    alignItems:'flex-start',
  },
  rightContainer: {
    flex: 1,

  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'left',
  },
  year: {
    textAlign: 'left',
  },
  thumbnail: {
    width: 80,
    height: 110,
    backgroundColor:'grey',
    marginRight:10,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
    borderColor:'red',
    borderWidth:1,
    paddingBottom:50,
  },
});
