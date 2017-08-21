import React ,{Component } from 'react';

import {
  AppRegistry,
  Text,
  View,
  Button,
  Image,
  ListView,
  StyleSheet,
  TouchableHighlight,
  StatusBar,
} from 'react-native';

import { Heading1, Heading2, Paragraph } from '../widget/Text.js';

import { color, NavigationItem, SearchBar, SpacingView } from '../widget'

import { screen, system } from '../common';

import HistoryScreen from './history.js';


export default class BooksScreen extends Component {
  //类构造函数
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    };
  }

  static navigationOptions = {
    title: '我的书架',
  }
  
  componentDidMount() {
    //this.getBooks();
    StatusBar.setBarStyle('dark-content')
  }

  render() {
    //每次修改state都会重新调用render
    return (
      <HistoryScreen />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          loading...
        </Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingBottom:10,
    paddingLeft:20,
    paddingRight:20,
    alignItems:'flex-start',
  },
  rightContainer: {
    flex: 1,

  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'left',
  },
  year: {
    textAlign: 'left',
  },
  thumbnail: {
    width: 80,
    height: 110,
    backgroundColor:'grey',
    marginRight:10,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
    borderColor:'red',
    borderWidth:1,
    paddingBottom:50,
  },
});
