import React, { Component } from 'react';
import { 
  AppRegistry,
  View,
  Text,
  TextInput,
  Image,
  Button,
  AsyncStorage,
  ActivityIndicator,
  Modal,
  TouchableHighlight,
} from 'react-native';

//import LoginScreen from './pages/login.js';
//import Loading from './mods/loading.js';

/*
{js代码}
{{js对象}}
<dom代码>
 */

//登录页

class ModalExample extends Component {

  constructor(props) {
    super(props);
    this.state = {modalVisible: false};
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType={"none"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{marginTop: 22}}>
          <View>
            <Text>Hello World!</Text>

            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>

          </View>
         </View>
        </Modal>

        <TouchableHighlight onPress={() => {
          this.setModalVisible(true)
        }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>

      </View>
    );
  }
}

AppRegistry.registerComponent('MyApp', () => ModalExample);


