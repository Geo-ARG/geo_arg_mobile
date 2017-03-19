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
  }
}
