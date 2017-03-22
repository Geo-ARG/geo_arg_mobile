import { EVENT_DATA_PROFILE } from '../constants'
let initialData = {
  userData: [],
  userEvent: []
}

export default (state = initialData , action) => {
  switch (action.type) {
    case EVENT_DATA_PROFILE:
      return {...state, userEvent: action.payload}
    default:
      return state
  }
}
