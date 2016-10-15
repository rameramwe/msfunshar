'use strict';
import React from 'react'; 
import{
  AppRegistry,
  AsyncStorage,
  Dimensions,
  Image,
  NativeModules,
  PropTypes,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Text
} from 'react-native';
import IcoButton from 'funshare/src/components/icobutton';
import IconBadge from 'react-native-icon-badge';
import StyleVars from 'funshare/StyleVars';
import Login from './login';
import firebase from 'firebase';
import Routes from 'funshare/Routes';
import DataStore from 'funshare/DataStore';
import Actions from 'funshare/Actions';
import SharedStyles from 'funshare/SharedStyles';
 
import IconButton from 'funshare/src/components/icotextButton';
 
const styles = StyleSheet.create({
  container: {
    flex:1,

  },
  inputContainer: {
   
    margin:20, 
    marginTop:10,
    marginBottom:0   
    
  },

  input: {
   
    textAlign: 'center',
    fontSize: 18,
    color: '#FF4470',
    fontWeight: 'bold',
  },

  username: {
    
    textAlign: 'center',
    fontSize: 23,
    fontWeight: 'bold',
  },
 
  profilePictureContainer: {
    
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center"
  },
  btnContainer:{
   
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',

    marginBottom: 5
  },

  profilePicture: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 5,

  },


 
 footer: {
  bottom: 0,
  left: 0,
  right: 0,
  height: 48,
  alignItems: "center",
  marginTop:37,
  paddingVertical: 15,
  backgroundColor: "rgba(255,255,255,0.1)",
  borderTopWidth: 1,
  borderTopColor: "rgba(255,255,255,0.5)"
},
footerText: {
  color: "white",
  fontSize: 14
},
IContainer:{
  alignItems:'flex-start',
  padding:3,
  backgroundColor: "rgba(255,255,255,0.1)",
}
});

class chatscreen extends React.Component {
 

 
  
  goToHome()
  {
    this.props.replaceRoute(Routes.Home());
  }
 
  render() {
   const TopNavigation = () => (
    <View style={{ padding: 10, flexDirection: 'row', backgroundColor: '#FF5C7E' }}>
  

     <View style={{ flex:0.4 , alignItems:'flex-start', justifyContent:'center' , margin:5  }}>
    <IcoButton
    
    source={require('funshare/src/img/swop.png')}
    onPress={this.goToHome.bind(this)}
    icostyle={{width:35, height:35}}
    />

    </View>
    
   

    <View style={{ flex:0.2 , alignItems:'center', justifyContent:'center'   }}>
    <IcoButton
    
    source={require('funshare/src/img/f.png')}
    icostyle={{width:45, height:45}}
    />
    </View>

    <View style={{ flex:0.4 , justifyContent:'center' , margin:5  }}>
     </View>
    </View>
    );
   return (

    <View style = {styles.container}>  
    <TopNavigation/>  
   <ScrollView>
<View style ={{flex:2,flexDirection:'row',  alignItems:'center',
    justifyContent:'center'
}}>

  
  <Text>Hi</Text>
  </View>
 
</ScrollView>
    </View>

    );
 }
  
}
  

export default chatscreen;