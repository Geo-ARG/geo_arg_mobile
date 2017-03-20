import { combineReducers } from 'redux'
import EventsReducer from './reducer_events.js'
import locationReducer from './locationReducer'
import userReducer from './userReducer'

const rootReducers = combineReducers({
  events: EventsReducer,
  location: locationReducer,
  userId: userReducer,
})

export default rootReducers
