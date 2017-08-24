import React from 'react';

import {
  AppRegistry,
  Text,
  View,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import styles from '../styles/global';
import theme from '../styles/theme';
import * as constants from '../tools/constants';
import format from 'string-format';
import Toast from '../tools/toast';

export default class OrderDetailScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      order: this.props.navigation.state.params.order,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: `订单详情`,
  });

  _extractKey(item, index){
    return item.goodsId;
  }

  render() {
    const order = this.state.order;
    return (
      <ScrollView>
        <View style={styles.cell}>
          <Text style={styles.rowText}>门店：{order.storeId}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.rowText}>日期：{order.gmtCreate}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.rowText}>金额：{order.orderAmt} 元</Text>
        </View>

        <View>
          <Text style={{color:'dodgerblue', margin:10, fontSize:18}}>商品列表：</Text>
          <FlatList
            data={order.goodsList}
            renderItem={({item}) =>
              <View style={styles.cell}>
                <Image
                  source={{uri: item.goodsPhotoUrl}}
                  style={styles.thumbnail}
                />
                <View style={{flexDirection:'column', marginLeft:10}}>
                  <Text style={styles.rowText}>{item.goodsName}</Text>
                  <Text style={[styles.rowText, {marginTop:10}]}>数量: {item.goodsNum}{item.goodsUnit}   |   价格: {item.goodsPrice}元</Text>
                </View>
              </View>
            }
            keyExtractor={this._extractKey}
          />
        </View>
      </ScrollView>
    );
  }

  componentDidMount(){
    console.log('orderDetail.componentDidMount');
    this.getOrderInfo();
  }

  async getOrderInfo(){
    try{
      let request = {
        orderId: this.state.order.orderId,
      };
      let url = format(constants.orderInfo, request);
      console.log('url: '+url);
      let response = await fetch(url);
      let resJson = await response.json();
      console.log(resJson);

      if(constants.SUCCESS === resJson.code){
        this.setState({order: resJson.data});
        // Toast.show('订单详情查询成功');
      }else{
        Toast.show('订单详情查询失败：'+resJson.message);
      }
    }catch(error){
      console.error(error);
    }
  }

}

var mystyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
    paddingBottom:10,
    paddingLeft:20,
    paddingRight:20,
    alignItems:'flex-start',
  },
  rightContainer: {
    flex: 1
  },
  desc: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft:5,
    //textAlign: 'left',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
  },
  thumbnail: {
    width: 80,
    height: 110,
    backgroundColor:'grey',
    marginRight:10,
  },
});