import React, {Component} from 'react';
import {AppRegistry, StyleSheet} from 'react-native';

export default class geo_arg_mobile extends Component {
    render() {
        return (
            <AppNavigator />
        )
    }
}

AppRegistry.registerComponent('geo_arg_mobile', () => geo_arg_mobile);
