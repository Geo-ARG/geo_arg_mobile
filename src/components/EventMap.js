import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'

export default class EventMap extends React.Component {
  constructor(){
    super()
  }
  render(){
    const { region } = this.props;
    console.log(region);
    return(
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 6.333,
            longitude: 106.333,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05
          }}
        />
        <Text>EventMap</Text>
      </View>
    )
  }
}

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
