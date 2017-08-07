/*登录类*/
import {
  StyleSheet,
} from 'react-native';

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
  },
  cell:{
    flexDirection:'row',
    backgroundColor:'#fff',
    padding:16,
    alignItems:'center',
    borderColor:'#ddd',
    borderWidth:1,
    marginTop:-1,
  },
  TextInput: {
    flex:1,
    borderColor : '#888',
    borderWidth : 1,
    height: 45,
    padding: 5,
    fontSize:22,
  },
  button:{
    borderColor:'#16A085',
    backgroundColor:'#1ABC9C',
    borderWidth:1,
    fontSize:20,
    lineHeight:45,
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
    borderWidth:0.5,
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
  }
});
