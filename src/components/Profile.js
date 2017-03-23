import React from 'react';
import { View, Text, Dimensions, AsyncStorage, BackAndroid } from 'react-native';
import { Container, Header, Left, Button, Title, Content, Footer, Body, Right, ListItem, Thumbnail } from 'native-base';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserEventByIdUser } from '../actions'
import Icon from 'react-native-vector-icons/MaterialIcons';

const { height, width } = Dimensions.get('window');

const styles = {
  header: {
    height: height * 0.1,
    backgroundColor: '#cc6600'
  },
  content: {
    height: height * 0.9
  }
}

class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.state={
      listUserLogin: ""
    }
    this.logout = this.logout.bind(this)
  }

  componentWillMount() {
    let idUserLogin = this.props.listUserLogin.User.id
    this.props.getUserEventByIdUser(idUserLogin)
  }

  logout() {
    AsyncStorage.removeItem('dataUser')
    this.props.navigator.resetTo({page: 'loading1'})
  }

  render () {
    BackAndroid.addEventListener('hardwareBackPress', ()=> {
      this.props.navigator.pop()
      return true
    })
    return (
      <Container style={{backgroundColor: '#F5F5F5'}}>
        <Header style={styles.header}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigator.pop()}
              >
              <Icon size={35} color={'white'} name='arrow-back' />
              <Title style={{fontSize: 25}}> Back</Title>
            </Button>
          </Left>
          <Right>
            <Button
              transparent
              onPress={() => this.logout()}>
              <Icon size={25} color={'white'} name='power-settings-new' />
              <Title style={{fontSize: 25}}> Logout</Title>
            </Button>
          </Right>
        </Header>
        <ListItem thumbnail>
          <Left>
            <Thumbnail square size={50} source={require('../assets/player.gif')} />
          </Left>
          <Body>
            <Text>{this.props.listUserLogin.User.username}</Text>
          </Body>
          <Right></Right>
        </ListItem>
        <Content style={styles.content}>
          {this.props.listEventUser.length < 1 ? <Text></Text> :
            this.props.listEventUser.map((eventUser,index) => {
              return (
                <ListItem key={index} thumbnail>
                  <Left>
                    {eventUser.completion
                      ?
                      <Thumbnail square size={80} source={require('../assets/harta.png')} />
                      :
                      <Thumbnail square size={80} source={require('../assets/harta2.jpg')} />
                    }
                  </Left>
                  <Body>
                    <Text>At {eventUser.Event.place}</Text>
                    <Text note>{eventUser.Quest.title}</Text>
                  </Body>
                  <Right>
                    <Button transparent>
                      {eventUser.completion ? <Text>Complete</Text> :
                        <Text>UnComplete</Text>
                      }
                    </Button>
                  </Right>
                </ListItem>
              )
            })
          }
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listEventUser: state.profileUser.userEvent,
    listUserLogin: state.profileUser.userData
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getUserEventByIdUser }, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps)(Profile)
