import React, { Component } from 'react'
import { View, Image, Button, TouchableOpacity, ActivityIndicator, FlatList, Text, TextInput, DatePickerIOS, DatePickerAndroid, Share, Platform } from 'react-native'
import { WebView } from 'react-native-webview'

export default class App extends Component {
  constructor() {
    super()
    this.state = { 
      vibrate: false,
      text: '', 
      date: new Date(),
      position: {}
      }
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
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: '#F5FCFF'
        } }>
          <Text>
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
        <Button onPress={() => this.openShare()} title={'シェアを開く'} />
      </View>
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