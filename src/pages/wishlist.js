'use strict';
import React, { Component } from 'react';
import  {
  AppRegistry,
  Text,
  Slider,
  TextInput,
  View,
  StyleSheet,
  Image,
  ScrollView,
  BackAndroid,
  TouchableHighlight,
  TouchableOpacity,
  ListView,
  Dimensions
} from 'react-native';
import Routes from 'funshare/Routes';
import IcotextButton from 'funshare/src/components/icotextButton';
import firebase from 'firebase';
import InputButton from 'funshare/src/components/icotextButton';
import IcoButton from 'funshare/src/components/icobutton';
import style from '../styles/common-styles.js';
var deviceWidth = Dimensions.get('window').width -6;
var deviceheight = Dimensions.get('window').height -(deviceWidth/2) ;
var piclinks=["fuck"];
var styles = StyleSheet.create({
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },
   separator: {
    alignSelf: 'flex-end',
     borderBottomWidth:1 , borderBottomColor:'#dcdcdc',
  
    width: Dimensions.get("window").width-100,
    
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "center"
  },

  item: {


    flex:1,
    marginBottom:5,
    
  },



  image: {
   
    width:60,
    height: 60,
    borderRadius: 30 ,
  }

});

export default class wishlist extends Component {
goToDetails(desc,piclink,title,gback){
 this.props.replaceRoute(Routes.details(desc,piclink,title,"wishlist"));
 // alert(desc + title + piclink);
}
 renderRow() {

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

     snapshot.forEach(function(childSnapshot) {

       firebase.database()
       .ref('items')
       .child(uid).child(childSnapshot.key).once('value').then(function(snapshot) {
        var piclink = snapshot.val().itemPic;
        var desc = snapshot.val().description;
        var title = snapshot.val().title;
        var id = snapshot.key;
        piclinks.push(piclink);
        images.push(

                  <TouchableHighlight
                  style={{flex:1}}
                  activeOpacity={ 0.75 }
                   onPress={self.goToDetails.bind(self,desc,piclink,title)}
                  >
                  <View style = {{flex:1,paddingTop:8, paddingBottom:12, paddingLeft:20, flexDirection:'row' ,backgroundColor:'white'}} >
                      <View style = {{flex:0.3 , justifyContent:'center' , alignItems:'center'}}>
                      <Image
                      style={ styles.image }
                      source={{uri: piclink}}
                      /> 
                     </View>
                     <View style = {{flex:1 , flexDirection:'row'}}>
                      <View style= {{flex:0.9,justifyContent:'center' , marginLeft:10}} >
                          <Text numberOfLines={1} style ={{fontWeight:'bold', marginLeft:10}}>{title}</Text> 
                          <Text numberOfLines={1} style ={{ marginLeft:10}}>{title}</Text> 
                          <Text  numberOfLines={1} style ={{ marginLeft:10}}>{title}</Text> 
                           
                     </View>
                        <View style = {{flex:0.2, top:25 ,alignItems:'center', justifyContent:'center'}}>
                         <IcoButton
                           source={require('funshare/src/img/arrowrigh.png')}
                            icostyle={{width:20, height:20 }}
                            
                          />
                          </View>
                  </View>
                   </View>
                  </TouchableHighlight>
                
                  );

          i++;
          if (i==num){

           self.setState({
            dataSource: self.state.dataSource.cloneWithRows(images)
          });

          next(images);
        }

      });

    })


  });

}); 
}

constructor(props) {
  super(props);
  this.state = {
   dataSource: new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
  }) 
};
}

goToHome1()
{
   this.props.replaceRoute(Routes.Home1());
}

componentDidMount() {

  this.renderRow();
  var self=this;
  BackAndroid.addEventListener('hardwareBackPress', () => {

    self.props.replaceRoute(Routes.Home1());
    return true;
    
  });
  
}


details(desc,piclink,title){


 this.props.replaceRoute(Routes.fuck(desc,piclink,title));


}




render() {
  const TopNavigation = () => (
  <View style={{ padding: 10, flexDirection: 'row', backgroundColor: '#00D77F' }}>
  <View style={{ flex:0.3 , justifyContent:'center' , margin:5  }}>
  <TouchableOpacity
  onPress={this.goToHome1.bind(this)}
  style={{justifyContent:'center', flex:1}}
  >
  <Image 
  source={require('funshare/src/img/arrow.png')}
  style={{width:20, height:20}}
  />

  </TouchableOpacity>
  </View>
<View style={{ flex:0.1}}/>
  <View style={{ alignItems:'center', justifyContent:'center' , margin:5  }}>
     <Image 
      source={require('funshare/src/img/wishliste.png')}
      style={{width:35, height:35}}
  />
 
  </View>

  <View style={{ flex:0.4 , alignItems:'flex-end', justifyContent:'center' , margin:5  }}>


  </View>

  </View>
  );


  return(

  <View style= {style.backgroundImage}
  >

  <TopNavigation/>
  <ScrollView style={{ flex:1 }}>


  <ListView

  dataSource={this.state.dataSource}
  renderRow={(rowData) => <View>{rowData}</View>}
   renderSeparator={() => <View style={styles.separator} />}
  contentContainerStyle={{flex:1,paddingTop:20 ,backgroundColor:'white',}}/>







  </ScrollView>


  </View>
  );
}



}


AppRegistry.registerComponent('wishlist', () => wishlist);