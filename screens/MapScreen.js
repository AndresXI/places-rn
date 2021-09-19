import React, { useState, useEffect, useCallback } from 'react'
import MapView, { Marker } from 'react-native-maps'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native'

import Colors from '../constants/Colors'

const MapScreen = (props) => {
  const [selectedLocation, setSelectedLocation] = useState()

  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const selectLocationHandler = (event) => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    })
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) return
    props.navigation.navigate('NewPlace', { pickedLocation: selectedLocation })
  }, [selectedLocation])

  useEffect(() => {
    props.navigation.setParams({ saveLocation: savePickedLocationHandler })
  }, [savePickedLocationHandler])

  let markerCoordinates
  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    }
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title='Picked Location' coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  )
}

MapScreen.navigationOptions = (navData) => {
  const saveFunc = navData.navigation.getParam('saveLocation')
  return {
    headerRight: () => (
      <TouchableOpacity style={styles.headerButton} onPress={saveFunc}>
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
    ),
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
  },
})

export default MapScreen
