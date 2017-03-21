import React from 'react'
import { View, Text, TouchableOpacity, TextInput, Dimensions, ScrollView } from 'react-native'
import { Card, CardItem, Button, Content, Container, Header, Left, Right } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { sendLocation, watchLocation, scanNearby, fetchQuestList, checkAnswer } from '../actions'

const {height, width} = Dimensions.get('window');

class GameEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: '',
      answerMode: false,
      userEventId: '',
      userAnswer: ''
    };
    this.handleVerification = this.handleVerification.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(){
    this.setState({answerMode: false})
    this.props.checkAnswer(this.state.userEventId, this.state.userAnswer)
  }

  handleVerification(quest){
    switch (quest.Quest.type) {
      case 'Text':
        this.setState({
          answerMode: true,
          userEventId: quest.id
        })
        break;
      case 'Coordinate':
          this.props.checkAnswer(quest.id, `${this.state.latitude}, ${this.state.longitude}`)
        break;
      case 'Photo':
          //take foto
        break;
      default:
        return
    }
  }

  componentDidMount(){
    this.props.fetchQuestList(this.props.userId, this.props.eventId)
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        if (this.props.location.locationId === 'Unknown'){
          this.props.sendLocation(position.coords, this.props.userId)
        } else {
          this.props.watchLocation(position.coords, this.props.location.locationId)
        }
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
  }

  componentWillUnmount(){
    navigator.geolocation.clearWatch(this.watchId);
  }

  render(){
    return(
      <Container style={{backgroundColor: '#F5F5F5'}}>
        <Header style={{backgroundColor: '#2a3d8e', width: '100%', height:height * 0.1}}>
          <Left>
            <Button
              onPress={() => this.props.navigator.pop()}>
              <Text style={{color: '#FFFFFF'}}> <Icon name='arrow-back' /> Back </Text>
            </Button>
          </Left>
          <Right>
            <Button
              onPress={() => this.props.scanNearby(this.state.latitude, this.state.longitude)}
              style={{backgroundColor: '#6fe6e2', alignSelf: 'center'}}>
                <Text>Scan Nearby Player</Text>
            </Button>
          </Right>
        </Header>
        <Content style={{height: height}}>
          <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 15, marginBottom: 35 }}>
            <Text style={{ fontSize: 30}}>GAME EVENT</Text>
            <Text>Latitude: {this.state.latitude}</Text>
            <Text>Longitude: {this.state.longitude}</Text>
            {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
            <Text></Text>
            <Text></Text>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>User Nearby</Text>
              <ScrollView>
                {this.props.location.length < 1 ? null : this.props.location.nearbyUser.map((nearbyUser, index) => {
                  return nearbyUser.Users[0].id === this.props.UserId ? null : (
                    <Text key={index}>ID: {nearbyUser.Users[0].id} Username : {nearbyUser.Users[0].username}</Text>
                  )
                  })
                }
              </ScrollView>
            <Text></Text>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>Quest List</Text>
              {this.props.userEvent.length < 1 ? null : this.props.userEvent.map((quest, index) => {
                let input
                if (quest.id === this.state.userEventId && this.state.answerMode){
                  input = (
                    <TextInput
                      style={{height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white'}}
                      onChangeText={userAnswer => this.setState({userAnswer})}
                      value={this.state.userAnswer}
                      maxLength={25}
                      blurOnSubmit={true}
                      autoFocus={true}
                      onSubmitEditing={this.handleSubmit}
                      onBlur={() => this.setState({answerMode: false})}
                      returnKeyType={'send'}
                    />
                  )
                }
                let complete = quest.completion ? {color: 'lightgreen'} : {color: '#FFFFFF'}
                return (
                  <View key={index} style={{ backgroundColor: '#353535', marginTop: 10, width: width * 0.8, padding: 10, paddingTop: 0, borderRadius: 8, borderBottomWidth: 1, borderBottomColor: '#222222'}}>
                    <TouchableOpacity onPress={() => this.handleVerification(quest)}>
                      <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={complete}>{quest.completion} </Text>
                        <Text style={complete}>Title : {quest.Quest.title} </Text>
                        <Text style={complete}>Description : {quest.Quest.task} Type : {quest.Quest.type}</Text>
                      </View>
                    </TouchableOpacity>
                    {input}
                  </View>
                )
              })}
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    location : state.location,
    userId : state.userId,
    userEvent : state.userEvent,
    eventId : state.eventData > 1 ? state.eventData.id : 2,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({sendLocation, watchLocation, scanNearby, fetchQuestList, checkAnswer}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GameEvent)
