import React, { Component } from 'react';
import { connect} from 'react-redux'
import { StyleSheet, View, Image, Text, Dimensions, BackAndroid, TouchableHighlight, AsyncStorage } from 'react-native';
import Carousel from 'react-native-looped-carousel'
import Home from './'
import { saveUserLogin, saveData } from '../actions'

const Auth0Lock = require('react-native-lock');
const { width, height } = Dimensions.get('window')
const lock = new Auth0Lock({
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

var styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signInButton: {
    backgroundColor: '#f2ffe6',
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  imgHome: {
    flex: 1,
    width: null,
    height: null,
  }
});

class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      email: '',
      size: { width, height }
    }
    this.loginForm = this.loginForm.bind(this)
  }

  _onLayoutDidChange = (e) => {
      const layout = e.nativeEvent.layout;
      this.setState({size: {width: layout.width, height: layout.height}})
   }

  componentWillMount(){
    // AsyncStorage.getItem('dataUser', (err, result) => {
    //   if (result) {
    //     this.props.saveUserLogin(JSON.parse(result))
    //     this.props.navigator.push({page: 'home'})
    //   }
    // });
  }

  loginForm(){
    lock.show({
      closable: true
    }, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      this.props.saveData(profile.nickname, profile.email)
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
        >
          <Image
            style={{flex: 1, width:'100%', height:'100%'}}
            source={require('../assets/pokemon5.jpg')}
          />
          <Image
            style={{flex: 1, width:'100%', height:'100%'}}
            source={require('../assets/pokemon6.jpg')}
          />
          <Image
            style={{flex: 1, width:'100%', height:'100%'}}
            source={require('../assets/pokemon2.jpg')}
          />
          <Image
            style={{flex: 1, width:'100%', height:'100%'}}
            source={require('../assets/pokemon3.jpg')}
          />
          <Image
            style={{flex: 1, width:'100%', height:'100%'}}
            source={require('../assets/pokemon7.jpg')}
          />
        </Carousel>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,.5)',
            width: width * 0.9,
            height: height * 0.5,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            borderRadius: 15
          }}>
          <Image
            source={require('../assets/logo.png')}
          />
          <TouchableHighlight
            style={styles.signInButton}
            underlayColor='#f2ffe6'
            onPress={this.loginForm}
          >
            <Text style={{fontSize: 25, color: '#316600', fontWeight: 'bold'}}>START!</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  saveUserLogin: (dataUserLogin) => dispatch(saveUserLogin(dataUserLogin)),
  saveData: (username, email) => dispatch(saveData(username, email))
})

export default connect(null, mapDispatchToProps)(Login)
