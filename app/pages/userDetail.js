import React from 'react';

import {
  AppRegistry,
  Text,
  View,
  Button,
  Image,
  TextInput
} from 'react-native';

import Cell from '../mods/cell.js';

let that;
export default class UserDetailScreen extends React.Component {
  constructor(props){
    super(props);
    that = this;
    //组件私有属性
    this.state = {
      name : '于晓',
      nickName : '赞郁',
    }
  }

  static navigationOptions = {
    title: '个人信息',
    headerRight: <Button title="保存" onPress={()=>{
      that.doSave();   
    }} />,
  }

  componentWillMount(){
    console.log('1')
  }

  componentDidMount(){
    console.log('2')
  }

  doSave(){
   fetch('http://localhost:8081/saveInfo').then(res=>{
    //console.log(this.props.navigation)
    const {navigate,goBack,state} = this.props.navigation;
    // 在第二个页面,在goBack之前,将上个页面的方法取到,并回传参数,这样回传的参数会重走render方法
    state.params.callback('reload');
    goBack();
   })
  }

  render() {
    return (
      <View>
        <Cell style={{marginTop:20,}}>
          <Text style={{marginRight:16,fontSize:16,width:60,}}>姓名</Text>
          <TextInput 
            style={{height:20,fontSize:16,color:'#999'}} 
            value={this.state.name}
            onChangeText={(text)=>{
              this.setState({name:text});
            }}>
          </TextInput>
        </Cell>
        <Cell>
          <Text style={{marginRight:16,fontSize:16,width:60,}}>昵称</Text>
          <TextInput 
            style={{height:20,fontSize:16,color:'#999'}} 
            value={this.state.nickName}
            onChangeText={(text)=>{
              this.setState({nickName:text});
            }}>
          </TextInput>
        </Cell>
      </View>
    );
  }
}

