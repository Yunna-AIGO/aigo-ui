import React from 'react';

import {
  AppRegistry,
  Text,
  View,
  Button,
  Image,
} from 'react-native';

export default class UserHomeScreen extends React.Component {
  static navigationOptions = {
    title: '个人中心',
  };
  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        
        <Button
          onPress={() => navigate('UserDetail')}
          title="用户信息"
        />

        <Button
          onPress={() => navigate('History')}
          title="历史记录"
        />
      </View>
    );
  }
}

