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
  Modal,
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

import Payment from '../tools/payment';

import { RadioButtons } from 'react-native-radio-buttons';


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

      currentOrder: {
        orderId: '',
        unPaidAmt: 0,
      },
      showPayType: false,
      payType: 'alipay',

      enumPayTypes: [
        {label:'支付宝支付', value:'alipay', logo:require('../images/alipay.png')},
        {label:'微信支付 ', value:'wechat_pay', logo:require('../images/wechat.png')},
        {label:'余额支付', value:'cp_pay', logo:require('../images/topup.png')},
      ],
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
              onPress={() => this.pay(obj)}>
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
          <View tabLabel='订单' style={{flex:1}}>
            {/* 回到顶部 */}
            <TouchableOpacity activeOpacity={1}
              style={{width:30,height:30,borderColor:'#fff',borderWidth:0.5,borderRadius:25,position:'absolute',right:20,bottom:20,zIndex:10,backgroundColor:'white'}}
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
          <View tabLabel='充值' style={{flex:1}}>
            {/* 回到顶部 */}
            <TouchableOpacity activeOpacity={1}
              style={{width:30,height:30,borderColor:'#fff',borderWidth:0.5,borderRadius:25,position:'absolute',right:20,bottom:20,zIndex:10,backgroundColor:'white'}}
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

        {/* 弹出框：选择支付方式 */}
        <Modal animationType={'fade'} transparent={true}
          visible={this.state.showPayType}
          onRequestClose={() => this.payNow()} >
          <View style={{flex:1, justifyContent:'flex-end', alignItems:'center', backgroundColor:'#80808090'}}>
            
            <View style={{flex:1,width:'100%'}} >
              <TouchableOpacity style={{flex:1,width:'100%'}} 
                onPress={()=>this.setState({showPayType:false})} />
            </View>

            <View style={{width:'100%', height:350, backgroundColor:'white', padding:20}}>
              <Text style={{fontSize:14, textAlign:'center'}}>需支付
                <Text style={{fontSize:50, color:'orange'}}>  {this.state.currentOrder.unPaidAmt}  </Text>
              元</Text>
              
              <View style={{borderColor:'#ddd', borderWidth:1, marginTop:20}} />

              <RadioButtons options={this.state.enumPayTypes}
                onSelection={(option) => this.setState({payType: option.value})}
                selectedOption={this.state.payType}
                renderOption={this.renderPayOption}
                renderContainer={this.renderPayContainer}
                extractText={(option) => option.label}
                testOptionEqual={(selectedValue, option) => selectedValue === option.value}
              />

              <Button style={[styles.rowButton, {marginTop:0}]} 
                onPress={() => this.payNow()}>
                <Text style={{color:'white',fontSize:16}}>立即支付</Text>
              </Button>
            </View>

          </View>
        </Modal>
      </View>
    );
  }
  
  componentDidMount() {
    console.log('orders.componentDidMount');
    this.detectLogin();
  }

  componentWillUnmount(){
    console.log('orders.componentWillUnmount');
    this.payment && this.payment.clear();
  }

  renderPayOption(option, selected, onSelect, index){
    return (
      <TouchableOpacity key={index} onPress={onSelect}>
        {/* add another View to fix error: Attempted to transition from state `RESPONDER_INACTIVE_PRESS_IN` to `RESPONDER_ACTIVE_LONG_PRESS_IN` */}
        <View style={{flexDirection:'row', margin:10, justifyContent:'space-between'}}>
          <View style={{flexDirection:'row', marginLeft:10}}>
            <Image source={option.logo} style={styles.icon} /> 
            <View style={{justifyContent:'center'}}>
              <Text style={[styles.rowText, {marginLeft:10, fontSize:16}]}>{option.label}</Text>
            </View>
          </View>

          <View style={{justifyContent:'center', marginRight:10}}>
            { selected &&
              <Image source={require('../images/checked.png')} style={styles.iconSmall} />
            }
            { !selected &&
              <Image source={require('../images/unchecked.png')} style={styles.iconSmall} />
            }
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderPayContainer(optionNodes){
    return <View style={{
      flexDirection:'column', 
      margin:10,
    }}>{optionNodes}</View>
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
        //for test only
        // allOrders.push({
        //   gmtCreate: '2017-10-11 20:30:31',
        //   goodsList: [],
        //   orderAmt: 300,
        //   orderDesc: 'test',
        //   orderId: 'testtest',
        //   orderType: '00',
        //   payTypeList: [],
        //   status: 'init',
        //   storeId: 'test',
        //   unPaidAmt: 99,
        //   userId: this.state.userId,
        // });
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

  pay(currentOrder){
    console.log('orders.pay: ');
    console.log(currentOrder);
    // 显示modal框让用户选择余额 or 支付宝 or 微信
    this.setState({
      currentOrder: currentOrder,
      showPayType: true,
    });
  }

  payNow(){
    console.log('orders.payNow');
    this.payment = new Payment();
    this.payment.pay(this.state.userId, this.state.currentOrder.orderId, this.state.payType);
    this.setState({showPayType: false});
  }

}
