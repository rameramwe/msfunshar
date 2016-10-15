'use strict';
import React from 'react'; 
import{
  StyleSheet,
  PropTypes,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';

import StyleVars from 'funshare/StyleVars';

const styles = StyleSheet.create({

});

class fertig extends React.Component {
  render() {
    let style = {fontSize:22, color: 'white', marginRight:15 , marginTop:13};
    return (
      <TouchableOpacity
        style={this.props.style}
        activeOpacity={0.5}
        onPress={this.back.bind(this)}
      >
       <Text style={style}>Fertig</Text>
      </TouchableOpacity>
     );
  }

  

back() {
  
  this.props.back(); 
}
}

export default fertig;
