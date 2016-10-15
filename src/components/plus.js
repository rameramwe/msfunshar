'use strict';
import React,{Component} from 'react'; 
import{
  StyleSheet,
  AppRegistry,
  PropTypes,
  Text,
  TouchableOpacity,
  View,
  Image,
   Navigator,
} from 'react-native';

import StyleVars from 'funshare/StyleVars';
import Routes from 'funshare/Routes';
import addstuff from 'funshare/src/pages/addstuff';
import Home from 'funshare/src/pages/Home';




const styles = StyleSheet.create({

});

export default class plus extends Component {


  render() {
    let style = {height:25 , width: 25, marginRight:8 , marginTop:14};
    return (
      <TouchableOpacity
        style={this.props.style}
        activeOpacity={0.5}
        onPress={this.goAddsuff.bind(this)}
      >
        <Image style={style}
        resizeMode={Image.resizeMode.contain}
        source={require('../img/plus.png')}
         />
      </TouchableOpacity>
     );
  }


 goAddsuff() {
  console.log(this.props);
  //this.props.replaceRoute(Routes.Home());
  this.props.navigator.push({
    
    component: addstuff
  });
  
}
}

AppRegistry.registerComponent('plus', () => plus);

