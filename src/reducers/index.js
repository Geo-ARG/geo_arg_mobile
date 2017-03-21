import { combineReducers } from 'redux'
import EventsReducer from './reducer_events.js'
import locationReducer from './locationReducer'
import userReducer from './userReducer'
import eventDataReducer from './eventDataReducer'
import userEventReducer from './userEventReducer'

const rootReducers = combineReducers({
  events: EventsReducer,
  location: locationReducer,
  userId: userReducer,
  eventData: eventDataReducer,
  userEvent: userEventReducer,
})

export default rootReducers
