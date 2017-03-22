import { SELECT_QUEST } from '../constants'

export default (state= 0, action) => {
  switch (action.type) {
    case SELECT_QUEST:
      return action.usereventid
    default:
      return state
  }
}
