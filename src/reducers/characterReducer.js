import { rank } from '../utils/characterHelper'

const DEFAULT_STATE = {
  characters: [],
  rank: [],
  selected: {}
}

const updateCharacter = (state, payload) => {
  let characters = this.state.characters.slice();
  characters.unshift(payload);
  const rank = rank(characters);

  return {
    characters,
    rank,
    selected: payload,
  }
}

const characterReducer = (state = DEFAULT_STATE, action) => {
  const { payload } = action
  console.log(payload)
  switch (action.type) {
    case 'GET_CHARACTER':
      const updatedState = updateCharacter(state, payload);
      console.log(updatedState)
      return updatedState;
    default:
      return state
  }
}

export default characterReducer