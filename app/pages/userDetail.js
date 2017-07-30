import React from 'react';

import {
  AppRegistry,
  Text,
  View,
  Button,
  Image,
} from 'react-native';

export default class UserDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Hello Yuxiao',
  });
  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>Hello Yuxiao</Text>
      </View>
    );
  }
}

