import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';

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



export default class Loading1 extends Component {

  render() {
    lock.show({
      closable: true,
    }, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      this.props.navigator.push({
        name: 'home',
        passProps: {
          profile: profile,
          token: token,
        }
      });
    });
  }
}
