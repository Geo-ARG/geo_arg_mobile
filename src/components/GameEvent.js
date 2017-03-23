import React from 'react'
import { View, Text, TouchableOpacity, TextInput, Dimensions, ScrollView, Image, ActivityIndicator, Alert } from 'react-native'
import { Card, CardItem, Button, Content, Container, Header, Left, Right, ProgressBar, Title } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Progress from 'react-native-progress';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { sendLocation, watchLocation, scanNearby, fetchQuestList, checkAnswer, setCameraId, createGame } from '../actions'

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
      userAnswer: '',
      progressCircle: true,
      scanning: false,
    };
    this.handleVerification = this.handleVerification.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleScan = this.handleScan.bind(this)
  }

  handleSubmit(){
    this.setState({answerMode: false})
    this.props.checkAnswer(this.state.userEventId, this.state.userAnswer)
  }

  handleScan(){
    this.props.scanNearby(this.state.latitude, this.state.longitude)
    this.setState({scanning: true})
    setTimeout(()=>{this.setState({scanning: false})}, 3000)
  }

  handleVerification(userEvent){
    switch (userEvent.Quest.type) {
      case 'Text':
        this.setState({
          answerMode: true,
          userEventId: userEvent.id
        })
        break;
      case 'Coordinate':
          this.props.checkAnswer(userEvent.id, this.props.location.locationId)
        break;
      case 'Photo':
        this.props.setCameraId(userEvent.id)
        this.props.navigator.push({page: 'cameraon'})
        break;
      default:
        return
    }
  }

  componentWillMount(){
    this.props.createGame(this.props.userId, this.props.currentEventId)
  }

  componentDidMount(){
    this.props.fetchQuestList(this.props.userId, this.props.currentEventId)
    setTimeout(() => {
      this.setState({progressCircle: false})
    }, 2000)
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

  componentWillReceiveProps(nextprops){
    if(nextprops.progress === 1){
      setTimeout(()=>{Alert.alert(
        'Conglaturations',
        'This Mission is Completed',
        [{text: 'To My Profile', onPress: () => this.props.navigator.push({page: 'profile'})},
        {text: 'Back To Home', onPress: () => this.props.navigator.push({page: 'home'})},
        {text: 'Join Another Event', onPress: () => this.props.navigator.push({page: 'event'})}],
        { cancelable: false }
      )}, 1000)
    }
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
              transparent
              onPress={() => this.props.navigator.pop()}>
              <Icon size={25} color={'white'} name='arrow-back' />
              <Title> Back</Title>
            </Button>
          </Left>
          <Right>
            <Button
              onPress={this.handleScan}
              style={{backgroundColor: '#00ccff', alignSelf: 'center', borderRadius: 8}}>
              {this.state.scanning ?
                <ActivityIndicator animating={true} style={{alignItems: 'center', justifyContent: 'center', padding: 8, height: 80}} size="large"/> :
                <Text style={{ color: 'white', paddingLeft: 10, paddingRight: 10 }}>Scan Nearby Player</Text>
              }
            </Button>
          </Right>
        </Header>
        <Content style={{height: height}}>
          <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 15, marginBottom: 35 }}>
            <Text style={{ fontSize: 30, marginLeft: 10, fontWeight: 'bold'}}>GAME EVENT</Text>
            <Text style={{marginTop: 10}}>Progress: </Text>
            <Progress.Circle style={{marginBottom: 10, marginTop: 10}} progress={this.props.progress} size={80} showsText={true} indeterminate={this.state.progressCircle}/>
            <Text>Latitude: {this.state.latitude}</Text>
            <Text style={{marginBottom: 10}}>Longitude: {this.state.longitude}</Text>
            {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
            <Text style={{fontSize: 25, fontWeight: 'bold', marginBottom: 10}}>User Nearby</Text>
            <ScrollView>
              {this.props.location.nearbyUser.length < 1 ? null : this.props.location.nearbyUser.map((nearby, index) => {
                if(typeof nearby.Users[0] === 'object')
                return nearby.Users[0].id === this.props.UserId ? null : (
                  <Text key={index}>ID: {nearby.Users[0].id} Username : {nearby.Users[0].username}</Text>
                )
                })
              }
            </ScrollView>
            <Text style={{fontSize: 25, fontWeight: 'bold', marginTop: 10}}>Quest List</Text>
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
                let complete = quest.completion ? {color: '#4d6600', textAlign: 'center'} : {color: '#ecffb3', textAlign: 'center'}
                return (
                  <View key={index} style={{ backgroundColor: '#00cc99', marginTop: 10, width: width * 0.8, padding: 10, borderRadius: 8, borderBottomWidth: 1, borderBottomColor: '#222222'}}>
                    <TouchableOpacity onPress={() => this.handleVerification(quest)} disabled={quest.completion}>
                      <View style={{justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row'}}>
                        <View>
                          <Text style={complete}>{quest.Quest.title} </Text>
                          <Text style={complete}>{quest.Quest.task} </Text>
                          <Text style={complete}>Submit Type : {quest.Quest.type} </Text>
                        </View>
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
    userId : state.profileUser.userData.User.id,
    currentEventId : state.currentEvent.id,
    userEvent : state.userEvent,
    progress  : state.userEvent.length === 0 ? 0 : state.userEvent.filter(x => x.completion).length / state.userEvent.length,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({sendLocation, watchLocation, scanNearby, fetchQuestList, checkAnswer, setCameraId, createGame}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GameEvent)
