/*登录类*/
import {
  StyleSheet,
} from 'react-native';

import theme from './theme.js';

export default globalStyle = StyleSheet.create({
  avatar:{
    width:60,
    height:60,
    backgroundColor:'#16A085',
    borderRadius:60,
  },
  card:{
    backgroundColor:'#fff',
    margin:16,
    padding:20,
    alignItems:'center',
    borderRadius:4,
  },
  cell:{
    flexDirection:'row',
    backgroundColor:'#fff',
    padding:16,
    alignItems:'center',
    borderColor:'#ddd',
    borderWidth:1,
    marginTop:-1,
    // borderWidth:StyleSheet.hairlineWidth,
  },
  TextInput: {
    flex:1,
    borderColor: '#999',
    borderWidth: 1,
    height: 40,
    padding: 5,
    fontSize:16,
  },
  button:{
    borderColor:theme.red,
    backgroundColor:theme.orange,
    borderWidth:1,
    fontSize:18,
    lineHeight:40,
    color:'#fff',
    textAlign:'center',
  },
  buttonDisabled : {
    backgroundColor:'#eee',
    borderColor:'#ccc',
    color:'#999'
  },
  input:{
    borderColor:'#666',
    borderWidth:1,
    padding:8,
    height:45,
  },
  border:{
    borderColor:'green',
    borderWidth : 3
  },
  hide : {
    display:'none'
  },
  devtool:{
    position:'absolute',
    zIndex:1000,
    top:0,
    left:0,
    right:0,
    backgroundColor:'#fff',
    borderColor:'red',
    borderBottomWidth:2,
    paddingTop:10,
  },
  devtop : {
    position:'absolute',
    top:0,
    left:0,
    right:0,
    backgroundColor:'#fff',
    borderColor:'red',
    borderWidth:2,
  },
  devbottom : {
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    backgroundColor:'#fff',
    borderColor:'red',
    borderWidth:2,
  },
  leftTop : {
    position : 'absolute',
    top: 0,
    left :0,
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  rowText: {
    fontSize: 16,
    color:'#999',
  },
  rowTextRight: {
    marginRight: 20,
  },
  rowButton: {
    height:40, 
    marginTop:20, 
    marginLeft:25, 
    marginRight:25, 
    borderWidth:0, 
    borderRadius:4, 
    backgroundColor:'orange',
  },
  rowTitle: {
    fontSize: 18,
    color: 'blue',
  },
  thumbnail: {
    width: 100,
    height: 100,
  },
  icon:{
    width:25,
    height:25,
  },
  iconSmall:{
    width:20,
    height:20,
  },
});