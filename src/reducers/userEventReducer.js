import { QUEST_LIST, VERIFY_QUEST } from '../constants'

export default (state = [], action) => {
  switch (action.type) {
    case QUEST_LIST:
      return action.quests
    case VERIFY_QUEST:
      return state.map(ue => ue.id === action.quest.id ? {...ue, completion: action.quest.completion} : ue)
    default:
      return state
  }
}
