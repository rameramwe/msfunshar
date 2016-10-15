/**
 * InputButton.js
 * 
 * Created by kylewbanks on 2016-08-07.
 */
'use strict'; 
import React, { Component } from 'react';
import {
    TouchableHighlight,
    Text,
    StyleSheet
} from 'react-native';
const inputButtons = 
    ["Hi","hisa", "hidsh", "KI"];

const port = (
   <View style={{flex:1 , flexDirection:'row' , alignItems:'center' , left:50}}>     
      <Image
      resizeMode={Image.resizeMode.contain}
      source={require('../img/edit.png')}
      style = {{width:20, height:20, marginRight:30}}
      />
       <Text>Hiiiijjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj</Text>     
      </View>
      );

export default class InputButton extends Component {
    
    render() {
        return (
            <View style={Style.rootContainer}>
                <View style={Style.displayContainer}>
                    <Text style={Style.displayText}>{this.state.inputValue}</Text>
                </View>
                <View style={Style.inputContainer}>
                    {this._renderInputButtons()}
                </View>
            </View>
        )
    }

var Style = StyleSheet.create({
    rootContainer: {
        flex: 1
    },

    displayContainer: {
        flex: 2,
        backgroundColor: '#193441',
        justifyContent: 'center'
    },

    displayText: {
        color: 'white',
        fontSize: 38,
        fontWeight: 'bold',
        textAlign: 'right',
        padding: 20
    },

    inputContainer: {
        flex: 8,
        backgroundColor: '#3E606F'
    },

    inputButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#91AA9D'
    },

    inputButtonHighlighted: {
        backgroundColor: '#193441'
    },

    inputButtonText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white'
    },

    inputRow: {
        flex: 1,
        flexDirection: 'row'
    }
});