'use strict';

import React, { PropTypes } from 'react';
import tweenState from 'react-tween-state';

import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text
} from 'react-native';

var Accordion = React.createClass({
  mixins: [tweenState.Mixin],

  propTypes: {
    activeOpacity: React.PropTypes.number,
    animationDuration: React.PropTypes.number,
    content: React.PropTypes.element,
    easing: React.PropTypes.string,
    expanded: React.PropTypes.bool,
    header: React.PropTypes.element.isRequired,
    onPress: React.PropTypes.func,
    underlayColor: React.PropTypes.string,
    style: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      activeOpacity: 0,
      animationDuration: 300,
      easing: 'linear',
      expanded: false,
      underlayColor: '#000',
      style: {}
    };
  },

  getInitialState() {
    return {
      is_visible: false,
      height: 0,
      content_height: 0
    };
  },

  close() {
    this.state.is_visible && this.toggle();
  },

  open() {
    !this.state.is_visible && this.toggle();
  },

  toggle() {
    this.state.is_visible = !this.state.is_visible;

    this.tweenState('height', {
      easing: tweenState.easingTypes[this.props.easing],
      duration: this.props.animationDuration,
      endValue: this.state.height === 0 ? this.state.content_height : 0
    });
  },

  _onPress() {
    this.toggle();

    if (this.props.onPress) {
      this.props.onPress.call(this);
    }
  },

  _getContentHeight() {
    if (this.refs.AccordionContent) {
      this.refs.AccordionContent.measure((ox, oy, width, height, px, py) => {
        // Sets content height in state
        this.setState({
          height: this.props.expanded ? height : 0,
          content_height: height
        });
      });
    }
  },

  componentDidMount() {
    // Gets content height when component mounts
    // without setTimeout, measure returns 0 for every value.
    // See https://github.com/facebook/react-native/issues/953
    setTimeout(this._getContentHeight);
  },

  render() {
      let icon = require('./arrowright.png');

        if(this.state.is_visible){
            icon = require('./arrowdown.png'); 
        }

    return (
      /*jshint ignore:start */
      <View
        style={{
          overflow: 'hidden'
        }}
      >
        <TouchableOpacity
        activeOpacity={0.7}
          ref="AccordionHeader"
          onPress={this._onPress}
          underlayColor={this.props.underlayColor}
          style={this.props.style}
        >
        <View style ={{flex:1, flexDirection:'row', paddingVertical: 9,
  paddingHorizontal: 15,borderColor:'#dcdcdc', borderBottomWidth:0.5}}> 
          {this.props.header}

            <Image
 resizeMode={Image.resizeMode.contain}
  source={icon}
 style = {{width:20, height:20, marginRight:3, marginTop:3.5}}
 />
        </View>
        </TouchableOpacity>
        <View
          ref="AccordionContentWrapper"
          style={{
            height: this.getTweeningValue('height')
          }}
        >
          <View ref="AccordionContent">
            {this.props.content}
          </View>
        </View>
      </View>
      /*jshint ignore:end */
    );
  }
});

module.exports = Accordion;
