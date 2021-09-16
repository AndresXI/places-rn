import React from 'react'

import { View, Text, StyleSheet } from 'react-native'

const NewPlaceScreen = (props) => {
  return (
    <View>
      <Text>New place</Text>
    </View>
  )
}

NewPlaceScreen.navigationOptions = (navDate) => {
  return {
    headerTitle: 'Add a New Place',
  }
}

const styles = StyleSheet.create({})

export default NewPlaceScreen
