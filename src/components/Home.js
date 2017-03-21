import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, BackAndroid, Dimensions } from 'react-native';
import { Container, Header, Title, Content, Button, Left, Right, Body } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
const {height, width} = Dimensions.get('window');

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      size: {width, height: height * 0.85}
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
        <Content style={{height: height * 0.9, backgroundColor: 'grey'}}>
          <View style={styles.messageBox}>
            <Image
              style={styles.badge}
              source={require('../assets/logo.png')}
            />
          </View>
          <Button
            block warning style={{borderRadius:10, marginBottom: 10, marginLeft: 10, marginRight: 10}}
            onPress={() => this.props.navigator.push({
              page: 'event'
            })}
          >
            <Text>List Event</Text>
            <Icon name="event" />
          </Button>
          <Button
            block warning style={{borderRadius:10, marginBottom: 10, marginLeft: 10, marginRight: 10}}
            onPress={() => this.props.navigator.push({
              page: 'map'
            })}
          >
            <Text>Event on Maps</Text>
            <Icon name="add-location" />
          </Button>
          <Button
            block warning style={{borderRadius:10, marginBottom: 10, marginLeft: 10, marginRight: 10}}
            onPress={() => this.props.navigator.push({
              page: 'profile'
            })}
          >
            <Text>My Profile</Text>
            <Icon name="account-circle" />
          </Button>
          <Button
            block warning style={{borderRadius:10, marginBottom: 10, marginLeft: 10, marginRight: 10}}
            onPress={() => this.props.navigator.push({
              page: 'help'
            })}
          >
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
  headerIcon: {
    alignSelf: 'center',
    height: 60,
    width: 60,
    marginTop: 5
  }
});
