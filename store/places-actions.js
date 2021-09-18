import * as FileSystem from 'expo-file-system'

import { insertPlace } from '../helpers/db'

export const ADD_PLACE = 'ADD_PLACE'

export const addPlace = (title, image) => {
  return async (dispatch) => {
    const fileName = image.split('/').pop()
    const newPath = FileSystem.documentDirectory + fileName
    try {
      // move image
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      })
      // insert to db
      const dbResult = await insertPlace(
        title,
        newPath,
        'Dumyy address',
        14.2,
        13.2
      )
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.id,
          title,
          image: newPath,
        },
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
