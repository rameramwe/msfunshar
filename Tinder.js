'use strict';
import React, {Modal,ActivityIndicator, Component } from 'react';

import  {TouchableOpacity,StyleSheet,Dimensions, Text, View, Image} from 'react-native';
import IcoButton from 'funshare/src/components/icobutton';
import SwipeCards from 'react-native-swipe-cards';
import firebase from 'firebase';
import Routes from 'funshare/Routes';
import Loading from 'funshare/src/components/Loading';
var deviceheight = Dimensions.get('window').height/(3/2)  ;
var deviceWidth = Dimensions.get('window').width-30  ;
var Cards = []
var currentLikedItem = null;
let NoMoreCards = React.createClass({
  
  render() {

    return (
      <View style={styles.noMoreCards}>
       
      </View>
      )
  }
})


const Cards2 = [

]

export default React.createClass({

  Card(x) {
    currentLikedItem=x;

    return (
      <View key= {x} style= {{flex:2}}>
      <View style={styles.card}>
      <TouchableOpacity
      activeOpacity={ 0.7}
      onPress={() => {this.props.goToDetails(x.description ,x.image,   x.title, x.uidOfLikedItem ,x.keyOfWantedItem , x.username )}}
      >

      <View style= {{width:deviceWidth, height:deviceheight-50 }} >

      <Image style={styles.thumbnail} resizeMode={Image.resizeMode.cover} source={{uri: x.image}} />

      </View>
      </TouchableOpacity>
      <View style={{marginLeft:10, marginRight:10,borderBottomWidth:1,borderColor:'#e3e3e3', height:25, flexDirection:'row' }}>
      <View style={{flex:1}}>
      <Text numberOfLines={1} style={{fontSize:14, fontWeight:'bold', color:'#444'}}>{x.title} </Text>
      </View>
      <View  style = {{flex:1,alignItems:"flex-end"}} >
      <Text style={{fontSize:14, fontWeight:'300', color:'#444'}}>{x.username} </Text>
      </View>
      </View>
      <View style={{  height:25,marginLeft:10, marginRight:10, flexDirection:'row' , flex:1 }}>
      <View style = {{flex:1}} >
      <Text numberOfLines={1} style={{fontSize:14, fontWeight:'300', color:'#444'}}>{x.description} </Text>
      </View>
      <View style={{flex:1}}>
      <Text style={{fontSize:14, fontWeight:'300', color:'#444'}}>{""} </Text>
      </View>

      </View>
      </View>
      <View style={{marginLeft:7,borderRadius:2, marginRight:7,borderWidth:1,borderColor:'#e3e3e3', height:5}}>

      </View>
      <View style={{marginLeft:14, marginRight:14,borderRadius:2,borderWidth:1,borderColor:'#e3e3e3', height:5}}>
      </View>
      </View>
      )
    },
    handleYup (card) {

    },
    goBack (card) {

      this.refs['swiper']._goToPreviousCard()
    },

    handleNope (card) {
      this.refs['swiper']._goToNextCard() 
    },
    componentDidMount() {

      this.rami().then((rm) => {
        console.log("re");
        this.setState({
          outOfCards: false
        })
      });
    },
    componentWillUnmount() {

      //Cards=[];
    },
    rami(){
      
     this.setState({
      loading: true
    });
      var self = this ;
      var ar = [];
      return new Promise((next, error) => {
        var i = 0;
        var num=0;


        firebase.database()
        .ref('categories')
        .child('swiper-all')
        .once('value')
        .then(function(snapshot) {
          num =snapshot.numChildren();
          //alert(num);
          snapshot.forEach(function(childSnapshot) {

            firebase.database()
            .ref('categories')
            .child('swiper-all').child(childSnapshot.key).once('value').then(function(snapshot) {
              var piclink = snapshot.val().itemPic;
              var desc = snapshot.val().description;
              var title = snapshot.val().title;
              var userofitem = snapshot.val().username;
              var keyOfWantedItem = snapshot.key;
              var uidOfLikedItem=snapshot.val().uid;
              // console.log(uidOfLikedItem);



              var im = {image:piclink ,title:title , description:desc , location:'9' , uidOfLikedItem:uidOfLikedItem,keyOfWantedItem:keyOfWantedItem , username:userofitem }
              ar.push(im);
              

              i++;
              if (i==num){
               
                self.reflectArray(ar).then((rm) => {
                Cards = rm 
                });
                
                var rm = "Rami function is finished";
                next(rm);
              }

            });

          })
        });

      }); 

    },

    reflectArray(array)
    {
      this.setState({loading:false
                });
       return new Promise((next, error) => {
      let reflect = [];
      for(var i=array.length-1 ; i>= 0 ; i --)
      {
        Cards.push(array[i]);
      }
    })
      next(Cards);
        
    },
    getInitialState() {
      return {
        loading:false,
        cards: Cards,
        outOfCards: false
      }
    },
 
    cardRemoved (index) {
      console.log(`The index is ${index}`);

      let CARD_REFRESH_LIMIT = 3

      if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
        console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

        if (!this.state.outOfCards) {
          console.log(`Adding ${Cards2.length} more cards`)

          this.setState({
            cards: this.state.cards.concat(Cards2),
            outOfCards: true
          })
        }

      }

    },
    gotToFuck(){
      this.props.replaceRoute(Routes.addstuff())
    },
    addtofavorite (x){
      if(x)
      {
        var offerData = {
          keyOfWantedItem: x.keyOfWantedItem,
          uidOfLikedItem: x.uidOfLikedItem,   
          created:firebase.database.ServerValue.TIMESTAMP
        };
        var uploadTask = firebase.database()
        .ref('profiles')
        .child(currentUserGlobal.uid)
        .child('favorite');
      
  
        var favoriteKey = uploadTask.push(offerData).key ;
        if (favoriteKey) alert("Du hast den Item in den Wünschliste")
      }

    },
    goToDetails(currentLikedItem)
    { 
      if (currentLikedItem) 
      this.props.goToDetails(currentLikedItem.description ,currentLikedItem.image,   currentLikedItem.title, currentLikedItem.uidOfLikedItem ,currentLikedItem.keyOfWantedItem ,currentLikedItem.username );
    },
    render() {


      return (
      <View style = {{flex:1, alignItems:'center'}} >

      <View style= {{flex:1.1}} >
      <Loading loading = {this.state.loading} />

      <SwipeCards

      ref = {'swiper'}
      cards={this.state.cards}
      loop={true}
      containerStyle = {{flex:1,  backgroundColor: 'white',justifyContent:'center', alignItems:'center', marginTop:10}}
      renderCard={(cardData) => this.Card(cardData)}  
      renderNoMoreCards={() => <NoMoreCards />}
      showYup={false}
      showNope={false}
      handleYup={this.handleNope}
      handleNope={this.handleNope}
      //cardRemoved={this.cardRemoved}
      />
      </View>


      <View style = {{ flex:0.2 , justifyContent:'flex-end'}}>
      <View style={{flex : 1 ,flexDirection:'row' ,width:deviceWidth , alignItems:'flex-end'}}>

      <View style={{flex:0.25,alignItems:'center'}}>
      <IcoButton
      onPress={this.goBack }
      source={require('funshare/src/img/back.png')}
      icostyle={{width:45, height:45}}
      />
      </View>

      <View style={{flex:0.25,alignItems:'center'}}>
      <IcoButton
      onPress={() => this.handleNope()}
      source={require('funshare/src/img/dislike.png')}
      icostyle={{width:60, height:60}}
      />
      </View>

      <View style={{flex:0.25,alignItems:'center'}}>
      <IcoButton
      source={require('funshare/src/img/like.png')}
      onPress={() => {this.goToDetails(currentLikedItem)}}
      icostyle={{width:60, height:60}}
      />
      </View>

      <View style={{flex:0.25,alignItems:'center'}}>
      <IcoButton

      source={require('funshare/src/img/wuncbt.png')}
      onPress={()=>{this.addtofavorite(currentLikedItem)}}
      icostyle={{width:45, height:45}}
      />
      </View>

      </View> 

      </View>

      </View>
      )
    }
  })

  const styles = StyleSheet.create({
    card: {

      width: deviceWidth,
      height: deviceheight,
      borderWidth:2,
      borderColor:'#e3e3e3',
      borderRadius:2,
    },
    thumbnail: {
      borderRadius:2,
      flex:1,width:null, height:null
    },
    text: {
      fontSize: 20,
      padding:10,
    },
    noMoreCards: {
      flex: 1,
      backgroundColor:'white',
      height:deviceheight+10,
      width:deviceWidth,
      justifyContent: 'center',
      alignItems: 'center',
    }
  })