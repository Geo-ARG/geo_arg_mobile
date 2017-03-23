import { SEND_LOCATION, SCAN } from '../constants'

const initialData = {
  locationId: 526,
  nearbyUser : []
}

export default (state= initialData, action) => {
  switch (action.type) {
    case SEND_LOCATION:
      return {...state, locationId: action.payload}
    break;
    case SCAN:
      return {...state, nearbyUser: action.payload}
    default:
      return state
  }
}
