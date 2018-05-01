import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import { colors, fonts } from '../theme'

import { Auth, API } from 'aws-amplify'

const apiName = 'requestUnicorn';
const apiPath = '/ride';

class HailRide extends React.Component {
  state = {
    pin: {
      latitude: 40.745896,
      longitude: -73.988791
    },
    updates: []
  }
  signOut() {
    Auth.signOut()
      .then(() => this.props.navigation.navigate('AuthNav'))
  }
  async onPress() {
    if (!this.state.pin) {
      console.error('No pin present - skipping');
      return true;
    }

    const updates = [ 'Requesting Unicorn' ];
    try {
      this.setState({
        requestRideEnabled: false,
        updates
      });
      const data = await this.getData(this.state.pin);
      console.log('data from API: ', data);
      updates.push([ `Your unicorn, ${data.Unicorn.Name} will be with you in ${data.Eta} seconds` ]);
      this.setState({ updates });

      // Let's fake the arrival
      setTimeout(() => {
        console.log('ride complete');
        const updateList = this.state.updates;
        updateList.push([ `${data.Unicorn.Name} has arrived` ]);
        this.setState({
          updates: updateList,
          requestRideEnabled: false,
          pin: null
        });
      }, data.Eta * 1000);
    } catch (err) {
      console.error(err);
      updates.push([ 'Error finding unicorn' ]);
      this.setState({ updates });
    }
  }

  async getData(pin) {
    const body = {
      PickupLocation: {
        Longitude: pin.longitude,
        Latitude: pin.latitude
      }
    };
    return await API.post(apiName, apiPath, { body });
  }
  render() {
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.title}>HAIL RIDE</Text>
          <Text onPress={this.signOut.bind(this)} style={styles.signout}>Sign Out</Text>
        </View>

        <TouchableOpacity onPress={this.onPress.bind(this)}>
          <View style={styles.button}>
            <Text>Request Ride</Text>
          </View>
        </TouchableOpacity>
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
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    backgroundColor: colors.blue
  }
})

export default HailRide
