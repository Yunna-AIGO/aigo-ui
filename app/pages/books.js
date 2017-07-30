import React from 'react';

import {
  AppRegistry,
  Text,
  View,
  Button,
  Image,
  ScrollView
} from 'react-native';

export default class BooksScreen extends React.Component {
  constructor(props) {
      super(props);
      //初始化state
      this.created();
      
      this.state = {
        books: [
          {
            name  : '挪威的世界',
            author : '村上春树'
          },
          {
            name  : '霍乱时期的爱情',
            author : '马尔克斯'
          },
          {
            name  : '小王子',
            author : '巴碧秋'
          }
        ],
      }
  };
  created(){
    fetch('https://api.douban.com/v2/book/search?q=小王子&start=0&count=5').then(res=>{
      console.log(res)
      //alert(JSON.stringify(res));
    })
  }
  static navigationOptions = {
    title: '我的书架',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
      <ScrollView>
          <Text style={{fontSize:96}}>Scroll me plz</Text>
          <Image source={require('../images/favicon.png')} />
          <Image source={require('../images/favicon.png')} />
          <Image source={require('../images/favicon.png')} />
          <Image source={require('../images/favicon.png')} />
          <Image source={require('../images/favicon.png')} />
          <Text style={{fontSize:96}}>If you like</Text>
          <Image source={require('../images/favicon.png')} />
          <Image source={require('../images/favicon.png')} />
          <Image source={require('../images/favicon.png')} />
          <Image source={require('../images/favicon.png')} />
          <Image source={require('../images/favicon.png')} />
          <Text style={{fontSize:96}}>Scrolling down</Text>
          <Image source={require('../images/favicon.png')} />
          <Image source={require('../images/favicon.png')} />
          <Image source={require('../images/favicon.png')} />
          <Image source={require('../images/favicon.png')} />
          <Image source={require('../images/favicon.png')} />
          <Text style={{fontSize:96}}>What's the best</Text>
          <Image source={require('../images/favicon.png')} />
          <Image source={require('../images/favicon.png')} />
          <Image source={require('../images/favicon.png')} />
          <Image source={require('../images/favicon.png')} />
          <Image source={require('../images/favicon.png')} />
          <Text style={{fontSize:96}}>Framework around?</Text>
          <Image source={require('../images/favicon.png')} />
          <Image source={require('../images/favicon.png')} />
          <Image source={require('../images/favicon.png')} />
          <Image source={require('../images/favicon.png')} />
          <Image source={require('../images/favicon.png')} />
          <Text style={{fontSize:80}}>React Native</Text>
        </ScrollView>
        <Button
          onPress={() => {
              navigate('BookDetail','挪威的森林')
            }
          }
          title="挪威的森林"
        />
        <Button
          onPress={() => {
              navigate('BookDetail','乔布斯传')
            }
          }
          title="乔布斯传"
        />
        <Button
          onPress={() => {
              //navigate('Login')
              //this.props.navigation.goBack();
            }
          }
          title="你好世界"
        />
      </View>
    );
  }
}

