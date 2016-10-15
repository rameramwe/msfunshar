 

  <View style={{flex:1}}>
  <Modal
  animationType={this.state.animationType}
  transparent={this.state.transparent}
  visible={this.state.modalVisible}
  onRequestClose={() => {this._setModalVisible(false)}}
  >
  <View style={[styles.Mcontainer, modalBackgroundStyle]}>
  <View style={[styles.MinnerContainer, innerContainerTransparentStyle]}>

  <View>
  <Text style={{color:'white', fontSize:16 , marginLeft:8}}>Meine Objekte</Text>
  <View style ={{ flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "center"}}>
   
  {this._renderImage()}
   
  </View>

<View style={{flex:1,flexDirection:'row',alignItems:'center', justifyContent:'flex-end'}}>
   <View style={{flex:0.3,alignItems:'center'}}>
   </View>
   <View style={{flex:0.2 , paddingTop:25,alignItems:'center'}}>
   <IcoButton
   source={require('funshare/src/img/dislike.png')}
   onPress={this._setModalVisible.bind(this, false)}
   icostyle={{width:60, height:60}}
   />
   </View>

   <View style={{flex:0.2 , paddingTop:25,alignItems:'center',justifyContent:'center'}}>
   <IcoButton
   source={require('funshare/src/img/like.png')}
   onPress={this.connfirm.bind(this)}
   icostyle={{width:60, height:60}}
   />
   </View>
   <View style={{flex:0.3,alignItems:'center'}}>
   </View>
 </View>

  </View>
  </View>
  </View>
  </Modal>
  </View>