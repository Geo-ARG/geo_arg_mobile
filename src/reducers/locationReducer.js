import { SEND_LOCATION } from '../constants'

export default (state= 'Unknown', action) => {
    switch (action.type) {
      case SEND_LOCATION:
      console.log(action);
            return action.locationId
        break;
      default:
        return state
    }
}
