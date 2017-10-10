import { combineReducers } from 'redux'
import mainReducer from './mainReducer'
import characterReducer from './characterReducer'
import statsReducer from './statsReducer'

const rootReducer = combineReducers({
  mainReducer,
  characterReducer,
  statsReducer,
})

export default rootReducer