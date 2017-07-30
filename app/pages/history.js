import React from 'react';

import {
  AppRegistry,
  Text,
  View,
  Button,
  Image,
} from 'react-native';

export default class HistoryScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `借阅历史`,
  });
  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>挪威的森林</Text>
        <Text>挪威的树林</Text>
        <Text>挪威的森马</Text>
      </View>
    );
  }
}

