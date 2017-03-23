import React from 'react';
import { View, Text, Dimensions, AsyncStorage } from 'react-native';
import { Container, Header, Left, Button, Title, Content, Footer, Body, Right, ListItem, Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux'
const {height, width} = Dimensions.get('window');
import {bindActionCreators} from 'redux'
import { getUserEventByIdUser } from '../actions'


class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.state={
      listUserLogin: ""
    }
    this.logout = this.logout.bind(this)
  }

  componentWillMount(){
      var idUserLogin = this.props.listUserLogin.User.id
      this.props.getUserEventByIdUser(idUserLogin)
  }

  logout(){
    AsyncStorage.removeItem('dataUser')
    this.props.navigator.popToTop()

  }

  render () {
    console.log(this.props.listEventUser);
console.log(this.props.listEventUser.length);
    return (
      <Container style={{backgroundColor: '#F5F5F5'}}>
        <Header style={{height: height * 0.1}}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigator.pop()}
            >
              <Icon size={25} color={'white'} name='arrow-back' />
              <Title> Back</Title>
            </Button>
          </Left>
          <Right>
            <Button
              transparent
              onPress={() => this.logout}>
              <Icon size={25} color={'white'} name='power-settings-new' />
              <Title> Logout</Title>
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
            <Right>

            </Right>
        </ListItem>
        <Content style={{height: height * 0.9}}>
          {this.props.listEventUser.length < 1 ? "" :
            this.props.listEventUser.map((eventUser,index)=>{
              return (
                <ListItem key={index} thumbnail>
                    <Left>
                        { eventUser.completion ? <Thumbnail square size={80} source={require('../assets/harta.png')} /> :
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
  return bindActionCreators({getUserEventByIdUser}, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps)(Profile)
