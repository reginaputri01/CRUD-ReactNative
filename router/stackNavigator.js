import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from '../views/Login';
import HomeScreen from '../views/Home';
import AddScreen from '../views/AddPost';
import SingleScreen from '../views/SinglePost';
import EditScreen from '../views/EditPost';

export const LoginStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },
});

export const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
      },
    },
    Add: {
      screen: AddScreen,
      navigationOptions: {
        header: null,
      },
    },
    Single: {
      screen: SingleScreen,
      navigationOptions: {
        header: null,
      },
    },
    Edit: {
      screen: EditScreen,
      navigationOptions: {
        header: null,
      },
    },
  },
  {initialRouteParams: 'Home'},
);
