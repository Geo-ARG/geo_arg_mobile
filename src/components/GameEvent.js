import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import { Card, CardItem } from 'native-base'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { sendLocation, wathchLocation, scanNearby, fetchQuestList } from '../actions'

class GameEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 'Unknown',
      longitude: 'Unknown',
      error: '',
    };
  }

  componentDidMount(){
    this.props.fetchQuestList(this.props.userId, this.props.eventId)
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        if (this.props.location.locationId === 'Unknown'){
          this.props.sendLocation(position.coords, this.props.userId)
        } else {
          this.props.wathchLocation(position.coords, this.props.location.locationId)
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>GAME EVENT</Text>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        <Text></Text>
        <TouchableOpacity onPress={() => this.props.scanNearby(this.state.latitude, this.state.longitude)}>
          <View style={{backgroundColor: '#6fe6e2'}}>
            <Text>Scan Nearby Player</Text>
          </View>
        </TouchableOpacity>
        <Text></Text>
        <Text>User Nearby</Text>
        {this.props.location < 1 ? null : this.props.location.nearbyUser.map((nearbyUser, index) => {
          return (
            <Text key={index}>ID: {nearbyUser.Users[0].id} Username : {nearbyUser.Users[0].username}</Text>
          )
          })
        }
        <Text>Quest List</Text>
          {this.props.userEvent < 1 ? null : this.props.userEvent.map((quest, index) => {
            console.log(quest);
            return (
              <TouchableOpacity key={index}>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', height: 30}}>
                  <Text>{quest.Quest.completion}</Text>
                  <Text>{quest.Quest.title}</Text>
                  <Text>{quest.Quest.task}</Text>
                  <Text>{quest.Quest.type}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    location : state.location,
    userId : state.userId,
    userEvent : state.userEvent,
    eventId : 2,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({sendLocation, wathchLocation, scanNearby, fetchQuestList}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GameEvent)
