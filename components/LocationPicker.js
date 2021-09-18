import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native'
import * as Location from 'expo-location'

import Colors from '../constants/Colors'

const LocationPicker = (props) => {
  const [pickedLocation, setPickedLocation] = useState()
  const [isFetching, setIsFetching] = useState()

  const verifyPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    console.log('satus', status)
    if (status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app',
        [{ text: 'Okay' }]
      )
      return false
    }
    return true
  }
  const getLocationHandler = async () => {
    const hasPermissions = await verifyPermissions()
    if (!hasPermissions) return
    let location
    try {
      setIsFetching(true)
      location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
        LocationActivityType: Location.ActivityType.OtherNavigation,
        maximumAge: 5000,
        timeout: 15000,
      })
      console.log('loactoin ', location)
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      })
    } catch (error) {
      console.log('errr', Location.getProviderStatusAsync())
      Alert.alert(
        'Could not fetch location!',
        'Please try again after or pick a location on the map',
        [{ text: 'Okay' }]
      )
    }
    setIsFetching(false)
  }

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        {isFetching ? (
          <ActivityIndicator size='large' color={Colors.primary} />
        ) : (
          <Text>No location chose yet!</Text>
        )}
      </View>
      <Button
        title='Get User Location'
        color={Colors.primary}
        onPress={getLocationHandler}
      />
    </View>
  )
}

export default LocationPicker

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
