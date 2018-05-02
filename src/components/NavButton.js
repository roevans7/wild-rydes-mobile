import React from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import { Ionicons } from '@expo/vector-icons';

export default ({ onPress, color = 'white' }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress}>
      <View style={styles.navButton}>
      <Ionicons name="ios-menu" size={30} color={color} />
      </View>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  navButton: {
    padding: 20
  },
  container: {
    position: 'absolute',
    right: 0,
    top: 0
  }
})
