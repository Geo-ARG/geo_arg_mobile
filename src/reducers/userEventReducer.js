import { QUEST_LIST } from '../constants'

export default (state = [], action) => {
  switch (action.type) {
    case QUEST_LIST:
        return action.quests
      break;
    default:
      return state
  }
}
