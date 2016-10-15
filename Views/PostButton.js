'use strict';
import React, { Component } from 'react';
import {
  NativeModules,
  Text,
  TouchableOpacity
} from 'react-native';

import Actions from 'funshare/Actions';

export default class LogoutButton extends React.Component {
  render() {
    let style = { marginRight: 10, color: "white" };

    return (
      <TouchableOpacity
        style={this.props.style}
        activeOpacity={0.5}
        onPress={() => this.onPress()}
      >
        <Text style={style}>Post</Text>
      </TouchableOpacity>
    );
  }

  onPress() {
   var Platform = require('react-native').Platform;
  var ImagePicker = require('react-native-image-picker');

// More info on all the options is below in the README...just some common use cases shown here
var options = {
  title: 'Add a thing to exchange  ',
  customButtons: {
    'Choose Photo from Facebook': 'fb',
  },
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

/**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info below in README)
 */
 ImagePicker.showImagePicker(options, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  }
  else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  }
  else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  }
  else {
    // You can display the image using either data...
    const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
    
    // or a reference to the platform specific asset location
    if (Platform.OS === 'ios') {
      const source = {uri: response.uri.replace('file://', ''), isStatic: true};
    } else {
      const source = {uri: response.uri, isStatic: true};
    }

  Actions.uploadPost('data:image/jpeg;base64,' + response.data);

  }
});
}

}
