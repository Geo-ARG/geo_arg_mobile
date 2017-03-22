import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, BackAndroid, Dimensions } from 'react-native';
import { Container, Header, Title, Content, Button, Left, Right, Body } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
const {height, width} = Dimensions.get('window');

var styles = {
  button: {
    borderRadius:10,
    backgroundColor: '#e6ffff',
    marginTop: 20,
    height: height * 0.1,
    width: width * 0.8,
    alignSelf: 'center'
  },
  iconView: {
    marginTop: 10,
  },
  badge: {
    alignSelf: 'center',
    height: 169,
    width: 151,
  },
  headerIcon: {
    alignSelf: 'center',
    height: 60,
    width: 60
  },
  content: {
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  backgroundImg: {
    width: width,
    height: height
  }
}

export default class Home extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    BackAndroid.addEventListener('LockBack', function() {
      return true;
    })
    return (
      <Container style={{backgroundColor: '#F5F5F5'}}>
        <Header style={{height: height * 0.1}}>
          <Left>
            <Image
              style={styles.headerIcon}
              source={require('../assets/logo.png')}
            />
          </Left>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{height: height * 0.9}}>
          <Image
            style={styles.backgroundImg}
            source={require('../assets/pokemon12.jpg')}
          />
          <View style={styles.content}>
            <View style={styles.iconView}>
              <Image
                style={styles.badge}
                source={require('../assets/logo.png')}
              />
            </View>
            <Button
              block warning style={styles.button}
              onPress={() => this.props.navigator.push({
                page: 'event'
              })}
            >
              <Text style={{fontSize: 20}}>Browse All Events </Text>
              <Icon size={20} name="event" />
            </Button>
            <Button
              block warning style={styles.button}
              onPress={() => this.props.navigator.push({
                page: 'map'
              })}
            >
              <Text style={{fontSize: 20}}>Search Event Around You </Text>
              <Icon size={20} name="add-location" />
            </Button>
            <Button
              block warning style={styles.button}
              onPress={() => this.props.navigator.push({
                page: 'profile'
              })}
            >
              <Text style={{fontSize: 20}}>My Profile </Text>
              <Icon size={20} name="account-circle" />
            </Button>
            <Button
              block warning style={styles.button}
              onPress={() => this.props.navigator.push({
                page: 'help'
              })}
            >
              <Text style={{fontSize: 20}}>How to Play </Text>
              <Icon size={20} name="help" />
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
