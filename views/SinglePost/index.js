import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {
  Container,
  Header,
  Content,
  Body,
  Title,
  Right,
  Text,
  Card,
  CardItem,
  Spinner,
} from 'native-base';
import axios from 'axios';
import {StackActions} from 'react-navigation';
import {TouchableOpacity} from 'react-native';
export default class SinglePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: '',
      isLoading: true,
    };
    this.getItems = this.getItems.bind(this);
  }
  componentDidMount() {
    this.getItems();
  }
  getItems = () => {
    let id = this.props.navigation.state.params.id;
    axios
      .get(`http://ec2-3-81-168-96.compute-1.amazonaws.com/api/materi/${id}`)
      .then(res => {
        this.setState({
          items: res.data.data,
          isLoading: false,
        });
      })
      .catch(err => console.log(err));
  };
  editPost = () => {
    const payload = this.state.items;
    const pushAction = StackActions.push({
      routeName: 'Edit',
      params: {
        payload: payload,
      },
    });
    this.props.navigation.dispatch(pushAction);
  };
  deletePost = () => {
    let id = this.props.navigation.state.params.id;
    axios
      .delete(`http://ec2-3-81-168-96.compute-1.amazonaws.com/api/materi/${id}`)
      .then(res => {
        console.log(res);
        const pushAction = StackActions.push({
          routeName: 'Home',
        });
        this.props.navigation.dispatch(pushAction);
      })
      .catch(err => console.log(err));
  };
  renderItem = () => {
    const {items} = this.state;
    if (this.state.isLoading) {
      return <Spinner />;
    } else {
      return (
        <Card>
          <CardItem header bordered>
            <Text style={{color: '#000', fontWeight: 'bold'}}>{items.title}</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text style={{color: '#000'}}>Thumbnail : {items.thumbnail}</Text>
            </Body>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text style={{color: '#000'}}>Content : {items.content}</Text>
            </Body>
          </CardItem>
          <CardItem
            footer
            bordered
            style={{flex: 1, justifyContent: 'space-between'}}>
            <TouchableOpacity
              onPress={() => {
                this.editPost();
              }}>
              <Text style={{color: '#20B2AA'}}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.deletePost();
              }}>
              <Text style={{color: 'red'}}>Delete</Text>
            </TouchableOpacity>
          </CardItem>
        </Card>
      );
    }
  };
  render() {
    return (
      <Container padder>
        <Header style={{backgroundColor: '#20B2AA'}}>
          <Body>
            <Title>Detail Item</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>{this.renderItem()}</Content>
      </Container>
    );
  }
}
