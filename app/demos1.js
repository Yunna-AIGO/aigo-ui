//  一个比较标准的模块
'use strict';
//模块依赖
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  Navigator,
  TextInput,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

// 类
export default class HomePage extends Component {
  // 构造函数
  constructor(props) {
    //必须
    super(props);
    //data
    this.state = {
      show:false,
    };
  }

  // 加载完成
  componentDidMount(){
    //mount/created
  }

  // view卸载
  componentWillUnmount(){
    //
  }

  // 自定义方法区域
  // method
  _leftButtonClick() {

  }
  _rightButtonClick() {
    //
    console.log('右侧按钮点击了');
    this._setModalVisible();
  }

  // 显示/隐藏 modal
  _setModalVisible() {
    let isShow = this.state.show;
    //修改state
    this.setState({
      show:!isShow,
    });
  }

  // 绘制View
  render() {
     return (
       <View style={styles.container}>
         <NavigatorBar
           title='Modal测试'
           titleTextColor='#F2380A'
           rightItemTitle='按钮'
           rightTextColor='#F2380A'
           rightItemFunc={this._rightButtonClick.bind(this)} />
         <Modal
           animationType='slide'
           transparent={true}
           visible={this.state.show}
           onShow={() => {}}
           onRequestClose={() => {}} >
           <View style={styles.modalStyle}>
             <View style={styles.subView}>
               <Text style={styles.titleText}>
                 提示
               </Text>
               <Text style={styles.contentText}>
                 Modal显示的View 多行了超出一行了会怎么显示，就像这样显示了很多内容该怎么显示，看看效果
               </Text>
               <View style={styles.horizontalLine} />
               <View style={styles.buttonView}>
                 <TouchableHighlight underlayColor='transparent'
                   style={styles.buttonStyle}
                   onPress={this._setModalVisible.bind(this)}>
                   <Text style={styles.buttonText}>
                     取消
                   </Text>
                 </TouchableHighlight>
                 <View style={styles.verticalLine} />
                 <TouchableHighlight underlayColor='transparent'
                   style={styles.buttonStyle}
                   onPress={this._setModalVisible.bind(this)}>
                   <Text style={styles.buttonText}>
                     确定
                   </Text>
                 </TouchableHighlight>
               </View>
             </View>
           </View>
        </Modal>
       </View>
     );
  }

}
// Modal属性
// 1.animationType bool  控制是否带有动画效果
// 2.onRequestClose  Platform.OS==='android'? PropTypes.func.isRequired : PropTypes.func
// 3.onShow function方法
// 4.transparent bool  控制是否带有透明效果
// 5.visible  bool 控制是否显示

// css样式
var styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#ECECF0',
  },
  // modal的样式
  modalStyle: {
    // backgroundColor:'#ccc',
    alignItems: 'center',
    justifyContent:'center',
    flex:1,
  },
  // modal上子View的样式
  subView:{
    marginLeft:60,
    marginRight:60,
    backgroundColor:'#fff',
    alignSelf: 'stretch',
    justifyContent:'center',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor:'#ccc',
  },
  // 标题
  titleText:{
    marginTop:10,
    marginBottom:5,
    fontSize:16,
    fontWeight:'bold',
    textAlign:'center',
  },
  // 内容
  contentText:{
    margin:8,
    fontSize:14,
    textAlign:'center',
  },
  // 水平的分割线
  horizontalLine:{
    marginTop:5,
    height:0.5,
    backgroundColor:'#ccc',
  },
  // 按钮
  buttonView:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonStyle:{
    flex:1,
    height:44,
    alignItems: 'center',
    justifyContent:'center',
  },
  // 竖直的分割线
  verticalLine:{
    width:0.5,
    height:44,
    backgroundColor:'#ccc',
  },
  buttonText:{
    fontSize:16,
    color:'#3393F2',
    textAlign:'center',
  },
});





class MyText extends Component {
  render() {
    return (
      <Text>Hello {this.props.name}!</Text>
    );
  }
}

class MyImage extends Component {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <Image source={this.props.pic} style={{width: 100, height: 50}} />
    );
  }
}

class MyList extends Component {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Text>{this.props.list}</Text>
        <MyText name='Rexxar' />
        <MyText name='Jaina' />
        <MyText name='Valeera' />
      </View>
    );
  }
}


class Hybird extends Component {
  render() {
    return(
      <View>
        <MyImage pic={{uri:'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} />
        <MyText name="于晓"/>
        <MyList list={[1,2]}/>
      </View>
    )
  }
}



import { TabNavigator } from "react-navigation";

class RecentChatsScreen extends React.Component {
  render() {
    return <Text>List of recent chats</Text>
  }
}

class AllContactsScreen extends React.Component {
  render() {
    return <Text>List of all contacts</Text>
  }
}

const MainScreenNavigator = TabNavigator({
  Recent: { screen: RecentChatsScreen },
  All: { screen: AllContactsScreen },
});