import React from 'react';
import { View, Text } from 'react-native';
import { Container, Header, Left, Button, Title, Content, Footer } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Help extends React.Component {
  render () {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigator.pop()}
            >
              <Icon name='arrow-back' />
              <Title>Back</Title>
            </Button>
          </Left>
        </Header>
        <Content>
          <View>
            <Text>
              Lorem ipsum dolor sit amet, vide discere petentium at has, an aliquid maiestatis vix. Et vocent appetere mea, offendit delicatissimi vel ea, duo unum nonumes electram ne. Cetero ornatus ex quo, vim ut dolorum scribentur. Ne semper aperiri dignissim vim. Duo harum mentitum ocurreret ad. Clita cotidieque ei usu.
              Eros eleifend concludaturque ex sed, cibo appetere ne eum. Qui clita vivendum dissentias te. No unum equidem fastidii sea, consul electram eu pri. Elitr homero expetenda ex has, tota iudicabit dignissim qui ad. Perpetua moderatius id vis, platonem pericula inciderint eos no.
              Mea an probo dicam. Mei debet disputando ne. No quo tamquam posidonium, pro id nibh labores. Ludus nostrud legimus nec ut, ne mea agam verterem, iracundia mnesarchum incorrupte cu quo. Ut solum deserunt gloriatur quo, sed commodo suavitate contentiones ex, percipit definitiones vix ei. Id vis quis quaeque, nam no wisi maiestatis necessitatibus.
              Ea sea populo appetere, pri impetus delenit fastidii eu, nam partem soluta et. Nec quot nibh autem ad, vis sint natum fierent in. Ad falli dicit quodsi eam, veri quas nostrum per te. Ex quem soleat luptatum eam, cum velit aliquam appetere no, has ex harum oblique recusabo.
              Admodum scaevola consequuntur his te. Id ipsum melius est, ius ex eirmod dolores mandamus. His ut aliquip democritum. Rebum constituto eu cum. Iudico oratio deserunt pro eu, eum ne dicat utamur integre.
            </Text>
          </View>
        </Content>
      </Container>
    )
  }
}
