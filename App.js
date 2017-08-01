import React ,{ Component } from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  View,
  Button,
  Image,
  StyleSheet,
  ListView,
  FlatList,
  SectionList
} from 'react-native';
import { StackNavigator } from 'react-navigation';


/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

class root extends Component {
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
    this.fetchData = this.fetchData.bind(this); 
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
        this.setState({
          //获取列表后替换dataSource和loaded
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      });
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
          Loading movies...
        </Text>
      </View>
    );
  }

  renderMovie(movie) {
    return (
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
    marginBottom:10
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
    width: 53,
    height: 81,
    backgroundColor:'grey',
    marginRight:10,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
    borderColor:'red',
    borderWidth:1,
  },
});


export default class FlatListBasics extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item,index}) => <Text style={styles.item}>{item.key}{index}</Text>}
        />
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//    flex: 1,
//    paddingTop: 22
//   },
//   item: {
//     padding: 10,
//     fontSize: 18,
//     height: 44,
//   },
// })

class SectionListBasics extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={[
            {title: 'D', data: ['Devin']},
            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
          ]}

          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})


AppRegistry.registerComponent('MyApp', () => SectionListBasics);