export default (state = [] , action) => {
  switch (action.type) {
    case 'SAVE_USER_LOGIN':
      return action.payload
    default:
      return state
  }
}
