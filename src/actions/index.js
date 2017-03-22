
import { SEND_LOCATION, SCAN, QUEST_LIST, VERIFY_QUEST, SELECT_QUEST, SET_EVENTS, CLEAR_EVENTS, SET_EVENT, EVENT_DATA_PROFILE, SAVE_USER_LOGIN } from '../constants'

export const updateLocation = (locationId) => ({type: SEND_LOCATION, payload: locationId })
export const updateNearby = (nearby) => ({type: SCAN, payload: nearby })
export const setQuestList = (quests) => ({type: QUEST_LIST, payload: quests})
export const verifyQuest = (quest) => ({type: VERIFY_QUEST, payload: quest})
export const setCameraId = (usereventid) => ({type: SELECT_QUEST, payload: usereventid})
export const setEvents = (events) => ({type: SET_EVENTS, payload: events})
export const clearEvents = () => ({type: CLEAR_EVENTS})
export const joinGame = (eventData) => ({type: SET_EVENT, payload: eventData})
export const showEventUser = (resultEventUser) => ({type: EVENT_DATA_PROFILE, payload: resultEventUser})
export const saveUserLogin = (dataUserLogin) => ({type: SAVE_USER_LOGIN, payload: dataUserLogin})

export const saveData = (username, email) => {
  return (dispatch) => {
    if (username != "") {
      fetch('http://geo-arg-server-dev.ap-southeast-1.elasticbeanstalk.com/auth/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username, email: email})
      }).then(res => res.json()).then(newDataUser => {
        AsyncStorage.setItem('dataUser', JSON.stringify(newDataUser),()=>{
          return dispatch(saveUserLogin(newDataUser))
        })
      })
    }
  }
}

export const checkAnswer = (userEventId, userAnswer) => {
  let body =  {
    userAnswer
  }
  return (dispatch) => {
    fetch(`http://geo-arg-server-dev.ap-southeast-1.elasticbeanstalk.com/api/userevents/${userEventId}/quests/useranswer`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(quest => {
        return dispatch(verifyQuest(quest))
      })
      .catch(error => {console.log('Request failed', error)});
  }
}

export const scanNearby = (latitude, longitude) => {
  let body =  {
    latitude: latitude,
    longitude: longitude
  }
  return (dispatch) => {
    fetch(`http://geo-arg-server-dev.ap-southeast-1.elasticbeanstalk.com/api/locations/scan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
      })
    .then(response => response.json())
    .then(nearby => {
      console.log(nearby);
      return dispatch(updateNearby(nearby))
    })
    .catch(error => {console.log('Request failed', error)});
  }
}

export const sendLocation = (coords, userId) => {
  let body =  {
    latitude: coords.latitude,
    longitude: coords.longitude,
    UserId: userId
  }
  return (dispatch) => {
    fetch(`http://geo-arg-server-dev.ap-southeast-1.elasticbeanstalk.com/api/locations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
      })
    .then(response => response.json())
    .then(location => {
      return dispatch(updateLocation(location.Locations.id))
    })
    .catch(error => {console.log('Request failed', error)});
  }
}

export const watchLocation = (coords, locationId) => {
  let body = {
    latitude: coords.latitude,
    longitude: coords.longitude
  }
  return (dispatch) => {
    fetch(`http://geo-arg-server-dev.ap-southeast-1.elasticbeanstalk.com/api/locations/${locationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {console.log(data);})
    .catch(err => {})
  }
}

export const fetchQuestList = (UserId, EventId) => {
  return (dispatch) => {
    fetch(`http://geo-arg-server-dev.ap-southeast-1.elasticbeanstalk.com/api/userevents/user/${UserId}/event/${EventId}`)
      .then(response => response.json())
      .then(quests => {
        return dispatch(setQuestList(quests))
      })
      .catch(error => {console.log('Request failed', error)});
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


export const updateAnswerPhoto = (idevent, answeruser) => {
  return (dispatch) => {
    fetch('http://geo-arg-server-dev.ap-southeast-1.elasticbeanstalk.com/api/userevents/'+idevent, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({userAnswer: answeruser})
    })
  }
}

export const getUserEventByIdUser = (idUserLogin) => {
  return (dispatch) => {
    fetch('http://geo-arg-server-dev.ap-southeast-1.elasticbeanstalk.com/api/userevents/user/'+idUserLogin, {
    }).then(res => res.json())
    .then(resultEventUser => {
      dispatch(showEventUser(resultEventUser))
    })
  }
}
