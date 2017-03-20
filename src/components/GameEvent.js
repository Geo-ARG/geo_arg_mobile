import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { sendLocation, wathchLocation, scanNearby } from '../actions'

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
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        if (this.props.location.locationId === 'Unknown'){
          this.props.sendLocation(position.coords, this.props.userId)
        } else {
          this.props.wathchLocation(position.coords, this.props.locationId)
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
        {this.props.location.nearbyUser.map((nearby, index) => {
          return (
            <Text key={index}>ID: {nearby.User[0].id} Username : {nearby.User[0].username}</Text>
          )
          })
        }
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    location : state.location,
    userId : state.userId
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({sendLocation, wathchLocation, scanNearby}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GameEvent)
