import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body
} from "native-base";
import styles from "./styles";

import moment from "moment"

class Confirmation extends Component {
  static navigationOptions = {
    header: null
  };
  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func
  };

sendCoins(){
    
    let payment = {
      payId: this.props.navigation.state.params.confirmation.payId,
      confirmationToken: this.props.navigation.state.params.confirmation.confirmationToken
    }
    console.log("THIS@@",this)
    fetch('http://ddc-api.us-west-2.elasticbeanstalk.com/pay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.token.token
      },
      body: JSON.stringify(payment),
    }).then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if(responseJson.confirmationToken){
            this.props.navigation.navigate("Confirmation",{
              confirmation: responseJson

            })
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }


  render() {
    console.log("000000000",this);
    const { props: { name, index, list } } = this;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>

          <Body>
            <Title>Confirmação</Title>
          </Body>

          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="ios-menu" />
            </Button>
          </Right>
        </Header>

        <Content padder>
        <Text>
          Id Pagamento: {(this.props.navigation.state.params.confirmation.payId)}
        </Text>
        <Text>
          Distinatário: {(this.props.navigation.state.params.confirmation.recipient)}
        </Text>
        <Text>
          Data: {moment(this.props.navigation.state.params.confirmation.timestamp).format("DD/MM/YYYY")}
        </Text>
        <Text>
          Valor: {(this.props.navigation.state.params.confirmation.value)}
        </Text>
        <Button
              style={styles.btn}
              onPress={() => this.sendCoins()}
            >
              <Text>Confirmar</Text>
            </Button>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer())
  };
}


const mapStateToProps = state => ({
  token: state.user.token,
  name: state.user.name,
  index: state.list.selectedIndex,
  list: state.list.list
});

export default connect(mapStateToProps, bindAction)(Confirmation);

