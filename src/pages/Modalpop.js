'use strict';

import React , {Component} from 'react';

import {
  Platform,
  Switch,
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  BackAndroid,
  Dimensions,
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  ListView
} from'react-native';
import IcoButton from 'funshare/src/components/icobutton';
import Swiper from 'react-native-swiper';
import Routes from 'funshare/Routes';
import ImageViewer from 'react-native-image-zoom-viewer';
import firebase from 'firebase';
import FCM from 'react-native-fcm';
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var modalheight = Dimensions.get('window').height/2 ;

export default class Modalpop extends Component { 
  

 
 


  render() {
    return (
      <Modal
      animationType={"fade"}
      transparent={true}
      visible={this.props.popVisible}
      onRequestClose={() => {this.props.hidePop();}}
    >

    <View style={ {flex:1} }>

    <View style= {{ height:deviceHeight, backgroundColor:   'rgba(0, 0, 0, 0.9)'}} >
    <View style= {{alignItems:'center'}} >
    <Text style={{color:'white', fontSize:40,fontWeight:'bold',marginTop:25}}>Glückwunsch</Text>
    <Text style={{color:'white', fontSize:30,fontWeight:'bold',marginTop:25}}>it's a Match!</Text>
    </View>

    <View style = {{alignItems:'center' , marginTop:25}}>
    <Image 
    resizeMode={Image.resizeMode.contain}
    source={require('../img/Logo.png')}
    style={{height:40, width:40}}                                
    />

    </View>


    <View style = {{flexDirection:'row',marginTop:30,justifyContent:'center' }}>
    <View style = {{  flex:0.5 ,alignItems:'center' }}>
     <View style = {{  flex:0.5 ,alignItems:'center' }}>
    <View  style={{height:100 , width:100 , borderRadius:50 ,borderWidth:1,borderColor:'white'}} >
   
   <Image  
    source={{uri:this.props.picOfWantedItem}}
     style={{height:98 , width:98 , borderRadius:49 }}                                
   />
     </View>
    </View>
    </View>
    <View style = {{  flex:0.5 ,alignItems:'center' }}>
    <View  style={{height:100 , width:100 , borderRadius:50 ,borderWidth:1,borderColor:'white'}} >
    <Image 
    source={{uri:this.props.picOfOfferedItem}}
    style={{height:98 , width:98 , borderRadius:49 }}                                
    />
    </View>
    </View>
    </View>
    <View style={{flex : 1 ,flexDirection:'row' ,width:deviceWidth , alignItems:'flex-end'}}>
      <View style={{position:'absolute', bottom:33,width:deviceWidth  ,flex:1,flexDirection:'row',alignItems:'center', justifyContent:'center'}}>

     <View style={{flex:0.25,alignItems:'center',marginLeft:5}}>
    <Text style={{color:'white', fontSize:15 ,marginTop:5 }}>Abbrechen</Text>
    </View>
    <View style={{flex:0.25,alignItems:'center'}}>
    <IcoButton
    onPress={()=>this.props.hidePop()}
    source={require('funshare/src/img/dislike.png')}
    icostyle={{width:60, height:60}}
    />
    </View>

   <View style={{flex:0.25,alignItems:'center'}}>
    <IcoButton
    source={require('funshare/src/img/like.png')}
    onPress={()=>this.props.finishDeal()}
    icostyle={{width:60, height:60}}
    />
    </View>
  <View style={{flex:0.25,alignItems:'center',marginRight:5}}>
    <Text style={{color:'white', fontSize:15 ,marginTop:5  }}>Bestätigen</Text>
    </View>


      </View>
    </View>

    </View>
    </View>
    </Modal>

        );
      }
    }