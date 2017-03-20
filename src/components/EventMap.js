import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import { fetchEvents } from '../actions'

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
   },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

class EventMap extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      region: {
        latitude: -6.2606807,
        longitude: 106.7792663,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      }
    }
    this.onRegionChange = this.onRegionChange.bind(this)
  }

  onRegionChange(region){
    this.setState({ region })
  }

  componentDidMount () {
    this.props.fetchEvents()
  }

  render(){
    return(
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        >
        {this.props.events.map((marker, index) => {
          let coordinates = marker.geolocation.coordinates
          return (
            <MapView.Marker
              key={index}
              coordinate={{latitude: coordinates[0], longitude: coordinates[1]+0.002}}
              title={marker.title}
              image={require('../assets/pokeball.png')}
              description={`${marker.place}, ${marker.description}`}/>
          )}
        )}
        </MapView>
        <Text>EventMap</Text>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    events: state.events
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchEvents }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EventMap)
