import React, { Component } from 'react'
import { View, Image, ImageStore, ImageEditor, Button, TouchableOpacity, ActivityIndicator, FlatList, SectionList, Text, TextInput, DatePickerIOS, DatePickerAndroid, Share, Platform, Dimensions, Modal } from 'react-native'
import { WebView } from 'react-native-webview'

export default class App extends Component {
  constructor() {
    super()
    this.state = { 
      position: {},
      uri: '',
      vibrate: false,
      text: '', 
      date: new Date(),
      threads: [],
      isLoading: true,
      isVisible: false
      }
  }
  cropImage(uri) {
    Image.getSize(uri, (width, height) =>{
      let cropData = {
        offset: {
          y: height / 3 ,
          x: width / 3
        },
        size: {
          height: height / 3,
          width: width / 3
        }
      }
      ImageEditor.cropImage(
        uri,
        cropData,
        (result) => {
          ImageStore.hasImageForTag(result, (hasImage) => {
            if ( hasImage > 0 ){
              this.setState({uri: result})
            }
          },(e) => {
            console.warn('イメージなし',e)
          })
        },(e) => console.warn('そもそも失敗',e)
      )
    })
  }
  render() {
    const {position, uri} = this.state
    //const { width } = Dimensions.get('window')
    //const {position} = this.state
    const data = [
      {str:'GuidovanRossum',key:'Guido'},
      {str:'MatsumotoYukihiro',key:'Matz'},
      {str:'RasmusLerdorf',key:'Rasmus'}
    ]
    const {date} = this.state
    return (
      <View 
        style = {{
          paddingTop: 50,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F5FCFF'
        }}>
          <Image 
            style={{
              width: 50,
              height: 50
            }}
            source={{uri: uri}}
          />
          <Image 
            style={{
              width: 50,
              height: 50
            }}
            source={require('./assets/sample.png')}
          />
          <Button onPress={() => {
            this.cropImage('https://www.tabikobo.com/world_heritage/mont_saint_michel/images/main1.jpg')}}
            title={"crop a picture."}
          />
      </View>
    )
  }
}

