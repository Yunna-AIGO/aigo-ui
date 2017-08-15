import  React, {Component} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    Button,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';
//检查窗口宽高
const { height, width } = Dimensions.get('window');

import globalStyle from '../styles/global.js';

export default class HistoryScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false, //刷新时报错 
        };
    }
    _renderItem = (obj) => {
        //obj = {index:0,item:{id:1,name:'yuxiao',xxx:3}}
        var item = obj.item||{};

        var payTime = (new Date(item.payTime).getMonth()+1)+'-'+new Date(item.payTime).getDate();

        var weekDay = new Date(item.payTime).getDay();

        weekDay = ['日','一','二','三','四','五','六'][weekDay];

        return (
            <TouchableOpacity onPress={() => {
                console.log(obj)
            } }>
                <View style={globalStyle.cell}>
                    <View style={{width:50,marginRight:10,}}>
                        <Text style={{textAlign:'center',marginBottom:5,}}>周{weekDay}</Text>
                        <Text style={{textAlign:'center'}}>{payTime}</Text>
                    </View>
                    <Image source={require('../images/store.png')} style={{width:30,height:30,marginRight:20}} />
                    <View>
                        <Text style={{marginBottom:5,fontSize:14,}}>{item.store}</Text>
                        <Text style={{fontWeight:'bold',}}>¥{item.price}</Text>
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
    _onRefresh() {
        console.log('正在刷新中.... ');
    }
    render() {
        var data = [];
        for (var i = 0; i < 31; i++) {
            data.push({ key: i, id: i, store : '我是一家商店', price: 120.00, orderTime:new Date().getTime(), payTime:new Date().getTime(), });
        }
        return (
            <View style={{ flex: 1 }}>

                <TouchableOpacity 
                    style={{width:30,height:30,borderColor:'#555',borderWidth:0.5,backgroundColor:'gold',borderRadius:25,position:'absolute',right:10,bottom:10,zIndex:10}}
                    onPress={() => {
                        //this._flatList.scrollToEnd();
                        //this._flatList.scrollToIndex({viewPosition:0,index:8});
                        this._flatList.scrollToOffset({ animated: true, offset: 0 });
                    }}
                >

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
                        ) }
                        onRefresh={this._onRefresh}
                        onEndReachedThreshold={0.1}
                        onEndReached={(info) => {
                            console.log("滑动到底部了");
                        } }

                        onViewableItemsChanged={(info) => {
                            //    alert("可见不可见触发");
                        } }
                        data={data}>
                    </FlatList>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    txt: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontSize: 30,
    }
});