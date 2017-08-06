import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  Button,
  ActivityIndicator,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

class MyButton extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <TouchableHighlight
        underlayColor='transparent'
        onPress={()=>{
          if(!this.props.disabled){
            this.props.onPress()
          }
        }
      }>
        <Text style={[globalStyle.button,this.props.disabled ? globalStyle.buttonDisabled:{},this.props.style]}>{this.props.children}</Text>
      </TouchableHighlight>
    );
  }
}

export default MyButton;
