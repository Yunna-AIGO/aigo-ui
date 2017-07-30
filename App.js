import React ,{ Component } from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  View,
  Button,
  Image,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

class Blink extends Component {
  constructor(props) {
    //super(props);
    super();
    this.state = { showText: true };
  }

  componentDidMount(){
    //fetch() better;
  }

  render() {
    // 根据当前showText的值决定是否显示text内容
    let display = this.state.showText ? this.props.text : ' ';
    return (
      <Text>{display}</Text>
    );
  }
}

class BlinkApp extends Component {
  render() {
    return (
      <View>
        <Blink text='I love to blink' />
        <Blink text='Yes blinking is so great' />
        <Blink text='Why did they ever take this out of HTML' />
        <Blink text='Look at me look at me look at me' />
      </View>
    );
  }
}

AppRegistry.registerComponent('MyApp', () => BlinkApp);