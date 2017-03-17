/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';
var Auth0Lock = require('react-native-lock');
// var lock = new Auth0Lock({clientId: 'xZAFgD4PIqldvAzGrhaNZpWHswGIrC25', domain: 'user-login.auth0.com'});
var lock = new Auth0Lock("xZAFgD4PIqldvAzGrhaNZpWHswGIrC25", "user-login.auth0.com", {
    allowedConnections: [
        "Username-Password-Authentication", "google-oauth2", "twitter", "facebook"
    ],
    rememberLastLogin: false,
    socialButtonStyle: "big",
    theme: {},
    languageDictionary: {
        "title": "Auth0"
    },
    language: "en"
});

export default class geo_arg_mobile extends Component {
    render() {
        lock.show()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});

AppRegistry.registerComponent('geo_arg_mobile', () => geo_arg_mobile);
