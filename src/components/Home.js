import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, BackAndroid, Dimensions } from 'react-native';
import { Container, Header, Title, Content, Button, Left, Right, Body } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
const {height, width} = Dimensions.get('window');

var styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#15204C',
  },
  button: {
    borderRadius:10,
    backgroundColor: '#e6ffff',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  },
  messageBox: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
  },
  badge: {
    alignSelf: 'center',
    height: 169,
    width: 151,
  },
  headerIcon: {
    alignSelf: 'center',
    height: 60,
    width: 60,
    marginTop: 5
  }
}

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      size: {width, height: height}
    }
  }

  render() {
    BackAndroid.addEventListener('LockBack', function() {
      return true;
    })
    return (
      <Container>
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
        <Content style={{height: height * 0.9, backgroundColor: '#009999'}}>
          <View style={styles.messageBox}>
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
            <Text style={{fontSize: 20}}>Events </Text>
            <Icon size={20} name="event" />
          </Button>
          <Button
            block warning style={styles.button}
            onPress={() => this.props.navigator.push({
              page: 'map'
            })}
          >
            <Text style={{fontSize: 20}}>Map </Text>
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
        </Content>
      </Container>
    );
  }
}
