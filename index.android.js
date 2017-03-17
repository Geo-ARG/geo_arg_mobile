/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Alert, Navigator} from 'react-native';
import store from './src/store/index'

import Loading1 from './src/components/loading_screen/Loading1'
import Loading2 from './src/components/loading_screen/Loading2'
import Home from './src/components/home_screen'
import Login from './src/components/loginform'

export default class geo_arg_mobile extends Component {

    render() {
        // lock.show()
        return (
            <Provider store={store}>
              <Navigator initialRoute={{
                  page: 'loading1',
                  profile: '',
                  token: '',
              }}renderScene={(route, navigator)=>{
                switch(route.page){
                  case 'loading1':
                    return <Loading1 navigator={navigator} route={route}/>
                  case 'loading2'
                    return <Loading1 navigator={navigator} route={route}/>
                  case 'login'
                    return <Login navigator={navigator} route={route}/>
                  case 'home'
                    return <Home navigator={navigator} route={route}/>
                  default:
                    return <Loading1 navigator={navigator} route={route}/>
                }
              }}
              />
            </Provider>
        )
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
