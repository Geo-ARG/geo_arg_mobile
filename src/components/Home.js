import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  BackAndroid
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default class Home extends Component {
  render() {
    BackAndroid.addEventListener('LockBack', function() {
      return true;
    })
    return (
      <Container>
        <Header>
          <Left>
            <Image
              style={styles.badge2}
              source={require('../assets/logo.png')}
              />
          </Left>
          <Body>
            <Title>ARG Home</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View style={styles.messageBox}>
            <Image
              style={styles.badge}
              source={require('../assets/logo.png')}
              />
          </View>

          <Button block warning style={{ marginBottom: 10, marginTop: 10, marginLeft: 10, marginRight: 10}}>
            <Text>List Event</Text>
            <Icon name="event" />
          </Button>
          <Button block warning style={{ marginBottom: 10, marginLeft: 10, marginRight: 10}}>
            <Text>Event on Maps</Text>
            <Icon name="add-location" />
          </Button>
          <Button block warning style={{ marginBottom: 10, marginLeft: 10, marginRight: 10}}>
            <Text>My Profile</Text>
            <Icon name="account-circle" />
          </Button>
          <Button block warning style={{marginLeft: 10, marginRight: 10}}>
            <Text>ARG-Help</Text>
            <Icon name="help" />
          </Button>

        </Content>
      </Container>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#15204C',
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
  badge2: {
    alignSelf: 'center',
    height: 40,
    width: 30,
  }
});
