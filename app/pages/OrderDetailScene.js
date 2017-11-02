//首屏
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar, FlatList } from 'react-native'

import OrderItem from '../widget/OrderItem';

//首页场景元素
class OrderScene extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            data : {

            },
        };
    }

    static navigationOptions = ({ navigation }) => ({
        title: '订单详情',
        //headerStyle: { backgroundColor: '#fff' },
    })
    

    _onRefresh(){
        console.log('refresh')
    }

    keyExtractor(item: Object, index: number) {
        return Math.random();
    }

    render() {
        return (
            <ScrollView>
                <Text class="tip" style={{fontSize:11,lineHeight:30,paddingLeft:10,paddingRight:10,backgroundColor:'#f6ce9e',color:'#f65d0a'}} >关注微信公众号[xxx], 发送"我的订单"查看订单信息</Text>
                <View class="status" style={{backgroundColor:'#fff',flexDirection: 'row',alignItems:'center',paddingLeft:20,paddingRight:20,paddingTop:20,paddingBottom:30,}}>
                    <View class="step">
                        <View class="step-item">
                            <View class="step-item-radius" style={{position:'relative',marginBottom:5,width:24,height:24,borderWidth:3,borderColor:'#fffbb1',backgroundColor:'#fff200',borderRadius:12}}>
                                <View class="step-nike" style={{width:10,height:7,marginTop:4,marginLeft:4,borderWidth:2,borderColor:'black',borderRightWidth:0,borderTopWidth:0,transform:[{rotate:'-45deg'}]}}></View>
                                <Text style={{fontSize:12,width:60,textAlign:'center',color:'#999',position:'absolute',top:25,left:-20,backgroundColor:'transparent',}}>已扫码</Text>
                            </View>
                        </View>
                    </View>
                    <View class="line" style={{height:4,backgroundColor:'#fff200',flex:1,marginTop:-4}}></View>
                    <View class="step">
                        <View class="step-item">
                            <View class="step-item-radius" style={{position:'relative',marginBottom:5,width:24,height:24,borderWidth:3,borderColor:'#fffbb1',backgroundColor:'#fff200',borderRadius:12}}>
                                <View class="step-nike" style={{width:10,height:7,marginTop:4,marginLeft:4,borderWidth:2,borderColor:'black',borderRightWidth:0,borderTopWidth:0,transform:[{rotate:'-45deg'}]}}></View>
                                <Text style={{fontSize:12,width:60,textAlign:'center',color:'#999',position:'absolute',top:25,left:-20,backgroundColor:'transparent',}}>已支付</Text>
                            </View>
                        </View>
                    </View>
                    <View class="line" style={{height:4,backgroundColor:'#ccc',flex:1,marginTop:-4}}></View>
                    <View class="step">
                        <View class="step-item">
                            <View class="step-item-radius" style={{position:'relative',marginBottom:5,width:24,height:24,borderWidth:3,borderColor:'#eee',backgroundColor:'#ccc',borderRadius:12}}>
                                <Text style={{fontSize:12,width:60,textAlign:'center',color:'#999',position:'absolute',top:25,left:-20,backgroundColor:'transparent',}}>未作评价</Text>
                            </View>
                        </View>
                    </View>
                </View>

                
                <View class="shop" style={{marginTop:12,flexDirection: 'row',backgroundColor:'#fff',paddingLeft:20,paddingTop:10,paddingRight:20,paddingBottom:10,}}>
                    <Image source={require('../images/icon_buy.png')} style={{width:16,height:16,marginRight:5,}} />
                    <Text style={{color:'#666'}}>直营陆家嘴店</Text>
                </View>

                <View class="split" style={{borderLeftWidth:20,borderLeftColor:'#fff',height:1,backgroundColor:'#eee'}}></View>

                <View class="list" style={{backgroundColor:'#fff',paddingLeft:20,paddingRight:20,}}>
                    <View style={{flexDirection: 'row',marginBottom:10,marginTop:10,}}>
                        <Image source={require('../images/dazhaxie.jpg')} style={{width:64,flex:0,height:64,marginRight:10,}} />
                        <View class="middle" style={{flex:1,}}>
                            <Text style={{fontSize:14,color:'#666',marginBottom:5,}}>阳澄湖大闸蟹精品礼盒</Text>
                            <Text style={{fontSize:12,color:'#999',}}>8只装</Text>
                        </View>
                        <View class="right" style={{width:100,flex:0,}}>
                            <Text style={{textAlign:'right',}}>¥ 280</Text>
                            <Text style={{textAlign:'right',marginBottom:5,textDecorationLine:'line-through',color:'#999'}}>¥ 520</Text>
                            <Text style={{textAlign:'right'}}>×2</Text>
                        </View>
                    </View>

                    <View class="split" style={{borderLeftWidth:20,borderLeftColor:'#fff',height:1,backgroundColor:'#eee'}}></View>

                     <View style={{flexDirection: 'row',marginBottom:10,marginTop:10,}}>
                        <Image source={require('../images/dazhaxie.jpg')} style={{width:64,flex:0,height:64,marginRight:10,}} />
                        <View class="middle" style={{flex:1,}}>
                            <Text style={{fontSize:14,color:'#666',marginBottom:5,}}>阳澄湖大闸蟹精品礼盒</Text>
                            <Text style={{fontSize:12,color:'#999',}}>8只装</Text>
                        </View>
                        <View class="right" style={{width:100,flex:0,}}>
                            <Text style={{textAlign:'right',}}>¥ 280</Text>
                            <Text style={{textAlign:'right',marginBottom:5,textDecorationLine:'line-through',color:'#999'}}>¥ 520</Text>
                            <Text style={{textAlign:'right'}}>×2</Text>
                        </View>
                    </View>

                    <View class="split" style={{borderLeftWidth:20,borderLeftColor:'#fff',height:1,backgroundColor:'#eee'}}></View>

                     <View style={{flexDirection: 'row',marginBottom:10,marginTop:10,}}>
                        <Image source={require('../images/dazhaxie.jpg')} style={{width:64,flex:0,height:64,marginRight:10,}} />
                        <View class="middle" style={{flex:1,}}>
                            <Text style={{fontSize:14,color:'#666',marginBottom:5,}}>阳澄湖大闸蟹精品礼盒</Text>
                            <Text style={{fontSize:12,color:'#999',}}>8只装</Text>
                        </View>
                        <View class="right" style={{width:100,flex:0,}}>
                            <Text style={{textAlign:'right',}}>¥ 280</Text>
                            <Text style={{textAlign:'right',marginBottom:5,textDecorationLine:'line-through',color:'#999'}}>¥ 520</Text>
                            <Text style={{textAlign:'right'}}>×2</Text>
                        </View>
                    </View>

                </View>
                <View class="split" style={{borderLeftColor:'#fff',height:1,backgroundColor:'#eee'}}></View>

                <View class="shop" style={{flexDirection: 'row',alignItems:'center',backgroundColor:'#fff',paddingLeft:20,paddingTop:10,paddingRight:20,paddingBottom:10,}}>
                    <Text style={{color:'#666',marginRight:20}}>优惠</Text>
                    <Image source={require('../images/icon_mine_voucher.png')} style={{width:16,height:16,marginRight:5,}} />
                    <Text style={{color:'red',fontSize:12}}>满58立减50</Text>
                </View>

                <View class="shop" style={{marginTop:12,flexDirection: 'row',alignItems:'center',backgroundColor:'#fff',paddingLeft:20,paddingTop:10,paddingRight:20,paddingBottom:10,}}>
                    <Text style={{color:'#666',marginRight:20,flex:0,}}>实付</Text>
                    <Text style={{color:'#666',fontSize:24,flex:1,textAlign:'right',color:'orange'}}>¥1600</Text>
                </View>

                <View class="shop" style={{marginBottom:12,marginTop:12,backgroundColor:'#fff',padding:20,paddingBottom:10,}}>
                    <Text style={{marginBottom:8}}>订单信息</Text>
                    <Text style={{fontSize:13,color:'#999',marginBottom:2}}>订单号 : 12334343434223331</Text>
                    <Text style={{fontSize:13,color:'#999',marginBottom:2}}>支付方式 : 在线支付</Text>
                    <Text style={{fontSize:13,color:'#999',marginBottom:2}}>下单时间 : 2017-10-19 23:17:26</Text>
                </View>


            </ScrollView>
        )
    }
}

//make this component available to the app
export default OrderScene;



