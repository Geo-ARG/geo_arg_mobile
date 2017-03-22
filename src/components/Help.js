import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Container, Header, Left, Button, Title, Content, Footer } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
const {height, width} = Dimensions.get('window');

export default class Help extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
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
          <View style={{marginRight: 20, marginLeft: 20, marginTop: 20}}>
            <Text style={{fontSize: 40, textAlign: 'center', fontWeight: 'bold', marginBottom: 20}}>
              Geo-ARG Guides
            </Text>
            <Text style={{fontSize: 25, textAlign: 'justify', marginBottom: 10, fontWeight: 'bold'}}>
              Game objectives:
            </Text>
            <Text style={{fontSize: 18, textAlign: 'justify'}}>
              1. Find events near you and join them (you need to be near enough to be able to join the event)
            </Text>
            <Text style={{fontSize: 18, textAlign: 'justify'}}>
              2. Complete chain of quests that provided in each event.
            </Text>
            <Text style={{fontSize: 18, textAlign: 'justify'}}>
              3. Compete with your friends to get highest score and most achievements
            </Text>
            <Text style={{fontSize: 24, textAlign: 'justify', marginTop: 10, marginBottom: 10, fontWeight: 'bold'}}>
              Type of Quests:
            </Text>
            <Text style={{fontSize: 18, textAlign: 'justify', fontWeight: 'bold'}}>
              Text:
            </Text>
            <Text style={{fontSize: 18, textAlign: 'justify'}}>
              Submit secret answer to complete the quest
            </Text>
            <Text style={{fontSize: 18, textAlign: 'justify', fontWeight: 'bold'}}>
              Coordinate:
            </Text>
            <Text style={{fontSize: 18, textAlign: 'justify'}}>
              Go to a specific place to complete the quest
            </Text>
            <Text style={{fontSize: 18, textAlign: 'justify', fontWeight: 'bold'}}>
              Photo:
            </Text>
            <Text style={{fontSize: 18, textAlign: 'justify'}}>
              Submit a photo and wait for admin to verify and complete the quest
            </Text>
          </View>
        </Content>
      </Container>
    )
  }
}
