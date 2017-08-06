import React, { Component } from 'react';
import { 
  AppRegistry,
  View,
  Text,
  TextInput,
  Image,
  Button,
  AsyncStorage,
} from 'react-native';

import { StackNavigator } from 'react-navigation';

/*
{js代码}
{{js对象}}
<dom代码>
 */

//登录页
class SignInScreen extends Component {
  constructor(props) {
      super(props);
      this.state = {text: ''};
  }
  static navigationOptions = {
    title: '登录', //titleBar标题
  };
  render() {
    const { navigate } = this.props.navigation;

    function doSignIn(){
      AsyncStorage.getItem('loginTime',(error,result)=>{
        result = result||'0';
        
        result = parseInt(result)+1;
        AsyncStorage.setItem('loginTime',''+result,(error)=>{
          navigate('QrCode');
        })
      });
      // setTimeout(()=>{
      //   navigate('QrCode');
      // },2000)
      
    }

    function sendCaptcha(){
      fetch('https://api.douban.com/v2/book/6548683').then((res)=>{
        alert(JSON.stringify(res).substring(0,100));
      })
    
    }

    return (
      <View>
        <TextInput
          style={{height: 40}}
          placeholder="请输入手机号"
          onChangeText={(text) => this.setState({text})}
        />
        <Text>
          手机号格式:{this.state.text.length===11?'正确':'错误'}
        </Text>
        <Button
          onPress={() => {
            sendCaptcha();
            //alert('验证码已发送');
          }}
          title="发送验证码"
        />
        <TextInput
          style={{height: 40}}
          placeholder="请输入验证码"
          onChangeText={(text) => this.setState({text})}
        />
        <Button
          onPress={() => doSignIn()}
          title="登录"
        />

        <Button
          onPress={() => navigate('SignUp')}
          title="注册"
        />
      </View>
    )
  }
}

class QrCodeScreen extends Component {
  constructor(props) {
      super(props);
      this.state = {text: ''}; //data
  }
  static navigationOptions = {
    title: '二维码', //titleBar标题
  };
  render() {
    const { navigate } = this.props.navigation;

    var methods = {

    }

    //template
    return (
      <View>
        <Text>{Math.random()}</Text>
        <Image source={require('./images/qrcode_image.png')} />
         <Button
          onPress={() => navigate('Home')}
          title="首页"
        />
      </View>
    )
  }
}

class HomeScreen extends Component {
  static navigationOptions = {
    title: '首页',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <View>
        <Button
          onPress={() => navigate('Home')}
          title="首页"
        />

        <Button
          onPress={() => navigate('SignUp')}
          title="注册"
        />

        <Button
          onPress={() => navigate('SignIn')}
          title="登录"
        />

        <Button
          onPress={() => navigate('QrCode')}
          title="二维码"
        />

        <Button
          onPress={() => navigate('HistoryOrders')}
          title="Books"
        />

        <Button
          onPress={() => navigate('HistoryOrders')}
          title="图书列表"
        />

        <Button
          onPress={() => navigate('UserCenter')}
          title="用户中心"
        />

      </View>
        <Text>首页</Text>
      </View>
    )  
  }
}

class SignUpScreen extends Component {
  static navigationOptions = {
    title: '注册',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <View>
        <Button
          onPress={() => navigate('Home')}
          title="首页"
        />

        <Button
          onPress={() => navigate('SignUp')}
          title="注册"
        />

        <Button
          onPress={() => navigate('SignIn')}
          title="登录"
        />

        <Button
          onPress={() => navigate('QrCode')}
          title="二维码"
        />

        <Button
          onPress={() => navigate('HistoryOrders')}
          title="Books"
        />

        <Button
          onPress={() => navigate('HistoryOrders')}
          title="图书列表"
        />

        <Button
          onPress={() => navigate('UserCenter')}
          title="用户中心"
        />

      </View>
        <Text>注册</Text>
      </View>
    )
  }
}


const MyAppGlobal = StackNavigator({
  SignIn: { screen: SignInScreen },
  Home: { screen: HomeScreen },
  SignUp: { screen: SignUpScreen },
  QrCode: { screen: QrCodeScreen },
  // HistoryOrders: { screen: HistoryOrdersScreen },
  // Books: { screen: BooksScreen },
  // UserCenter: { screen: UserCenterScreen },
});


// import { TabNavigator } from "react-navigation";

// class RecentChatsScreen extends React.Component {
//   render() {
//     return <Text>List of recent chats</Text>
//   }
// }

// class AllContactsScreen extends React.Component {
//   render() {
//     return <Text>List of all contacts</Text>
//   }
// }

// const SimpleApp = StackNavigator({
//   Home: { screen: MainScreenNavigator },
//   Chat: { screen: ChatScreen },
// });

// const MainScreenNavigator = TabNavigator({
//   Recent: { screen: RecentChatsScreen },
//   All: { screen: AllContactsScreen },
// });

AppRegistry.registerComponent('MyApp', () => MyAppGlobal);
//AppRegistry.registerComponent('MyApp', () => MainScreenNavigator);


