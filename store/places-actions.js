import * as FileSystem from 'expo-file-system'

import { insertPlace, fetchPlaces } from '../helpers/db'

export const ADD_PLACE = 'ADD_PLACE'
export const SET_PLACES = 'SET_PLACES'

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

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces()
      console.log('db res', dbResult)
      dispatch({ type: SET_PLACES, places: dbResult.rows._array })
    } catch (err) {
      throw err
    }
  }
}
