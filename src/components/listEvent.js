import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, ScrollView, Image, Dimensions } from 'react-native'
import { Container, Content, Card, CardItem, Left, Body, Thumbnail, Text, Button, Footer, FooterTab} from 'native-base';
import { fetchEvents } from '../actions'
import Carousel from 'react-native-looped-carousel'
const {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialIcons';


const iconhome = (<Icon name="home" size={30} color="white" />)
const iconinfo = (<Icon name="info" size={30} color="white" />)
const iconback = (<Icon name="fast-rewind" size={30} color="white" />)

class ListEvent extends Component {
  constructor (props) {
    super(props)
    this.state={
      size: {width, height}
    }
  }

  componentDidMount () {
    this.props.fetchEvents()
  }

  render () {
    return (
       <Container>
      <View style={styles.container}>
          <Image style={{flex: 1, width:'100%', height:'100%', position:'absolute'}}
              source={require('../assets/bglistevent.jpg')}/>
            <View style={styles.listevent}>
              <Carousel
                   delay={5000}
                   style={this.state.size}
                   autoplay
                   bullets={true}>
                 <Image style={{flex: 1, marginLeft:'1%', marginRight:'1%', marginTop:'1%', height: '80%'}}
                   source={require('../assets/1.jpg')} />
                 <Image style={{flex: 1, marginLeft:'1%', marginRight:'1%', marginTop:'1%', height: '80%'}}
                   source={require('../assets/2.jpg')}/>
                 <Image style={{flex: 1, marginLeft:'1%', marginRight:'1%', marginTop:'1%', height: '80%'}}
                   source={require('../assets/3.jpg')}/>
               </Carousel>
            </View>
      </View>
     </Container>
    )
  }
}


var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listevent:{
    marginBottom: '40%'
  }
})





// const styles = StyleSheet.create({
//   card: {
//     marginLeft: 20,
//     marginRight: 20,
//     marginTop: 10,
//     marginBottom: 10
//   },
//   scroll:{
//     marginBottom: 20,
//     marginLeft: 20,
//     marginRight: 20,
//     backgroundColor: '#ccffee',
//     borderRadius: 5
//   },
//   events: {
//     flex: 0.8,
//     backgroundColor: 'skyblue'
//   },
//   title:{
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginTop: 5,
//     marginBottom: 15,
//   },
//   loading:{
//     width: width,
//     height: height
//   },
//   list: {
//     padding: 3,
//     marginLeft: 20,
//     marginRight: 20,
//     color: '#333333',
//     marginBottom: 5,
//     textAlign: 'center'
//   }
// })

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

/*<Container>
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
</Container>*/


// <Footer >
//    <FooterTab style={{backgroundColor:'rgba(71, 96, 90, 0.89)',}}>
//      <Button onPress={() =>null }>
//        {iconback}
//      </Button>
//      <Button>
//        {iconhome}
//      </Button>
//      <Button onPress={() => null}>
//        {iconinfo}
//      </Button>
//    </FooterTab>
//  </Footer>

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEvents: () => dispatch(fetchEvents())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListEvent)
