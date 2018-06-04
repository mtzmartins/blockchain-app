import React, { Component } from "react";
import { Image,Alert } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Item,
  Input,
  Button,
  Icon,
  View,
  Text,
  InputText,
  
} from "native-base";
import { Field, reduxForm } from "redux-form";
import * as actions from "../../actions/user";
import Store from '../../configureStore';
import styles from "./styles";
import { bindActionCreators } from 'redux';

const background = require("../../../images/shadow.png");

const validate = values => {
  
    var ema = values.email;
    var pw = values.password;
  
    if (ema == 'mateus' && pw == 'dwliscmnxh'){
        console.log("Chamar Auth")
      
    }
  
};

  
class Login extends Component {
  static propTypes = {
    name: React.PropTypes.string,
    token: React.PropTypes.string,
    setUser: React.PropTypes.func,
    setToken: React.PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      token:"",
      name: "",
      pw: ""
    };
    this.registerUser = this.registerUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  setToken(token){
    
        this.props.setToken(token);
    
      }
    
    setUser(name) {
      this.props.setUser(name);
    }

  registerUser(username, pw){

    let user = {
      username:username,
      password:pw
    }

    console.log("User",user)
    fetch('http://ddc-api.us-west-2.elasticbeanstalk.com/accounts', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if (responseJson.token){
            this.props.dispatch(this.props.actions.setToken(responseJson))
            this.props.navigation.navigate("Account")
          }else{
            Alert.alert(
              'Alerta',
              'Usuário ou senha incorretos',
              [  
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: false }
            )
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }

  loginUser(username, pw){
    
        let user = {
          username:username,
          password:pw
        }
    
        console.log("User",user)
        fetch('http://ddc-api.us-west-2.elasticbeanstalk.com/auth', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        }).then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson);
              console.log("THIS::",this);
              console.log("SETOKEN",this.props.actions.setToken(responseJson))
              if (responseJson.token){
              this.props.dispatch(this.props.actions.setToken(responseJson))
              this.props.dispatch(this.props.actions.setUser(this.state.name))
              this.props.navigation.navigate("Account")
            }else{
              Alert.alert(
                'Alerta',
                'Usuário ou senha incorretos',
                [  
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              )
            }
    
            })
            .catch((error) => {
              console.error(error);
            });
      }
    

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Content>
            <Image source={background} style={styles.shadow}>
              <View style={styles.bg}>
                <Input placeholder="email" onChangeText={(name) => this.setState({name})}  />
                <Input placeholder="password" onChangeText={(pw) => this.setState({pw})} />
              </View>
              <View style={styles.buttons}>
                <Button
                  style={styles.btn}
                  onPress={() => this.loginUser(this.state.name, this.state.pw)}
                >
                  <Text>Login</Text>
                </Button>
                <Button
                  style={styles.btn}
                  onPress={() => this.registerUser(this.state.name, this.state.pw)}
                >
                  <Text>Register</Text>
                </Button>
              </View>
            </Image>
          </Content>
        </View>
      </Container>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
      token: state.user.token,
      name: state.user.name
  };
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(actions, dispatch),
      dispatch: dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);


