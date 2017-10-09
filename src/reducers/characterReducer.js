import { rank } from '../utils/characterHelper'

const DEFAULT_STATE = {
  characters: [],
  rank: [],
  selected: {}
}

const updateCharacter = (state, payload) => {
  let characters = state.characters.slice();
  characters.unshift(payload);
  const charRank = rank(characters);

  return {
    characters,
    rank: charRank,
    selected: payload,
  }
}

const characterReducer = (state = DEFAULT_STATE, action) => {
  const { payload } = action
  switch (action.type) {
    case 'GET_CHARACTER':
      return updateCharacter(state, payload);
    default:
      return state
  }
}

export default characterReducer