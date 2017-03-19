import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, ScrollView, Image, Dimensions } from 'react-native'
import { Container, Content, Card, CardItem, Left, Body, Thumbnail, Text, Button, Icon } from 'native-base';
import { fetchEvents } from '../actions'

const {height, width} = Dimensions.get('window');

class ListEvent extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.fetchEvents()
  }

  render () {
    return (
      <Container>
        <Content>
          {this.props.events.length < 1 ? <Image style={styles.loading} source={require('../assets/loading.gif')} /> : <Text></Text>}
          {this.props.events
            .map((eachEvents, index) => {
              return (
                <Card key={index} >
                  <CardItem>
                    <Text style={{fontSize: 30, fontWeight: 'bold'}}>{eachEvents.title}</Text>
                  </CardItem>
                  <CardItem content>
                    <Text>{eachEvents.description}</Text>
                  </CardItem>
                </Card>
              )
            })}
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10
  },
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
    width: width,
    height: height
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

/*
<View style={{backgroundColor: '#daffb3'}}>
  <Button
    onPress={() => this.props.navigator.push({
      page: 'home'
    })}
  />
</View>
<View>
  <Text style={styles.title}>Events</Text>
  <ScrollView style={styles.scroll}>

  </ScrollView>
</View>
*/

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEvents: () => dispatch(fetchEvents())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListEvent)
