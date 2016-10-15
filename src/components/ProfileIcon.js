'use strict';
import React from 'react'; 
import{
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

import StyleVars from 'funshare/StyleVars';

const styles = StyleSheet.create({

});

class ProfileIcon extends React.Component {
  render() {
    let style = {height:30 , width: 30, marginTop:13};
    return (
      <TouchableOpacity
        style={this.props.style}
        activeOpacity={0.5}
      >
        <Image style={style}
        resizeMode={Image.resizeMode.contain}
        source={require('../img/profilicon.png')}
         />
      </TouchableOpacity>
     );
  }
}

export default ProfileIcon;
