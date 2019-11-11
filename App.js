/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Router from './router';
import {View} from 'react-native';
import {Text} from 'native-base';

export default class App extends Component {
  render() {
    return <Router />;
  }
}
