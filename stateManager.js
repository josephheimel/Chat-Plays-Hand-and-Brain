let state = { votes: [] }
const votesReducer = (oldState, payload) => {
  const { username, message } = payload
  const usersWhoAlreadyVoted = state.votes.map(
      ({ username }) => username
  )
  console.log({ usersWhoAlreadyVoted})
  if (usersWhoAlreadyVoted.includes(username)) {
      return oldState 
  } else if (!validateMove(message)) {
      return oldState 
  }
  const newState = { ...oldState, votes: [ ...oldState.votes, { username, vote: validateMove(message) }] }
  return newState
}
// TODO
const combineReducers = (...reducers) => (
    (...args) => reducers.reduce((combined, reducer) => (

    ), )
)
const createNewState = combineReducers(
    votesReducer
)
window.state = state
window.createNewState = createNewState