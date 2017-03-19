import React from 'react'
import {View, Text} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { sendLocation, wathchLocation } from '../actions'

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
        if (this.props.locationId === 'Unknown'){
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
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>GAME EVENT</Text>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    locationId : state.locationId,
    userId : state.userId
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({sendLocation, wathchLocation}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GameEvent)
