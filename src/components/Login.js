import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  BackAndroid,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import Home from './'
import Carousel from 'react-native-looped-carousel'
var Auth0Lock = require('react-native-lock');
var lock = new Auth0Lock({
  clientId: 'xZAFgD4PIqldvAzGrhaNZpWHswGIrC25',
  domain: 'user-login.auth0.com',
  allowedConnections: [
    "Username-Password-Authentication", "google-oauth2", "facebook"
  ],
  rememberLastLogin: true,
  socialButtonStyle: "big",
  theme: {},
  languageDictionary: {
    "title": "ARG Login"
  },
  language: "en"
});


const { width, height } = Dimensions.get('window')

export default class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      email: '',
      size: { width, height }
    }
    this.saveData = this.saveData.bind(this)
    this.loginForm = this.loginForm.bind(this)
  }

  _onLayoutDidChange = (e) => {
      const layout = e.nativeEvent.layout;
      this.setState({size: {width: layout.width, height: layout.height}})
   }

  componentWillMount(){
    // AsyncStorage.getItem('dataUser', (err, result) => {
    //   if (result) {
    //     this.props.navigator.push({page: 'home'})
    //   }
    // });
  }


  saveData() {
    if (this.state.username != "") {
      fetch('http://geo-arg-server-dev.ap-southeast-1.elasticbeanstalk.com/auth/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: this.state.username, email: this.state.email})
      }).then(res => res.json()).then(newDataUser => {

        AsyncStorage.setItem('dataUser', JSON.stringify(newDataUser))
      })

    }
  }


  loginForm(){
    lock.show({
      closable: true
    }, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      this.setState({username: profile.nickname, email: profile.email || ""})
      this.saveData()
      this.props.navigator.push({page: 'home'});
    });
  }

  render() {
    BackAndroid.addEventListener('LockBack', function() {
      return true;
    })
    return (
      <View style={styles.container} onLayout={this._onLayoutDidChange}>
        <Carousel
           delay={5000}
           style={this.state.size}
           autoplay
           bullets={true}
        >
          <Image
            style={{flex: 1, width:'100%', height:'100%'}}
            source={require('../assets/1.jpg')}
          />
          <Image
            style={{flex: 1, width:'100%', height:'100%'}}
            source={require('../assets/2.jpg')}
          />
          <Image
            style={{flex: 1, width:'100%', height:'100%'}}
            source={require('../assets/3.jpg')}
          />
        </Carousel>
        <Image
          source={require('../assets/logo.png')}
          style={{
            position:'absolute',
            flexDirection: 'row'
          }}
        />
        <View style={styles.buttonLogin}>
          <TouchableHighlight
              style={styles.signInButton}
              underlayColor='#1E90FF'
              onPress={this.loginForm}>
            <Text>Goto Game</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonLogin:{
     position: 'absolute',
        width: width,
        bottom: width/3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
  },
  signInButton: {
    height: 50,
    width: width/2,
    alignSelf: 'stretch',
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgHome:{
    flex: 1,
    width: null,
    height: null,
  },
});
