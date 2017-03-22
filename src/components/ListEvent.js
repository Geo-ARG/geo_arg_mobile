import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, ScrollView, Image, Dimensions, TouchableHighlight } from 'react-native'
import { Container, Content, Card, CardItem, Left, Body, Thumbnail, Title, Text, Button, Header, Footer, FooterTab} from 'native-base';
import { fetchEvents, joinGame, clearEvents } from '../actions'
import Carousel from 'react-native-looped-carousel'
const {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialIcons';
const iconhome = (<Icon name="home" size={30} color="white" />)
const iconinfo = (<Icon name="info" size={30} color="white" />)
const iconback = (<Icon name="fast-rewind" size={30} color="white" />)

var styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  loading: {
    height: height,
    width: width,
    top: 0
  },
  gameEventButton:{
    width: width,
    height: height * 0.08,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signInButton: {
    height: 60,
    width: width,
    alignSelf: 'stretch',
    backgroundColor: 'rgb(138, 208, 49)',
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  }
}

class ListEvent extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.fetchEvents()
  }

  componentWillUnmount () {
    this.props.clearEvents()
  }

  render () {
    return (
      <Container>
        <Header style={{height: height * 0.1}}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigator.pop()}
            >
              <Icon size={25} color={'white'} name='arrow-back' />
              <Title> Back</Title>
            </Button>
          </Left>
        </Header>
        <View style={{height: height * 0.9, justifyContent: 'center', paddingTop: 20}}>
          <Image
            style={{flex: 1, width:'100%', height:'100%', position:'absolute'}}
            source={require('../assets/bglistevent.jpg')}
          />
          <View>
            {this.props.events.length > 1
            ?
            <View style={{width: width, padding: 10, backgroundColor: '#353535'}}><Text style={{color: '#FFFFFF', textAlign: 'center'}}>Swipe Events Left or Right</Text></View>
            :
            false}
            <Carousel
              delay={5000}
              style={{height: height * 0.87, width: width}}
              bullets={false}
            >
              {this.props.events.length < 1
                ?
                <Image style={styles.loading} source={require('../assets/loading.gif')} />
                :
                this.props.events.map((listevent, index) => {
                  return (
                    <View key={index} style={{flex: 1, marginLeft:'0%', marginRight:'0%', borderRightColor: '#FFFFFF', borderRightWidth: 3, borderLeftColor: '#FFFFFF', borderLeftWidth: 3, marginTop:'0%', height: '90%'}}>
                      <Image style={{flex: 1, width: '100%', height: '100%'}} source={require('../assets/bglist1.jpg')} />
                      <View style={{alignItems: 'center', padding: 10, width: width, height: height * 0.35, marginTop: 0, backgroundColor: 'rgba(0,0,0, .5)', position: 'absolute', bottom: 0}}>
                        <Text style={{fontSize: 25, color: '#FFF'}}>{listevent.title}</Text>
                        <Text style={{color: '#DDD', marginTop: 10}}>{listevent.description}</Text>
                        <Text style={{color: '#DDD'}}>Date: {listevent.date.toString().slice(0,10)}</Text>
                        <Text style={{color: '#DDD', marginBottom: 20}}>Place: {listevent.place}</Text>
                        <View style={{ backgroundColor: 'orange', padding: 5, justifyContent: 'center', borderRadius: 8}}><Text style={{color: 'black'}}>{listevent.eventScore} pts</Text></View>
                      </View>
                      <View>
                        <Button style={styles.gameEventButton} onPress={()=>{
                            this.props.joinGame(listevent)
                            this.props.navigator.push({page: 'game'})
                          }}>
                          <Text style={{color: 'white', marginRight: '10%', fontSize: 20, alignItems: 'center'}}>Join Now</Text>
                        </Button>
                      </View>
                    </View>
                  )
                })
              }
            </Carousel>
          </View>
        </View>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.events
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEvents: () => dispatch(fetchEvents()),
    joinGame: (eventData) => dispatch(joinGame(eventData)),
    clearEvents: () => dispatch(clearEvents())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListEvent)
