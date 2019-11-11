import React, {Component} from 'react';
import {StackActions} from 'react-navigation';
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
import axios from 'axios';
import {AsyncStorage} from 'react-native';
import Style from '../../css/style';
export default class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnail: '',
      title: '',
      content: '',
      uuid: '',
    };
    this.handlePost = this.handlePost.bind(this);
  }
  componentDidMount() {
    this.getPost();
  }
  getPost = () => {
    const {
      thumbnail,
      title,
      content,
      uuid,
    } = this.props.navigation.state.params.payload;
    this.setState({
      thumbnail,
      title,
      content,
      uuid,
    });
  };
  handlePost = async () => {
    const token = await AsyncStorage.getItem('access_token');
    const {thumbnail, title, content, uuid} = this.state;
    const payload = {
      thumbnail,
      title,
      content,
    };
    axios
      .put(
        `http://ec2-3-81-168-96.compute-1.amazonaws.com/api/materi/${uuid}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => {
        const pushAction = StackActions.push({
          routeName: 'Home',
        });
        this.props.navigation.dispatch(pushAction);
        this.setState({
          thumbnail: '',
          title: '',
          content: '',
        });
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const {thumbnail, title, content} = this.state;
    return (
      <Container padder>
        <Header style={{backgroundColor: '#20B2AA'}}>
          <Body>
            <Title>Edit Post</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form style={{marginTop: 20, marginRight: 15}}>
            <Text style={{fontWeight: 'bold', marginLeft: 20}}>Thumbnail</Text>
            <Item style={{marginBottom: 20}}>
              <Input
                value={thumbnail}
                onChangeText={value => this.setState({thumbnail: value})}
              />
            </Item>
            <Text style={{fontWeight: 'bold', marginLeft: 20}}>Title</Text>
            <Item style={{marginBottom: 20}}>
              <Input
                value={title}
                onChangeText={value => this.setState({title: value})}
              />
            </Item>
            <Text style={{fontWeight: 'bold', marginLeft: 20}}>Content</Text>
            <Item style={{marginBottom: 20}}>
              <Input
                value={content}
                onChangeText={value => this.setState({content: value})}
              />
            </Item>
            <Button
              block
              style={[Style.mt_2, Style.my_1]}
              onPress={this.handlePost}>
              <Text>Submit</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
