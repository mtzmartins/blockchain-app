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
  Body,
  View,
  Input
} from "native-base";
import { Image,Alert,Modal } from "react-native";
import { bindActionCreators } from 'redux';
import * as actions from "../../actions/user";


import styles from "./styles";

class Account extends Component {
  static navigationOptions = {
    header: null
  };
  static propTypes = {
    name: React.PropTypes.string,
    balance: React.PropTypes.number,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
    setBalance: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      amountToReceive: 0,
      payId: "",
    };
    this.receiveCoins = this.receiveCoins.bind(this);
    this.sendCoins = this.sendCoins.bind(this);
    this.showId = this.showId.bind(this);
  }

  showId(id){
    console.log("id",id)
    Alert.alert(
      id,
      'Esse é seu id para receber, mostre para que for fazer o pagamento',
      [  
        {text: 'OK' , onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
  }

  receiveCoins(amount){

    let payment = {
      value:Number(amount)
    }

    console.log(payment)

    fetch('http://ddc-api.us-west-2.elasticbeanstalk.com/receive', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.token.token
      },
      body: JSON.stringify(payment),
    }).then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          this.showId(responseJson.payId)
        })
        .catch((error) => {
          console.error(error);
        });
  }

  sendCoins(id){

    console.log("Token1",this.props)

    let payment = {
      payId:id
    }
    console.log(payment)
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




  componentWillMount() {

    console.log("Account",this)

    fetch('http://ddc-api.us-west-2.elasticbeanstalk.com/balance', {
      method: 'GET',
      headers: {
        'x-access-token': this.props.token.token
      },
    }).then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson.balance);
          this.props.dispatch(this.props.actions.setBalance(responseJson.balance))
        })
        .catch((error) => {
          console.error(error);
        });

    console.log("HISTORY",this)
    
        fetch('http://ddc-api.us-west-2.elasticbeanstalk.com/history', {
          method: 'GET',
          headers: {
            'x-access-token': this.props.token.token
          },
        }).then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson);
              
            })
            .catch((error) => {
              console.error(error);
            });
}

  render() {
    const { props: { name, index, list } } = this;
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>

          <Body>
            <Title>{"Account"}</Title>
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

        <View style={styles.bg}>
                <Text style={styles.welcome}> Bem vindo {this.props.name}</Text>
        </View>

        <View style={styles.bg}>
              <Text> Você possui {this.props.balance} DedéCoins </Text>
        </View>

        <Content padder>
        <View style={styles.receive}>
                <Input placeholder="amount" onChangeText={(amountToReceive) => this.setState({amountToReceive})}  />
                <Button
                  style={styles.btn}
                  onPress={() => this.receiveCoins(this.state.amountToReceive)}
                >
                  <Text>Receber</Text>
                </Button>
        </View>
        <View style={styles.receive}>
                <Input placeholder="payId" onChangeText={(payId) => this.setState({payId})}  />
                <Button
                  style={styles.btn}
                  onPress={() => this.sendCoins(this.state.payId)}
                >
                  <Text>Pagar</Text>
                </Button>
        </View>
        </Content>
      </Container>
    );
  }
}



const mapStateToProps = state => ({
  token: state.user.token,
  name: state.user.name,
  balance: state.user.balance,
  index: state.list.selectedIndex,
  list: state.list.list,
  
});

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(actions, dispatch),
      dispatch: dispatch,
      openDrawer: () => dispatch(openDrawer())
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Account);
