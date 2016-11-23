  'use strict';
  import React, { Component } from 'react';
  import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    AsyncStorage,
    Modal,
    Dimensions,
    BackAndroid,
    TouchableHighlight
  } from 'react-native';

  import IcoButton from 'funshare/src/components/icobutton';
  import Header from '../components/header';
  import Login from './login';
  import firebase from 'firebase';
  import Routes from 'funshare/Routes';
  import DataStore from 'funshare/DataStore';
  import Actions from 'funshare/Actions';
  import SharedStyles from 'funshare/SharedStyles';
  import StyleVars from 'funshare/StyleVars';
  import Tinder from 'funshare/Tinder';
  var deviceWidth = Dimensions.get('window').width -6;
  var deviceheight = Dimensions.get('window').height -(deviceWidth/2) ;
  var modalheight = Dimensions.get('window').height/2 ;
  var piclinks=["fuck"];
  var image=[] ;

  const styles = StyleSheet.create({
    Mcontainer: {flex:1 ,  justifyContent: 'flex-end', }, 
    MinnerContainer: {flex:1,justifyContent:'flex-end' },
    buttonContainer: {
      paddingTop: 96,
      alignItems: "center"
    },
    reloadText: {
      textAlign: "center",
      marginVertical: 20
    },
    item: {

      width:deviceWidth/4,
      height: 80,
      borderColor: '#efefef',
      borderWidth: 1,
      margin:8,
      borderRadius:10,
    },
    image: {
      flex:1,
      alignItems: "center",
      justifyContent: "center",
      borderRadius:10,
      width:deviceWidth/4-2,
      height: 78 ,
    },
    imageContainer:{

      marginBottom:80
    },
    profilePictureContainer: {

      flexDirection: 'row',
      alignItems: "center",
      justifyContent: "center"
    },
    Picture: {
      width: 100,
      height: 100,
      borderRadius: 50,
      margin: 15,

    },

    button: { width: 256 }
  });
  export default class Home extends Component {
   rami() {

    var images= [];
    return new Promise((next, error) => {

      var self = this; 
      var i = 0;
      var num=0;
      var uid = firebase.auth().currentUser.uid;
      firebase.database()
      .ref('items')
      .child(uid)
      .once('value')
      .then(function(snapshot) {
       num =snapshot.numChildren();
        // alert(num);
        snapshot.forEach(function(childSnapshot) {

          firebase.database()
          .ref('items')
          .child(uid).child(childSnapshot.key).once('value').then(function(snapshot) {
            var id = snapshot.key;
            var piclink = snapshot.val().itemPic;
            var desc = snapshot.val().description;
            var title = snapshot.val().title;
            var uidOfOfferingUser = snapshot.val().uid;
            piclinks.push(piclink);
            images.push(
              <View >
              <TouchableHighlight
              activeOpacity={ 0.75 }
              style={ styles.item }
              onPress={self.handleOffereditems.bind(this,desc,piclink,title,uidOfOfferingUser)}
              >

              <View>
              <Image
              resizeMode={Image.resizeMode.cover}
              style={ styles.image }
              source={{uri: piclink}}
              /> 
              </View>    

              </TouchableHighlight>
              </View> );

            i++;
            if (i==num){


              next(images);
            }

          });
        })
      });
    }); 
  }
  
  _renderImage(){


   this.rami().then((images) => {
    image = images;
    if (!this.state.loaded1){
      this.setState({
        loaded1:true
      });

    }

  });
    //alert(image.length);
    return image;

  }
  constructor(props) {
    super(props);

    //this.fuck = this.fuck.bind(this);
    this.state = {

     image: [null],
     hi: "hi",
     loaded1: false,
     loaded: false,
     failed: false,
     animationType: 'fade',
     modalVisible: false,
     transparent: true,
   };
 }

 componentWillMount() {
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user);
  }
  else console.log("shit not logged in ");
});

  //Actions.auth();

}


componentDidMount() {
  var self=this;
  BackAndroid.addEventListener('hardwareBackPress', () => {

    self.props.replaceRoute(Routes.Home1());
    return true;
    
  });
  Actions.loadUser.completed.listen(this._onLoadUserCompleted.bind(this));
  Actions.logout.listen(this._onLogout.bind(this));
}



_setModalVisible = (visible) => {
  this.setState({modalVisible: visible});
};

connfirm(){

}

handleOffereditems (desc,piclink,title,uidOfOfferingUser) {
  alert(desc);
  console.log(desc);
  console.log(piclink);
  console.log(title);
  console.log(uidOfOfferingUser);

}

handleNope () {
 Tinder._goToNextCard() 
}
goToDetails(desc,piclink,title,uidOfLikedItem ,keyOfWantedItem){
  this.props.replaceRoute(Routes.details(desc ,piclink,title,uidOfLikedItem , keyOfWantedItem));
  
}

render(){
  var modalBackgroundStyle = {
    backgroundColor:   'rgba(0, 0, 0, 0.5)' ,
  };
  var innerContainerTransparentStyle =  
  { backgroundColor:   'rgba(0, 0, 0, 0.5)'}


  return (

    <View style={{  flex:1 , width: null,height: null }}>



    <View>

    <Modal
    animationType={this.state.animationType}
    transparent={this.state.transparent}
    visible={this.state.modalVisible}
    onRequestClose={() => {this._setModalVisible(false)}}
    >

    <View style={ {flex:1 ,justifyContent:'flex-end' } }>

    <View style= {{height:modalheight , backgroundColor:   'rgba(0, 0, 0, 0.7)'}} >
    <Text style={{color:'white', fontSize:16 , marginLeft:8}}>Etwas bieten ?</Text>

    <View>
    <ScrollView
    horizontal={true}
    style= {{ height: 400}} >
    
    <View
    onPress={() => {this.handleOffereditems()}}
    style = {{ flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: "center" }}>
      {this._renderImage()}
      </View>
      </ScrollView>
      </View>
      <View style={{position:'absolute', bottom:3 ,flex:1,marginLeft:20,marginRight:20,flexDirection:'row',alignItems:'center', justifyContent:'center'}}>


      <View style={{flex:0.25,alignItems:'center'}}>
      </View>

      <View style={{flex:0.25,alignItems:'center'}}>
      <IcoButton
      onPress={this._setModalVisible.bind(this, false)}
      source={require('funshare/src/img/dislike.png')}
      icostyle={{width:60, height:60}}
      />
      </View>


      <View style={{flex:0.25,alignItems:'center'}}>
      <IcoButton
      source={require('funshare/src/img/like.png')}
  //onPress={this.props._setModalVisible}
  icostyle={{width:60, height:60}}
  />
  </View>
  
  <View style={{flex:0.25,alignItems:'center'}}>
  </View>

  </View>

  </View>
  </View>
  </Modal>

  </View>

  <View style={{flex:1}}>
  <View style={{marginTop:12 ,alignItems:'center'}}>

  <View style={{flexDirection:'row' ,alignItems:'center' , justifyContent:'center'  }}>
  <View style={{flex:0.1 ,alignItems:'center'}}>
  <IcoButton
  source={require('funshare/src/img/profil.png')}
  onPress={this.goToProfile.bind(this)}
  icostyle={{width:40, height:40}}
  />
  </View>
  <Image

  source={require('../img/ifunshare.png')}
  style={{height:50, width:150 , }}

  />
  <View style={{flex:0.1,alignItems:'center'}}>
  <IcoButton
  source={require('funshare/src/img/ichat.png')}
  onPress={this.goToChat.bind(this)}

  icostyle={{width:40, height:40}}
  />
  </View>
  </View>
  </View>
  <Tinder _setModalVisible={this._setModalVisible.bind(this, true)} goToDetails={this.goToDetails.bind(this)} />

  </View>

  </View>
  );
}


_onLoadUserCompleted(user) {
  let currentUser = DataStore.getCurrentUser();


  if (currentUser.onboarded) {
    this.setState({ loaded: true });
  } else {
    this.props.replaceRoute(Routes.Home1(currentUser));
  }
}

_onLogout() {
  this.props.replaceRoute(Routes.login());
}
logout(){

  Actions.logout();

}
mystuff(){
  alert("hi")
  this.props.replaceRoute(Routes.addstuff());

}

goToChat(){
 this.props.replaceRoute(Routes.fuck());
}
goToProfile(){

 this.props.replaceRoute(Routes.Home1());

}



}

