import { SEND_LOCATION, SCAN } from '../constants'

const initialData = {
  locationId: 'Unknown',
  nearbyUser : [
    {
      User: [{
        username: 'Yoni',
        id: 1
      }]
    },
    {
      User: [{
        username: 'Fadly',
        id: 2
      }]
    },
    {
      User: [{
        username: 'Syanmil',
        id: 3
      }]
    }
  ]
}

export default (state= initialData, action) => {
  switch (action.type) {
    case SEND_LOCATION:
      return {...state, locationId: action.locationId}
    break;
    case SCAN:
      return {...state, nearbyUser: action.nearby}
    default:
      return state
  }
}
