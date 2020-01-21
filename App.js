import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation';


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { articles:[] }
  }
  componentDidMount() { 
    fetch("https://qiita.com/api/v2/items?page=1&per_page=5&query=react+native")
      .then( (response) => response.json() )
        .then( (responseJson) => {
          if(typeof responseJson == "object" && responseJson.length > 0 ){
            this.setState({articles:responseJson})
          }
        })
  }
  render(){ 
    const { articles } = this.state
    return( 
      <View style={styles.container} >
        <FlatList
          data={articles}
          renderItem={({item}) => {
            return(<View><Text>{item.title}</Text></View>)
          }}
          keyExtractor = { item => item.title } 
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#F5FCFF',
  },
  welcome: {
    fontSize:20,
    textAlign:'center',
    margin:10,
  },
  instructions: {
    textAlign:'center',
    color:'#333333',
    marginBottom:5,
  },
})


export default createAppContainer(createStackNavigator({
  Home:{
    screen:Home
  },
}))

