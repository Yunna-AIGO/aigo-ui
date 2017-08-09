import  React, {Component} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    Button,
    Dimensions,
    TouchableOpacity
} from 'react-native';
//检查窗口宽高
const { height, width } = Dimensions.get('window');

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
        return (
            <TouchableOpacity onPress={() => {
                console.log(obj)
            } }>
                <View>
                    <Text>{item.store}</Text>
                    <Text>{item.price}</Text>
                    <Text>{item.payTime}</Text>
                    <Text>{item.orderTime}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    _header = () => {
        return <Text style={{textAlign:'center',lineHeight:50,fontSize:12}}>下拉刷新</Text>;
    }

    _footer = () => {
        return <Text style={{textAlign:'center',lineHeight:50,fontSize:12}}>到底了</Text>;
    }
    _separator = () => {
        return <View style={{ height: 1, backgroundColor: '#999' }}/>;
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
                    style={{width:50,height:50,borderColor:'#555',borderWidth:1,backgroundColor:'gold',borderRadius:25,position:'absolute',right:10,bottom:10,zIndex:10}}
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


module.exports = HistoryScreen;