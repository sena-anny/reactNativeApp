import React, { Component } from 'react'
import { View, Image, Button, TouchableOpacity, ActivityIndicator, FlatList, Text, TextInput } from 'react-native'

export default class App extends Component {
  constructor() {
    super()
    this.state = { text: '' }
  }
  showWarning() {
    console.warn('pressed!!!')
  }
  render() {
    const data = [
      {str:'GuidovanRossum',key:'Guido'},
      {str:'MatsumotoYukihiro',key:'Matz'},
      {str:'RasmusLerdorf',key:'Rasmus'}
    ]
    return (
      <View style={ {
          paddingTop: 50,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F5FCFF'
        } }>
        <TextInput
          style={ {
            width: '100%',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc'
          } } 
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <FlatList 
          data={data}
          renderItem={({item}) => { return <Text key={item.key}>{item.str}</Text> } }
        />
        <ActivityIndicator />
        <TouchableOpacity onPress={() => this.showWarning() }>
          <Image style={{width: 64, height: 64 }} 
                 source={require('./assets/sample.png')} />
        </TouchableOpacity>
        <Button onPress={() => this.showWarning() } title={'Press'} />
      </View>
    )
  }
}