import React, { useState, useEffect, useCallback } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'

const MapScreen = (props) => {
  const initialLocation = props.navigation.getParam('initialLocation')
  const readonly = props.navigation.getParam('readonly')
  const [selectedLocation, setSelectedLocation] = useState(initialLocation)

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const selectLocationHandler = (event) => {
    if (readonly) return
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
  const readonly = navData.navigation.getParam('readonly')
  if (readonly) return

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
