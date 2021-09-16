import React from 'react'
import { View, Button, Text, StyleSheet, Image, Alert } from 'react-native'

import * as ImagePicker from 'expo-image-picker'
import Colors from '../constants/Colors'

const ImgPicker = (props) => {
  const verifyPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app',
        [{ text: 'Okay' }]
      )
      return false
    }
    return true
  }

  const takeImageHandler = async () => {
    const hasPermissions = await verifyPermissions()
    if (!hasPermissions) return
    ImagePicker.launchCameraAsync()
  }

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        <Text>No image picked yet</Text>
        <Image style={styles.image} />
      </View>
      <Button
        title='Take Image'
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
})

export default ImgPicker
