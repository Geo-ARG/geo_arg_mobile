import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    BackAndroid,
    AsyncStorage
} from 'react-native';
import Home from '../home_screen'

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
    }

    saveData() {
        console.log("masukkkk");
        if (this.state.username != "") {
            fetch('http://geo-arg-server-dev.ap-southeast-1.elasticbeanstalk.com/auth/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: this.state.username, email: this.state.email})
            }).then(res => res.json()).then(newDataTodos => {
                AsyncStorage.setItem('dataUser', JSON.stringify(this.state), () => {
                    AsyncStorage.getItem('dataUser', (err, result) => {
                        console.log("tersimpan");
                        console.log(result);
                    });
                });
            })
        }
    }
    render() {
        lock.show({
            closable: true
        }, (err, profile, token) => {
            if (err) {
                console.log(err);
                return;
            }
            this.setState({username: profile.nickname, email: profile.email})
            this.saveData()
            console.log(this.state.username);
            console.log(this.state.email);
        });
        return (<Home/>)
    }

}
