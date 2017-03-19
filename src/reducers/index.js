import { combineReducers } from 'redux'
import EventsReducer from './reducer_events.js'

const rootReducers = combineReducers({
  events: EventsReducer
})

export default rootReducers
