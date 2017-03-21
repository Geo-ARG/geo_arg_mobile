import { SEND_LOCATION, SCAN } from '../constants'

const initialData = {
  locationId: 'Unknown',
  nearbyUser : [
    {
      "id": 16,
      "geolocation": {
        "type": "Point",
        "coordinates": [
          6.123,
          106.543
        ]
      },
      "nearby": true,
      "Users": [
        {
          "id": 2,
          "username": "user2",
          "email": "user2@gmail.com",
          "totalScore": 0,
          "User_Locations": {
            "id": 7,
            "UserId": 2,
            "LocationId": 16,
          }
        }
      ]
    },
    {
      "id": 19,
      "geolocation": {
        "type": "Point",
        "coordinates": [
          6.123,
          106.543
        ]
      },
      "nearby": true,
      "Users": [
        {
          "id": 4,
          "username": "user1",
          "email": "user1@gmail.com",
          "totalScore": 0,
          "User_Locations": {
            "id": 10,
            "UserId": 4,
            "LocationId": 19,
          }
        }
      ]
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
