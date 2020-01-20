import React, { Component } from 'react'
import { View, Image, ImageStore, Button, AsyncStorage, TouchableOpacity, ActivityIndicator, FlatList, SectionList, Text, TextInput, DatePickerIOS, DatePickerAndroid, Share, Platform, Dimensions, Modal } from 'react-native'
import ImageEditor from "@react-native-community/image-editor"
import { WebView } from 'react-native-webview'


class Archive extends Component {
  static navigationOptions = {
    title: 'ストックした記事',
    headerTintColor:'white',
    headerBackTitleStyle:{color:'white'},
    headerStyle:{backgroundColor:"#00aced"},
  }
  constructor(){
    super()
    this.state = {threads:[]}}
    componentDidMount() {
      this.getData()
    }
    getData(){ 
      AsyncStorage.getAllKeys((err,keys) => {
        if(err){
          console.error(err)
          return false
        } else {
          AsyncStorage.multiGet(keys, (err,data) => {
            threads=data.map((i) => { 
              returnJSON.parse(i[1])
            })
            this.setState({threads})
            return true
          })
        }
      })
    }
    render() {
      const {threads}=this.state
      const {width}=Dimensions.get('window')
      return (
        <View style={{flex:1,flexDirection:'row',width:'100%',}}>
          <FlatList data={threads}
            renderItem={({item})=>{
            return (
              <View style={{flex:1,flexDirection:'row',width:'100%',borderBottomWidth:2,borderColor:'#f5f5f5'}}>
                <Image style={{width:50,height:50}}
                       source={{uri:item.thumbnail}}
                />
                <View style={{width: width - 50}}>
                  <View style={{flex:1,flexDirection:'column'}}>
                    <Text style={{color:'#000'}}>{item.title}</Text>
                    <Text style={{color:'#ababab',fontSize:10}}>{item.domain}</Text>
                  </View>
                </View>
              </View>
            )
            }}
           />
          </ View>
        )
    }
}










export default class App extends Component {
  constructor() {
    super()
    this.state = { 
      position: {},
      uri: "",
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
            this.cropImage('https://1.bp.blogspot.com/-s7wD--x4LBo/WUJZO318J0I/AAAAAAABE1k/cLyYpUhHxzou8EfHWbcd02LpnTfHU006gCLcBGAs/s1600/logo_sml.png')}}
            title={"crop a picture."}
          />
      </View>
    )
  }
}

