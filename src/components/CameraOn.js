'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  BackAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Camera from 'react-native-camera';
import { RNS3 } from 'react-native-aws3'


export default class CameraOn extends Component {

  render() {
    BackAndroid.addEventListener('hardwareBackPress', ()=> {
      this.props.navigator.pop()
      return true
    })
    return (

          <View style={styles.container}>
            <Camera
              ref={(cam) => {
                this.camera = cam;
              }}
              style={styles.preview}
              aspect={Camera.constants.Aspect.fill}>
              <Text style={styles.capture} onPress={this.takePicture.bind(this)}>CAPTURE</Text>
            </Camera>
          </View>
    );
  }

  takePicture() {
    this.camera.capture()
      .then((data) => {
        var nameImage = new Date()
        var imageKey = Math.floor(Math.random()*100)
        console.log("Test");
        console.log(data)
        const file = {
          uri: data.path,
          name: `${nameImage}${imageKey/3}.jpg`,
          type: 'image/jpeg'
        }
        const options = {
          keyPrefix: 'photos/',
          bucket: 'arg-images',
          region: 'ap-southeast-1',
          accessKey: 'AKIAIPMFPQKDD5GZMRFQ',
          secretKey: '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',
          successActionStatus: 201
        }
        RNS3.put(file, options).then(response => {
          if (response.status !== 201) {
            throw new Error('Failed to upload image to S3', response);
          }
          console.log('*** BODY ***', response.body);
        })
      })
      .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: 'orange',
    borderRadius: 5,
    color: 'white',
    padding: 10,
    margin: 40
  }
})
