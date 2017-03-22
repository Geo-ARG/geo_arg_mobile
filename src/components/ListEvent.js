import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, ScrollView, Image, Dimensions, TouchableHighlight } from 'react-native'
import { Container, Content, Card, CardItem, Left, Body, Thumbnail, Title, Text, Button, Header, Footer, FooterTab} from 'native-base';
import { fetchEvents, joinGame, clearEvents } from '../actions'
import Carousel from 'react-native-looped-carousel'
import Icon from 'react-native-vector-icons/MaterialIcons';
import catImage from '../assets/loading.gif'

const {height, width} = Dimensions.get('window');

var styles = {
  container: {
    flex: 1, justifyContent: 'center',
  },
  header: {
    height: height * 0.1
  },
  content: {
    height: height * 0.9, paddingTop: 0, marginTop: 0
  },
  backgroundImage:{
    flex: 1, width:'100%', height:'100%', position:'absolute'
  },
  swipeView: {
    width: width, padding: 10, backgroundColor: '#353535'
  },
  swipeText: {
    color: '#FFFFFF', textAlign: 'center'
  },
  carousel: {
    height: height * 0.87, width: width
  },
  loading: {
    height: height * 0.9, width: width
  },
  gameEventButton:{
    width: width, height: height * 0.08, bottom: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
  },
  gameEventButtonText: {
    color: 'white', marginRight: '10%', fontSize: 20, alignItems: 'center'
  },
  signInButton: {
    height: 60, width: width, alignSelf: 'stretch', backgroundColor: 'rgb(138, 208, 49)', margin: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center'
  },
  eventsView: {
    flex: 1, marginLeft:'0.1%', marginRight:'0.1%', marginBottom:'0.3%', height: '90%'
  },
  eventsCardView: {
    flex: 1, width: '100%', height: '100%', marginTop: 5
  },
  listEventView: {
    alignItems: 'center', padding: 10, width: width, height: height * 0.35, marginTop: 0, backgroundColor: 'rgba(0,0,0, .5)', position: 'absolute', bottom: 60
  },
  listEventTitle: {
    fontSize: 30, color: '#FFF'
  },
  listEventDescription: {
    fontSize: 20, color: '#DDD', marginTop: 10
  },
  listEventDate: {
    fontSize: 20, color: '#DDD'
  },
  listEventPlace: {
    fontSize: 20, color: '#DDD', marginBottom: 20
  },
  listEventScore: {
    backgroundColor: '#F5D76E', padding: 5, justifyContent: 'center', borderRadius: 8
  },
  listEventScoreText: {fontSize: 20, color: 'white', padding: 10, fontWeight: 'bold'}
}

class ListEvent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      size: { width, height },
      month: ''
    }
  }

  componentDidMount () {
    this.props.fetchEvents()
  }

  // componentWillUnmount () {
  //   this.props.clearEvents()
  // }

  render () {
    return (
      <Container>
        <Header style={styles.header}>
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
        <View style={styles.content}>
          <Image
            style={styles.backgroundImage}
            source={require('../assets/bglistevent.jpg')}
          />
          <View>
            {this.props.events.length > 1
            ?
            <View style={styles.swipeView}><Text style={styles.swipeText}>Swipe Events Left or Right</Text></View>
            :
            false}
            <Carousel
              delay={5000}
              style={styles.carousel}
              bullets={false}
            >
              {
                this.props.events.map((listevent, index) => {
                  let formattedDate = new Date(listevent.date).toString().split(' ');
                  return (
                    <View key={index} style={styles.eventsView}>
                      <Image style={styles.eventsCardView} source={require('../assets/bglist1.jpg')} />
                      <View style={styles.listEventView}>
                        <Text style={styles.listEventTitle}>{listevent.title}</Text>
                        <Text style={styles.listEventDescription}>{listevent.description}</Text>
                        <Text style={styles.listEventDate}>Date: {formattedDate[0]}, {formattedDate[2]} {formattedDate[1]} {formattedDate[3]}</Text>
                        <Text style={styles.listEventPlace}>Place: {listevent.place}</Text>
                        <View style={styles.listEventScore}><Text style={styles.listEventScoreText}>{listevent.eventScore} pts</Text></View>
                      </View>
                      <View>
                        <Button style={styles.gameEventButton} onPress={()=>{
                            this.props.joinGame(listevent)
                            this.props.navigator.push({page: 'game'})
                          }}>
                          <Text style={styles.gameEventButtonText}>Join Now</Text>
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
