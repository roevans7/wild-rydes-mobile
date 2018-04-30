import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import { colors, fonts } from '../theme'

import { Auth } from 'aws-amplify'

class HailRide extends React.Component {
  signOut() {
    Auth.signOut()
      .then(() => this.props.navigation.navigate('AuthNav'))
  }
  render() {
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.title}>HAIL RIDE</Text>
          <Text onPress={this.signOut.bind(this)} style={styles.signout}>Sign Out</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.pink
  },
  title: {
    color: 'white',
    fontSize: 18,
    paddingTop: 10,
    fontFamily: fonts.regular
  },
  signout: {
    position: 'absolute',
    color: 'white',
    right: 13,
    top: 26
  }
})

export default HailRide
