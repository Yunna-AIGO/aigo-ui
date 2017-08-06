//标准类
//https://facebook.github.io/react/docs/react-component.html

//引入react
import React from 'react';

//引入reactNative以及基础标签
import {
  AppRegistry,
  Text,
  TextInput,
  View,
  Button,
  Image,
  StyleSheet,
} from 'react-native';

//引入通用样式
import globalStyle from '../styles/global.js';
//引入全局方法
import Util from '../tools/util.js';

//导出全局模块
export default class Foo extends React.Component {
  static defaultProps = {
        title: 'i am default prop title',
        name: 'i am default prop name',
  }
  static propTypes = {
        onMyMethod: React.PropTypes.func,
  }
  props: {
      title: string,
      onChangeText: Function,
      style: Object
  }
  state: {
    title: string
  }
  //构造函数,可以用来初始化state
  constructor(props) {
    //必须
    super(props);
    //初始化state
    this.state = {
      title : this.props.title
    };
    //为实例方法绑定本身
    this.bar = this.bar.bind(this); 
  }
  componentWillMount(){
    console.log('componentWillMount');
  }

  render() {
    var 
    return (
      <View style={globalStyle.border,{display:display}}>
        
        <TextInput style={[globalStyle.input]} placeholder="请输入手机号" onChangeText={(text) => {
          this.setState({text1:text});
        }} />
        <Text>{this.state.text1}</Text>

        <Button title="关闭" onPress={()=>{
          this.setState({display:'none'})
        }}></Button>
       
      </View>
    );
  }
  componentDidMount(){
    console.log('componentDidMount');
    this.fetchMyApi()
  }

  //自定义实例方法
  fetchMyApi() {
    console.log('fetchMyApi');
  }

  onChangeText(text: string) {
        this.setState({ text: text });

        this.props.onChangeText && this.props.onChangeText()
    }

}
const styles = StyleSheet.create({})



