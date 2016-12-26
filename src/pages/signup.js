'use strict';
import React, { Component } from 'react';
import  {
  AppRegistry,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  BackAndroid,
  Modal,
  Dimensions
  
} from 'react-native';

import Button from '../components/button';
import Routes from 'funshare/Routes';
import Login from './login';
import firebase from 'firebase';
import Actions from 'funshare/Actions';
import IcoButton from 'funshare/src/components/icobutton';
var deviceheight = Dimensions.get('window').height ;
var devicewidth = Dimensions.get('window').width ;


import styles from '../styles/common-styles.js';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
} = FBSDK;

var Loginfbb = React.createClass({
  render: function() {
    return (
      <View>
      <LoginButton
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
      );
  }
});

export default class signup extends Component {

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.goBack);
  }
  componentDidMount() {

    BackAndroid.removeEventListener('hardwareBackPress', this.goBack);
  }

  exit(){

    this.props.replaceRoute(Routes.login());
    return true;
  }


  constructor(props){
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      email: '',
      password: '',
      name: '',
      modalVisible: false
    };
  }

  _setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  signup(){

    this.setState({
      modalVisible: true
    });
    var save = this;
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(function() {
      var user = firebase.auth().currentUser;

      user.updateProfile({
        photoURL: "https://firebasestorage.googleapis.com/v0/b/funshare-c6017.appspot.com/o/default%2Fmale-user-shadow_318-34042.png?alt=media&token=2d4bf3a1-2fef-4aea-9b17-2cd471d4316e",
        displayName: save.state.name,

      }).then(function() {
        save.goToHome1();
      }, function(error) {

      });
    }, function(error) {
      alert("Signup failed")
      save.setState({
        modalVisible: false
      });
    });

  }
  goBack(){
    this.props.replaceRoute(Routes.login())
  }

  goToHome1(){
    Actions.login({
      email: this.state.email,
      password: this.state.password
    });

  }

  render() {
    var spinner =  
    ( <ActivityIndicator

      size="large" 
      color="white"/> ) 
    return (



      <Image
      resizeMode={Image.resizeMode.cover}
      source={require('../img/background.png')}
      style = {styles.backgroundImage}
      >

      <ScrollView style= {{flex:1}} >  
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
      <View style= {{position: 'absolute',
      top: 10,
      left: 10,}}>
      <IcoButton
      source={require('funshare/src/img/arrow.png')}
      onPress={this.goBack.bind(this)}
      icostyle={{width:25, height:25}}
      />
      </View>
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


      <View style={{flex:0.4,justifyContent:'flex-end',marginTop:deviceheight/16}}>
      <View style = {styles.textinputcontainer}>
      <TextInput
      maxLength = {18}
      style={styles.textinput}
      onChangeText={(text) => this.setState({name: text})}
      keyboardType={"email-address"}
      placeholder={"Vollständiger Name"}
      onSubmitEditing={() => this.email.focus()}
      returnKeyType="next"
      placeholderTextColor="white"
      underlineColorAndroid="transparent"
      />
      </View>
      <View style = {styles.textinputcontainer}>
      <TextInput
      ref={(ref) => this.email = ref}
      style={styles.textinput}
      onChangeText={(text) => this.setState({email: text.replace(/\s/g, '')})}
      keyboardType={"email-address"}
      value={this.state.email}
      placeholder={"E-Mail Adresse"}
      onSubmitEditing={() => this.password.focus()}
      returnKeyType="next"
      placeholderTextColor="white"
      underlineColorAndroid="transparent"
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
      onSubmitEditing={ this.signup.bind(this)}  
      placeholderTextColor="white"
      underlineColorAndroid="transparent"     
      />       
      </View>

      <View style={{ margin:5,flexDirection: 'row'}}>
      <Button
      ref={(ref) => this.btn = ref}
      text="Registrieren"
      onpress={this.signup.bind(this)}
      button_styles={styles.primary_button}
      button_text_styles={styles.primary_button_text} />
      </View>

      </View>

      <View style={{flex:0.1,justifyContent:'center',alignItems:'center'}}> 

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
  }
  AppRegistry.registerComponent('signup', () => signup);