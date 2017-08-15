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
} from 'react-native';


var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
//var REQUEST_URL = 'http://localhost:8081';

export default class BooksScreen extends Component {
  //类构造函数
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({
        //修改的时候
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
    //因为fetchData方法中油用的this
    //this.fetchData = this.fetchData.bind(this); 
  }

  static navigationOptions = {
    title: '我的书架',
  }
  
  componentDidMount() {
    this.getBooks();
  }

  getBooks() {
    fetch('http://localhost:8081/books')
    .then((response) => {
      console.log('getBooks');
    })
  }

  render() {
    //每次修改state都会重新调用render
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      />
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

  renderMovie(movie) {
    const { navigate } = this.props.navigation;
    return (
      <TouchableHighlight 
        onPress={() => {
            navigate('BookDetail',movie)
      }}>
        <View style={styles.container}>
          <Image
            source={{uri: movie.posters.thumbnail}}
            style={styles.thumbnail}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.year}>{movie.year}</Text>
          </View>
        </View>
      </TouchableHighlight>
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
