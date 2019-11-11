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
import Style from '../../css/style';
export default class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnail: '',
      title: '',
      content: '',
    };
    this.handlePost = this.handlePost.bind(this);
  }
  handlePost = async () => {
    const {thumbnail, title, content} = this.state;
    const payload = {
      thumbnail,
      title,
      content,
    };
    this.props.navigation.state.params.handlePost(payload);
    this.setState({
      thumbnail: '',
      title: '',
      content: '',
    });
  };
  render() {
    const {thumbnail, title, content} = this.state;
    return (
      <Container padder>
        <Header style={{backgroundColor: '#20B2AA'}}>
          <Body>
            <Title style={{color: '#fff'}}>Add Post</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form style={{marginTop: 20, marginRight: 15}}>
            <Text style={{fontWeight: 'bold', marginLeft: 20}}>Thumbnail</Text>
            <Item style={{marginBottom: 20}}>
              <Input
                style={{fontSize: 14}}
                value={thumbnail}
                onChangeText={value => this.setState({thumbnail: value})}
              />
            </Item>
            <Text style={{fontWeight: 'bold', marginLeft: 20}}>Title</Text>
            <Item style={{marginBottom: 20}}>
              <Input
                style={{fontSize: 14}}
                value={title}
                onChangeText={value => this.setState({title: value})}
              />
            </Item>
            <Text style={{fontWeight: 'bold', marginLeft: 20}}>Content</Text>
            <Item style={{marginBottom: 20}}>
              <Input
                style={{fontSize: 14}}
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
