/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {AsyncStorage, ToastAndroid} from 'react-native';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Body,
  Title,
  Right,
  Button,
  Text,
} from 'native-base';
import Style from '../../css/style';
import axios from 'axios';
import {SwitchActions} from 'react-navigation';
export default class FormExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.login = this.login.bind(this);
  }
  login = async () => {
    const {email, password} = this.state;
    const payload = {
      email: email,
      password: password,
    };
    axios //ada put, post, delete, get
      //post butuh 2 parameter, url + data(payload)
      .post('http://ec2-3-81-168-96.compute-1.amazonaws.com/api/login', payload)
      .then(async value => {
        await AsyncStorage.setItem('access_token', value.data.access_token);
        ToastAndroid.show('Success', ToastAndroid.SHORT);
        this.props.navigation.dispatch(
          SwitchActions.jumpTo({routeName: 'Home'}),
        );
      })
      .catch(err => {
        ToastAndroid.show('Error', ToastAndroid.SHORT);
        console.log(err);
      });
  };
  render() {
    const {email, password} = this.state;
    return (
      <Container padder>
        <Header style={{backgroundColor: '#20B2AA'}}>
          <Body>
            <Title>Login</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item style={{marginRight: 20}}>
              <Input
                placeholder="Email"
                value={email}
                onChangeText={value => this.setState({email: value})}
              />
            </Item>
            <Item style={{marginRight: 20}}>
              <Input
                placeholder="Password"
                value={password}
                secureTextEntry={true}
                onChangeText={value => this.setState({password: value})}
              />
            </Item>
            <Button block style={[Style.mt_2, Style.my_1]} onPress={this.login}>
              <Text>Sign In</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
