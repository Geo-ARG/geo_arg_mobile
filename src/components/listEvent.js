import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchEvents } from '../actions'

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Image
} from 'react-native'

class ListEvent extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.fetchEvents()
  }

  render () {
    return (
      <View style={styles.events}>
        <View style={{backgroundColor: '#daffb3'}}>
          <Button
            onPress={() => this.props.navigator.push({
              page: 'home'
            })}
          />
        </View>
        <Text style={styles.title}>Events</Text>
        <ScrollView style={styles.scroll}>
          {this.props.events.length < 1 ? <Image style={styles.loading} source={require('../assets/loading.gif')} /> : <Text></Text>}
          {this.props.events
            .map((eachEvents, index) => {
             return (
               <Text style={styles.list} key={index}>
                 {eachEvents.title}
               </Text>
             )
           })}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scroll:{
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#ccffee',
    borderRadius: 5
  },
  events: {
    flex: 0.8,
    backgroundColor: 'skyblue'
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 15,
  },
  loading:{
    width: 100,
    height: 100,
    margin: 120
  },
  list: {
    padding: 3,
    marginLeft: 20,
    marginRight: 20,
    color: '#333333',
    marginBottom: 5,
    textAlign: 'center'
  }
})

const mapStateToProps = (state) => {
  return {
    events: state.events
    // .filter(eachEvents => (eachEvents.title === null ? '' : eachEvents.title).match(new RegExp(state.searchKey, 'i')))
    // .filter(eachEvents => eachEvents.title !== null && eachEvents.title !== '')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEvents: () => dispatch(fetchEvents())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListEvent)
