/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Font } from 'expo';

import { SwitchNavigator } from 'react-navigation'

import AuthNav from './src/auth'
import HomeNav from './src/home'

const Nav = SwitchNavigator(
  {
    AuthNav: AuthNav,
    HomeNav: HomeNav
  },
  {
    initialRouteName: 'AuthNav'
  }
)

export default class App extends Component {
  state = {
    loading: true
  }
  async componentDidMount() {
    await Font.loadAsync({
      'regular-font': require('./src/assets/fonts/NotoSerif-Regular.ttf'),
      'bold-font': require('./src/assets/fonts/NotoSerif-Bold.ttf'),
      'italic-font': require('./src/assets/fonts/NotoSerif-Italic.ttf'),
    })
    this.setState({ loading: false });
  }
  render() {
    if (this.state.loading) return <View />
    return (
      <Nav />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
