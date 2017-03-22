import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import MapView from 'react-native-maps'
import { fetchEvents } from '../actions'
import { Container, Header, Left, Button, Title, Content, Footer } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {height, width} = Dimensions.get('window');

const styles = {
  map: {
    height: height * 0.87,
    width: width
  },
  loading: {
    height: height * 0.9,
    width: width
  }
}

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
      <Container style={{backgroundColor: '#F5F5F5'}}>
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

        <Content style={{height: height * 0.9}}>
          <MapView
            style={styles.map}
            region={this.state.region}
            onRegionChange={this.onRegionChange}
            showsUserLocation={true}
            showsMyLocationButton={true}
            loadingEnabled={true}
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

          <View style={{position: 'absolute', backgroundColor: 'rgba(0,0,0,.5)', top: 10, width: width,  padding: 20}}>
            <Text>Find events here</Text>
          </View>
        </Content>
      </Container>
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
