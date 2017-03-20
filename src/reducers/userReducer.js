export default (state= 4, action) => {
  switch (action.type) {
    case 'OnLogin':
      return action.userId
    break;
    default:
      return state
  }
}
