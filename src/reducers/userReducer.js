export default (state= 1, action) => {
  switch (action.type) {
    case 'OnLogin':
      return action.userId
    break;
    default:
      return state
  }
}
