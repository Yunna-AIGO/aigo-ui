import React ,{Component } from 'react';

import {
  AppRegistry,
  Text,
  View,
  Image,
  ListView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { Heading1, Heading2, Paragraph } from '../widget/Text.js';

import { color, NavigationItem, SearchBar, SpacingView } from '../widget'

import { screen, system } from '../common';

import Storage from '../tools/storage';

import styles from '../styles/global.js';

import theme from '../styles/theme';

import * as constants from '../tools/constants';

import format from 'string-format';

import Toast from '../tools/toast';

import moment from 'moment';

import {OrderStatus, OrderType} from '../tools/enums';

import Button from 'apsl-react-native-button';

import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';

import _ from 'underscore';


export default class OrdersScreen extends Component {
  //类构造函数
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false, //刷新时报错 
      userId: '',
      orders: [],
      topups: [],

      pageNum: 0,
      pageSize: 100,
    };
  }

  static navigationOptions = {
    title: '我的订单',
  }

  _renderItem = (row) => {
    let obj = row.item;
    let {navigate} = this.props.navigation;
    let date = moment(obj.gmtCreate);
    let dateDesc = date.format('M-D');
    let weekDay = ['日','一','二','三','四','五','六'][date.day()];

    let pendingList = ['init', 'timeout'];
    let show = pendingList.indexOf(obj.status) >= 0;

    return (
      <TouchableOpacity onPress={() => {
        console.log(obj);
        navigate('OrderDetail', {order:obj});
      }}>
        <View style={[styles.cell, styles.spaceBetween]}>
          <View style={{flexDirection:'row'}}>
            <View style={{width:50,marginRight:10,}}>
              <Text style={{textAlign:'center',marginBottom:5,}}>周{weekDay}</Text>
              <Text style={{textAlign:'center'}}>{dateDesc}</Text>
            </View>
            <Image source={require('../images/store.png')} style={{width:30,height:30,marginRight:20,}} />
            <View>
              <Text style={{marginBottom:5,fontSize:14,}}>云店{obj.storeId}</Text>
              <Text style={{fontWeight:'bold',}}>¥{obj.orderAmt}</Text>
            </View>
          </View>
          { show && obj.orderType === OrderType.CONSUME &&
            <Button style={{width:70, height:25, borderRadius:10, backgroundColor:'orange', borderColor:theme.lightgrey}} 
              onPress={() => this.pay(obj.orderId)}>
              <Text style={{fontSize:14, color:'white'}}>去支付</Text>
            </Button>
          }
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
  
  render() {
    return (
      <View style={{ flex: 1 }}>
        

        <ScrollableTabView style={{height:100}}
          scrollWithoutAnimation={true}
          tabBarActiveTextColor={theme.orange}
          tabBarUnderlineStyle={{backgroundColor:theme.orange}}
        >
          <View tabLabel='订单' style={{ flex: 1 }}>
            {/* 回到顶部 */}
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

            <FlatList
              ref={
                (flatList) => {
                  this._flatList = flatList
                }
              }
              // ListHeaderComponent={this._header}
              // ListFooterComponent={this._footer}
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
          <View tabLabel='充值'>
            {/* 回到顶部 */}
            <TouchableOpacity activeOpacity={1}
              style={{width:30,height:30,borderColor:'#555',borderWidth:0.5,borderRadius:25,position:'absolute',right:10,bottom:10,zIndex:10,backgroundColor:'white'}}
              onPress={() => {
                //this._flatList.scrollToEnd();
                //this._flatList.scrollToIndex({viewPosition:0,index:8});
                this._flatList1.scrollToOffset({ animated: true, offset: 0 });
              }}
            >
              <Image source={require('../images/less.png')} style={{width:30, height:30}}/>
            </TouchableOpacity>

            <FlatList
              ref={
                (flatList) => {
                  this._flatList1 = flatList
                }
              }
              // ListHeaderComponent={this._header}
              // ListFooterComponent={this._footer}
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
              data={this.state.topups}
              keyExtractor={this._extractKey}>
            </FlatList>
          </View>
        </ScrollableTabView>

      </View>
    );
  }
  
  componentDidMount() {
    console.log('orders.componentDidMount');
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
        let allOrders = resJson.data;
        this.setState({orders: _.where(allOrders, {orderType: OrderType.CONSUME})});
        this.setState({topups: _.where(allOrders, {orderType: OrderType.RECHARGE})});
        Toast.show('订单查询成功');
      }else{
        Toast.show('订单查询失败：'+resJson.message);
      }
    }catch(error){
      console.error(error);
    }
    this.setState({refreshing: false});
  }

  pay(orderId){
    console.log('orders.pay: '+orderId);
  }

}
