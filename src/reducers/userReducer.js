export default (state= 56, action) => {
    switch (action.type) {
      case 'OnLogin':
            return action.userId
        break;
      default:
        return state
    }
}
