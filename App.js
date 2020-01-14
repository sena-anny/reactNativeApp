import React, { Component } from 'react'
import { View, Image, Button, TouchableOpacity, ActivityIndicator, FlatList, SectionList, Text, TextInput, DatePickerIOS, DatePickerAndroid, Share, Platform, Dimensions, Modal } from 'react-native'
import { WebView } from 'react-native-webview'

export default class App extends Component {
  constructor() {
    super()
    this.state = { 
      vibrate: false,
      text: '', 
      date: new Date(),
      position: {},
      threads: [],
      isLoading: true,
      isVisible: false
      }
  }
  showModal() {
    this.setState({isVisible: true})
  }
  closeModal() {
    this.setState({isVisible: false})
  }
  componentDidMount() {
    this.fetchThreds()
    // fetch("https://www.reddit.com/r/newsokur/hot.json").then((response) => response.json() )
    //   .then((responseJson) => {
    //     let threads = responseJson.data.children
    //     threads = threads.map(i => {
    //       i.key = i.data.url
    //       return i
    //     })
    //     this.setState({threads:threads, isLoading: false})
    //   }).catch((error) => console.warn(error) )
  }
  _fetchThreads(item) {
    return new Promise((resolve, reject) => {
      fetch(item.uri).then((response) => response.json())
        .then((responseJson) => {
          let threads = responseJson.data.children.slice(0,5)
          threads = threads.map(i => {
          i.key = i.data.url
          return i
        })
        return resolve({data:threads, title: item.title})
        }).catch((error) => reject(error) )
    })
  }
  fetchThreds() {
    let list = [
      {
        uri: "https://www.reddit.com/r/newsokur/hot.json",
        title: '人気'
      },
      {
        uri: "https://www.reddit.com/r/newsokur/controversial.json",
        title: '議論中'
      }
    ]
    Promise.all(list.map(i => this._fetchThreads(i)))
      .then(r => {
        this.setState({threads: r, isLoading: false})
      }).catch(e => {
        console.warn(e)
      })
  }
  async openDatePickerAndroid() {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: new Date(2020,4,20) 
      })
      if (action !== DatePickerAndroid.dismissedAction ){
        this.setState({date: new Date(year, month, day)})
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message)
       
    }
  }
  openShare() {
    Share.share({
      title: 'タイトル',
      message: 'description'
    }, {}).then((result, activityType )=> {
      if(result.action == Share.dismissedAction ){
        //シェアを中断
      }else if(result.action == Share.sharedAction ){
        //シェアを実行
      }else {

      }
    })
  }
  showWarning() {
    console.warn('pressed!!!')
  }
  render() {
    const {threads, isLoading} = this.state
    const { width } = Dimensions.get('window')
    const {position} = this.state
    const data = [
      {str:'GuidovanRossum',key:'Guido'},
      {str:'MatsumotoYukihiro',key:'Matz'},
      {str:'RasmusLerdorf',key:'Rasmus'}
    ]
    const {date} = this.state
    return (

      // <WebView 
      //   source={{uri:'https://amazon.co.jp/'}}
      //   style={{marginTop: 20}}
      //   scalesPageToFit={true}
      //   />
      <View style={ {
          paddingTop: 50,
          flex: 1,
          // flexDirection: 'row',
          // width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F5FCFF'
        } }>
          {/* <Modal visible={this.state.isVisible} 
            transparent={false}
            animationType={'slide' || 'fade'}
            presentationStyle={'fullScreen' || 'pageSheet' || 'formSheet' || 'overFullScreen'}
            >
              <View style={{ flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor: '#F5FCFF'}}>
                <Button onPress={()=>this.closeModal()} title="close modal" /> 
              </View>
            </Modal>
            <Button onPress={()=>this.showModal()} title="show modal" /> */}
          {isLoading ?
          <ActivityIndicator /> :
          <SectionList 
            renderItem={thread => {
              return (
                <View style={{flex:1,flexDirection:'row',width:"100%"}}>
                  <Image style={{width:50, height:50 }} source={{uri: thread.item.data.thumbnail}} />
                  <Text style={{width:width - 50}}key={thread.key}>{thread.item.data.title}</Text>
                </View>
              )
            }}
            renderSectionHeader={({section}) => <Text>{section.title}</Text>}
            sections = {threads}
            />
          // <FlatList 
          //   data={threads}
          //   renderItem={({item}) => {
          //     return (
          //       <View>
          //         <Text>
          //           {item.data.title}
          //         </Text>
          //       </View>
          //     )
          //   }}
          //   />
          }
      </View>

          /* <Text>
            {`${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`}
          </Text>

          {Platform.OS === 'ios' ? <DatePickerIOS
            style={{width:320}}
            date = {this.state.date}
            onDateChange = {date => {this.setState({date})}}
            minuteInterval={5}
            mode={'date' || 'time' || 'datetime'}
            /> : <Button onPress={() => this.openDatePickerAndroid()} title={'日にちを選ぶ'} />
           }
        <Button onPress={() => this.openShare()} title={'シェアを開く'} /> */
      //   <TextInput
      //     style={ {
      //       width: '100%',
      //       borderBottomWidth: 1,
      //       borderBottomColor: '#ccc'
      //     } } 
      //     onChangeText={(text) => this.setState({text})}
      //     value={this.state.text}
      //   />
      //   <FlatList 
      //     data={data}
      //     renderItem={({item}) => { return <Text key={item.key}>{item.str}</Text> } }
      //   />
      //   <ActivityIndicator />
      //   <TouchableOpacity onPress={() => this.showWarning() }>
      //     <Image style={{width: 64, height: 64 }} 
      //            source={require('./assets/sample.png')} />
      //   </TouchableOpacity>
      //   <Button onPress={() => this.showWarning() } title={'Press'} />
    )
  }
}