export default (state = [] , action) => {
  switch (action.type) {
    case 'EVENT_DATA_PROFILE':
      return action.payload
    default:
      return state
  }
}
