import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  BackAndroid,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import Home from './'

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

export default class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      email: ''
    }
    this.saveData = this.saveData.bind(this)
    this.loginForm = this.loginForm.bind(this)
  }

  componentWillMount(){
    AsyncStorage.getItem('dataUser', (err, result) => {
      if (result) {
        this.props.navigator.push({page: 'home'})
      }
    });
  }


  saveData() {
    if (this.state.username != "") {
      fetch('http://geo-arg-server-dev.ap-southeast-1.elasticbeanstalk.com/auth/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: this.state.username, email: this.state.email})
      }).then(res => res.json()).then(newDataTodos => {
        AsyncStorage.setItem('dataUser', JSON.stringify(this.state))
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
      <View style={styles.container}>

      <TouchableHighlight
      style={styles.signInButton}
      underlayColor='#949494'
      onPress={this.loginForm}>
      <Text>Goto Game</Text>
      </TouchableHighlight>
      <Image source={require("../assets/load.gif")} style={styles.imgHome} />
      </View>
    )
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#15204C',
  },
  signInButton: {
    height: 50,
    alignSelf: 'stretch',
    backgroundColor: '#D9DADF',
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
