'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Dimensions,
  BackAndroid,
  ScrollView,
  Modal,
  AsyncStorage,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';

import Button from '../components/button';
import Reflux from 'reflux';
import DataStore from 'funshare/DataStore';
import Actions from 'funshare/Actions';
import Signup from './signup';
import Account from './account';
import Routes from 'funshare/Routes';
import firebase from 'firebase';
import styles from '../styles/common-styles.js';
var deviceheight = Dimensions.get('window').height ;
var devicewidth = Dimensions.get('window').width ;

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
} = FBSDK;




export default class login extends Component {

  constructor(props) {
    super(props);
    this.exit = this.exit.bind(this);
    this.state = { modalVisible: false };
    this.email = null;
    this.password = null;
    this.passwordConfirmation = null;
  }
  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.exit);
  }
  componentDidMount() {
    Actions.loadUser.completed.listen(this.onLoadUserCompleted.bind(this));
    BackAndroid.removeEventListener('hardwareBackPress', this.exit);
  }

  exit(){
    BackAndroid.exitApp();   
  }

  _setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }
  render(){

    var spinner =   
    ( <ActivityIndicator
      style={{ alignItems: 'center', justifyContent: 'center', padding: 8,}}
      size="large" 
      color="white"/> ) 
    return (
      <Image
      resizeMode={Image.resizeMode.cover}
      source={require('../img/background.png')}
      style = {styles.backgroundImage}
      >
      <ScrollView>

      <Modal
      animationType={'fade'}
      transparent={true}
      visible={this.state.modalVisible}
      onRequestClose={() => {this._setModalVisible(false)}}
      >
      <View style = {{flex:1 ,justifyContent: 'center', backgroundColor:   'rgba(0, 0, 0, 0.5)'}}>
      <View style = {{flexDirection:'row' , justifyContent:'center'}}>
      {spinner}
      <Text style = {{color:'white' ,marginTop:5 ,fontSize:20}} > Loading </Text>
      </View>
      </View>
      </Modal>

      <View style={styles.LogoComponent}>

      <Image 
      resizeMode={Image.resizeMode.contain}
      source={require('../img/font-logo.png')}
      style={styles.fLogo}                                
      />

      <Image 
      resizeMode={Image.resizeMode.contain}
      source={require('../img/Logo.png')}
      style={styles.Logo}                                
      />


      </View>
      <View style={{flex:0.4, marginTop:deviceheight/10,justifyContent:'flex-end'}}>


      <View style = {styles.textinputcontainer}>
      <TextInput
      style={styles.textinput}

      onChangeText={(text) => this.setState({email: text.replace(/\s/g, '')})}
      keyboardType={"email-address"}
      placeholder={"E-Mail Adresse"}
      onSubmitEditing={() => this.password.focus()}
      returnKeyType="next"
      placeholderTextColor="white"
      underlineColorAndroid="transparent"
      value={this.state.email}
      />
      </View>
      <View style = {styles.textinputcontainer}>
      <TextInput
      maxLength = {18}
      ref={(ref) => this.password = ref}
      style={styles.textinput}
      onChangeText={(text) => this.setState({password: text})} 
      secureTextEntry={true}
      placeholder={"Passwort"}
      returnKeyType="done"
      onSubmitEditing={this.login.bind(this)}
      placeholderTextColor="white"
      underlineColorAndroid="transparent"
      />
      </View>

      <View style={{    margin:5, flexDirection: 'row'}}>
      <View style= {{flex:0.5}}>
      <Button
      ref={(ref) => this.btn = ref}
      text="ANMELDEN"
      onpress={this.login.bind(this)}
      button_styles={styles.primary_button}
      button_text_styles={styles.primary_button_text} />
      </View>
      <View style={{ flex:0.5  , alignItems:'center'  }}>

      <Text style={{color:"white" , fontSize:14}}>Passwort vergessen?</Text>
      <TouchableHighlight
      onPress={this.goToSignup.bind(this)}>
      <Text style={{textDecorationLine: 'underline', color:"white" , fontSize:14}}>Jetzt hier registrieren</Text>     
      </TouchableHighlight>
      </View>
      </View>

      </View>



      <View style={{flex: 0.1,justifyContent:'center', alignItems: 'center', marginTop: deviceheight/15}}>


      <LoginButton
      style={{ width:300 , height:35}}
      publishPermissions={["publish_actions"]}
      onLoginFinished={
        (error, result) => {
          if (error) {
            alert("Login failed with error: " + result.error);
          } else if (result.isCancelled) {
            alert("Login was cancelled");
          } else {

            alert("Login was successful with permissions: " + result.grantedPermissions)
          }
        }
      }
      onLogoutFinished={() => alert("User logged out")}/>

      </View>


      </ScrollView>  
      </Image>
      );
  }


  login(){

    Actions.login({
      email: this.state.email,
      password: this.state.password
    }) 



  }

  goToSignup(){
    this.props.replaceRoute(Routes.signup());
  }
  loginfb(){


  }
  onLoadUserCompleted(user) {

    if (user.onboarded) {
      alert("km")
      this.props.replaceRoute(Routes.Home1(currentUserGlobal));
    } else {
      this.props.replaceRoute(Routes.Home1(currentUserGlobal));
    }
  }

}

AppRegistry.registerComponent('login', () => login);