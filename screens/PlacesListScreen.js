import React, { useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import HeaderButton from '../components/HeaderButton'
import PlaceItem from '../components/PlaceItem'
import * as placesActions from '../store/places-actions'

const PlacesListScreen = (props) => {
  const places = useSelector((state) => state.places.places)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('dipsatching...')
    dispatch(placesActions.loadPlaces())
  }, [dispatch])

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => {
        // console.log('tiemm', itemData.item)
        return (
          <PlaceItem
            image={itemData.item.imageUri}
            title={itemData.item.title}
            address={itemData.item.address}
            onSelect={() =>
              props.navigation.navigate('PlaceDetail', {
                placeTitle: itemData.item.title,
                placeId: itemData.item.id,
              })
            }
          />
        )
      }}
    />
  )
}

PlacesListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'All Places',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          onPress={() => {
            navData.navigation.navigate('NewPlace')
          }}
          title='Add Place'
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
        />
      </HeaderButtons>
    ),
  }
}

const styles = StyleSheet.create({})

export default PlacesListScreen
