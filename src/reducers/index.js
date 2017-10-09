import { combineReducers } from 'redux'
import mainReducer from './mainReducer'
import characterReducer from './characterReducer'

const rootReducer = combineReducers({
  mainReducer,
  characterReducer,
})

export default rootReducer