import React, { Component } from 'react';
import { 
  AppRegistry,
  View,
  Text,
  TextInput,
  Image,
  Button
} from 'react-native';

import { StackNavigator } from 'react-navigation';


/*
{js代码}
{{js对象}}
<dom代码>
 */
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


class MyApp extends Component {
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


class SignInScreen extends Component {
  constructor(props) {
      super(props);
      this.state = {text: ''};
  }
  
  static navigationOptions = {
    title: '登录', //titleBar标题
  }

  render() {
    const { navigate } = this.props.navigation;

    function doSignIn(){
      alert('登录成功');
      setTimeout(()=>{
        navigate('QrCode');
      },2000)
      
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
            alert('验证码已发送')
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
  // QrCode: { screen: QrCodeScreen },
  // HistoryOrders: { screen: HistoryOrdersScreen },
  // Books: { screen: BooksScreen },
  // UserCenter: { screen: UserCenterScreen },
});


AppRegistry.registerComponent('MyApp', () => MyAppGlobal);
