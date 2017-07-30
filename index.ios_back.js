/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
//1.
// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';

// export default class MyApp extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           一个APP
//         </Text>
//         <Text style={styles.instructions}>
//           干点啥好
//         </Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

// AppRegistry.registerComponent('MyApp', () => MyApp);
// 
// import React, { Component } from 'react';
// 
// 
// 2.
// import React, { Component } from 'react';
// import { AppRegistry, Text } from 'react-native';

// class HelloWorldApp extends Component {
//   render() {
//     return (
//       <Text>Hello world!</Text>
//     );
//   }
// }

// // 注意，这里用引号括起来的'HelloWorldApp'必须和你init创建的项目名一致
// AppRegistry.registerComponent('MyApp', () => {
//     return HelloWorldApp
// });
// 
// 3.
// import React, { Component } from 'react';
// import { AppRegistry, Image } from 'react-native';

// class Bananas extends Component {
//   render() {
//     let pic = {
//       uri: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png'
//     };
//     return (
//       <Image source={pic} style={{width: 200, height: 200}} />
//     );
//   }
// }

// AppRegistry.registerComponent('MyApp', () => Bananas);
// 
// 
// 
// 5
// import React, { Component } from 'react';
// import { AppRegistry, Text, View } from 'react-native';

// class Greeting extends Component {
//   render() {
//     return (
//       <Text>Hello {this.props.name}!</Text>
//     );
//   }
// }

// class LotsOfGreetings extends Component {
//   render() {
//     return (
//       <View style={{alignItems: 'center'}}>
//         <Greeting name='Rexxar' />
//         <Greeting name='Jaina' />
//         <Greeting name='Valeera' />
//       </View>
//     );
//   }
// }

// AppRegistry.registerComponent('MyApp', () => LotsOfGreetings);
// 
// 
// 6
// import React, { Component } from 'react';
// import { AppRegistry, Text, View } from 'react-native';

// class Blink extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { showText: true };

//     // 每1000毫秒对showText状态做一次取反操作
//     setInterval(() => {
//       this.setState(previousState => {
//         return { showText: !previousState.showText };
//       });
//     }, 1000);
//   }

//   render() {
//     // 根据当前showText的值决定是否显示text内容
//     let display = this.state.showText ? this.props.text : ' ';
//     return (
//       <Text>{display}</Text>
//     );
//   }
// }

// class BlinkApp extends Component {
//   render() {
//     return (
//       <View>
//         <Blink text='I love to blink' />
//         <Blink text='Yes blinking is so great' />
//         <Blink text='Why did they ever take this out of HTML' />
//         <Blink text='Look at me look at me look at me' />
//       </View>
//     );
//   }
// }

// AppRegistry.registerComponent('MyApp', () => BlinkApp);


// import React, { Component } from 'react';
// import { AppRegistry, SectionList, StyleSheet, Text, View } from 'react-native';

// export default class SectionListBasics extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <SectionList
//           sections={[
//             {title: 'D', data: ['Devin']},
//             {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
//           ]}
//           renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
//           renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//    flex: 1,
//    paddingTop: 22
//   },
//   sectionHeader: {
//     paddingTop: 2,
//     paddingLeft: 10,
//     paddingRight: 10,
//     paddingBottom: 2,
//     fontSize: 14,
//     fontWeight: 'bold',
//     backgroundColor: 'rgba(247,247,247,1.0)',
//   },
//   item: {
//     padding: 10,
//     fontSize: 18,
//     height: 44,
//   },
// })

// AppRegistry.registerComponent('MyApp', () => SectionListBasics);

var MOCKED_MOVIES_DATA = [
  {
    title: '我是一本书', 
    year: '2015', 
    posters: {
      thumbnail: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png'
    }
  },
  {
    title: '我是一本书', 
    year: '2015', 
    posters: {
      thumbnail: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png'
    }
  },
];

import React, {
  Component,
} from 'react';
import { 
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class Index extends Component {
   render() {
    var movie = MOCKED_MOVIES_DATA[0];
    return (
      <View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
});

AppRegistry.registerComponent('MyApp', () => Index);
