import {StyleSheet} from 'react-native';

export default theme = {
  Default: '#4caf50',
  red : '#E74C3C',
  orange : '#E67E22',
  yellow : '#F1C40F',
  green : '#2ECC71',
  cyan : '#34495E',
  blue : '#3498DB',
  purple : '#9B59B6',
  darkblack : '#333',
  black : '#666',
  lightblack : '#999',
  darkgrey : '#aaa',
  grey : '#ccc',
  lightgrey : '#eee',
};

export class ThemeFactory{
  static createTheme(themeFlag){
    return {
      themeColor:themeFlag,
      styles:StyleSheet.create({
        selectedTitleStyle: { color: themeFlag },
        tabBarSelectedIcon: { tintColor: themeFlag },
        navBar: { backgroundColor: themeFlag },
        themeColor: { color: themeFlag },
      })
    }
  }
}