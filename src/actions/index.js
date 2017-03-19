
import {SEND_LOCATION, WATCH} from '../constants'

export const updateLocation = (locationId) => ({type: SEND_LOCATION, locationId })

export const sendLocation = (coords, userId) => {
  return (dispatch) => {
    let body =  {
      latitude: coords.latitude,
      longitude: coords.longitude,
      userId: userId
    }
    console.log('sendloc');
    // fetch(`http://geo-arg-server-dev.ap-southeast-1.elasticbeanstalk.com/api/locations`, {
    fetch(`http://localhost:3000/api/locations`)
      // method: 'POST',
      // headers: {
      //   'Accept': 'application/json, text/plain, */*',
      //   'Content-Type': 'application/json'
      // },
      // body: 'json='+JSON.stringify(body)
      // })
    .then(response => response.json())
    .then(location => dispatch(updateLocation(location.id)))
    .catch (error => {console.log('Request failed', error)});
  }
}

export const wathchLocation = (coords, locationId) => {
  return (dispatch) => {
    console.log('WATCH');
    console.log(coords);
    console.log(locationId);
    let body = {
      latitude: coords.latitude,
      longitude: coords.longitude
    }
    // fetch(`http://geo-arg-server-dev.ap-southeast-1.elasticbeanstalk.com/api/locations/${locationId}`, {
    fetch(`http://localhost:3000/api/locations/api/locations/${locationId}`, {
      method: 'PUT',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: JSON.stringify(body)
    })
  }
}

export const setEvents = (events) => {
  return {
    type: 'SET_EVENTS',
    payload: events
  }
}

export const fetchEvents = () => {
  return (dispatch) => {
    fetch(`http://geo-arg-server-dev.ap-southeast-1.elasticbeanstalk.com/api/events`)
      .then(response => {
        return response.json()
      })
      .then(resp => {
        return dispatch(setEvents(resp))
      })
      .catch(err => {})
    )
  }
}
