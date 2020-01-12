import React, { Component } from 'react'
import { View, Image, Button } from 'react-native'

export default class App extends Component {
  render() {
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center' }}>
        <Image style={{width: 64, height: 64 }} 
               source={require('./assets/sample.png')} />
        <Button onPress={() => console.warn('pressed')} title={'Press'} />
      </View>
    )
  }
}