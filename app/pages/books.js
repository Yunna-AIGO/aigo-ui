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


//var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
var REQUEST_URL = 'http://localhost:8081';

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
        //return response.json();
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
      <TouchableHighlight onPress={() => {
            navigate('BookDetail',movie.id)
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

// export default class BooksScreen extends React.Component {
//   constructor(props) {
//       super(props);
//       //初始化state
//       this.created();
      
//       this.state = {
//         books: [
//           {
//             name  : '挪威的世界',
//             author : '村上春树'
//           },
//           {
//             name  : '霍乱时期的爱情',
//             author : '马尔克斯'
//           },
//           {
//             name  : '小王子',
//             author : '巴碧秋'
//           }
//         ],
//       }
//   };
//   created(){
//     fetch('https://api.douban.com/v2/book/search?q=小王子&start=0&count=5').then(res=>{
//       console.log(res)
//       //alert(JSON.stringify(res));
//     })
//   }
//   static navigationOptions = {
//     title: '我的书架',
//   };
//   render() {
//     const { navigate } = this.props.navigation;
//     return (
//       <View>
//       <ScrollView>
//           <Text style={{fontSize:96}}>Scroll me plz</Text>
//           <Image source={require('../images/favicon.png')} />
//           <Image source={require('../images/favicon.png')} />
//           <Image source={require('../images/favicon.png')} />
//           <Image source={require('../images/favicon.png')} />
//           <Image source={require('../images/favicon.png')} />
//           <Text style={{fontSize:96}}>If you like</Text>
//           <Image source={require('../images/favicon.png')} />
//           <Image source={require('../images/favicon.png')} />
//           <Image source={require('../images/favicon.png')} />
//           <Image source={require('../images/favicon.png')} />
//           <Image source={require('../images/favicon.png')} />
//           <Text style={{fontSize:96}}>Scrolling down</Text>
//           <Image source={require('../images/favicon.png')} />
//           <Image source={require('../images/favicon.png')} />
//           <Image source={require('../images/favicon.png')} />
//           <Image source={require('../images/favicon.png')} />
//           <Image source={require('../images/favicon.png')} />
//           <Text style={{fontSize:96}}>What's the best</Text>
//           <Image source={require('../images/favicon.png')} />
//           <Image source={require('../images/favicon.png')} />
//           <Image source={require('../images/favicon.png')} />
//           <Image source={require('../images/favicon.png')} />
//           <Image source={require('../images/favicon.png')} />
//           <Text style={{fontSize:96}}>Framework around?</Text>
//           <Image source={require('../images/favicon.png')} />
//           <Image source={require('../images/favicon.png')} />
//           <Image source={require('../images/favicon.png')} />
//           <Image source={require('../images/favicon.png')} />
//           <Image source={require('../images/favicon.png')} />
//           <Text style={{fontSize:80}}>React Native</Text>
//         </ScrollView>
//         <Button
//           onPress={() => {
//               navigate('BookDetail','挪威的森林')
//             }
//           }
//           title="挪威的森林"
//         />
//         <Button
//           onPress={() => {
//               navigate('BookDetail','乔布斯传')
//             }
//           }
//           title="乔布斯传"
//         />
//         <Button
//           onPress={() => {
//               //navigate('Login')
//               //this.props.navigation.goBack();
//             }
//           }
//           title="你好世界"
//         />
//       </View>
//     );
//   }
// }

