import React from 'react';

import {
  AppRegistry,
  Text,
  View,
  Button,
  Image,
} from 'react-native';

export default class BookDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `正在查看 ${navigation.state.params}`,
  });
  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>书名:{params}</Text>
      </View>
    );
  }
}

