import React from 'react';
import { View, Text, Dimensions, AsyncStorage } from 'react-native';
import { Container, Header, Left, Button, Title, Content, Footer } from 'native-base';
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
  }

  componentWillMount(){
      // var idUserLogin = JSON.parse(this.props.listUserLogin).User.id
      // console.log(idUserLogin);
      // this.props.getUserEventByIdUser(idUserLogin)
  }

  render () {
    // console.log(this.props.listEventUser);
    // var hasil = JSON.parse(this.props.listUserLogin)
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
        </Header>
        <Content style={{height: height * 0.9}}>
          <View>
          </View>
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
