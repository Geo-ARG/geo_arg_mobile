const EventsReducer = (state = [] , action) => {
  switch (action.type) {
    case 'SET_EVENTS':
      return action.payload
    case 'CLEAR_EVENTS':
      return []
    default:
      return state
  }
}

export default EventsReducer
