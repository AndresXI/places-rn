import React, { useState } from 'react'
import {
  ScrollView,
  View,
  Button,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native'
import Colors from '../constants/Colors'

const NewPlaceScreen = (props) => {
  const [title, setTitle] = useState('')

  const titleChangeHandler = (text) => {
    setTitle(text)
  }

  const savePlaceHandler = () => {}

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          value={title}
          onChangeText={titleChangeHandler}
        />
        <Button
          title='Save Place'
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  )
}

NewPlaceScreen.navigationOptions = (navDate) => {
  return {
    headerTitle: 'Add a New Place',
  }
}

const styles = StyleSheet.create({
  form: { margin: 30 },
  label: { fontSize: 18, marginBottom: 15 },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
})

export default NewPlaceScreen
