import React from 'react';

import {
  AppRegistry,
  Text,
  View,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';

export default class OrderDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `正在查看 ${navigation.state.params.id}`,
  });

  _extractKey(item, index){
    return 'index'+index+item.name;
  }

  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;
    return (
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={{uri: params.posters.profile}}
            style={styles.thumbnail}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.desc}>标题：{params.title}</Text>
            <Text style={styles.desc}>年份：{params.year}</Text>
            <Text style={styles.desc}>分级：{params.mpaa_rating}</Text>
            <Text style={styles.desc}>发布日期：{params.release_dates.theater}</Text>
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>演员阵容：</Text>
          <FlatList
            data={params.abridged_cast}
            renderItem={({item}) =>
              <View style={styles.desc}>
                <Text>{item.name} 饰 {item.characters[0]}</Text>
              </View>
            }
            keyExtractor={this._extractKey}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>友情链接：</Text>
          <FlatList
            data={params.abridged_cast}
            renderItem={({item}) =>
              <View style={styles.desc}>
                <Text>{item.name} 饰 {item.characters[0]}</Text>
              </View>
            }
            keyExtractor={this._extractKey}
          />
        </View>
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
    paddingBottom:10,
    paddingLeft:20,
    paddingRight:20,
    alignItems:'flex-start',
  },
  rightContainer: {
    flex: 1
  },
  desc: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft:5,
    //textAlign: 'left',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
  },
  thumbnail: {
    width: 80,
    height: 110,
    backgroundColor:'grey',
    marginRight:10,
  },
});