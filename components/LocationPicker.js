import React, { useState, useEffect } from 'react'
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
import MapPreview from './MapPreview'

const LocationPicker = (props) => {
  const [pickedLocation, setPickedLocation] = useState()
  const [isFetching, setIsFetching] = useState()
  const mapPickedLocation = props.navigation.getParam('pickedLocation')
  const { onLocationPicked } = props

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation)
      onLocationPicked(mapPickedLocation)
    }
  }, [mapPickedLocation, onLocationPicked])

  const verifyPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
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
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      })
      props.onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      })
    } catch (error) {
      Alert.alert(
        'Could not fetch location!',
        'Please try again after or pick a location on the map',
        [{ text: 'Okay' }]
      )
    }
    setIsFetching(false)
  }

  const pickOnMapHandler = () => {
    props.navigation.navigate('Map')
  }

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        onPress={pickOnMapHandler}
        style={styles.mapPreview}
        location={pickedLocation}
      >
        {isFetching ? (
          <ActivityIndicator size='large' color={Colors.primary} />
        ) : (
          <Text>No location chose yet!</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title='Get User Location'
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title='Pick on Map'
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
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
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
})
