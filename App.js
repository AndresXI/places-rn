import React from 'react'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

import PlacesNavigator from './navigation/PlacesNavigator'
import placesReducers from './store/places-reducers'
import { init } from './helpers/db'

init()
  .then(() => {
    console.log('initialized db')
  })
  .catch((err) => {
    console.log('initialized db failed')
    console.log(err)
  })

const rootReducer = combineReducers({
  places: placesReducers,
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  )
}
