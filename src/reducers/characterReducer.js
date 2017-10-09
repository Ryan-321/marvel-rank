import { rank } from '../utils/characterHelper'

const DEFAULT_STATE = {
  characters: [],
  rank: [],
  selected: {}
}

const updateCharacter = (state, character) => {
  const characters = state.characters.slice();
  characters.unshift(character);
  const characterRank = rank(characters);

  return {
    characters,
    rank: characterRank,
    selected: character,
  }
}

const deleteCharacter = (state, id) => {
  const copy = state.characters.slice();
  const characters = copy.filter((c) => c.id !== id);
  const charRank = rank(characters);

  return {
    ...state,
    characters,
    rank: charRank,
  }
}

const characterReducer = (state = DEFAULT_STATE, action) => {
  const { payload } = action
  switch (action.type) {
    case 'GET_CHARACTER':
      return updateCharacter(state, payload);
    case 'DELETE_CHARACTER':
      return deleteCharacter(state, payload);
    default:
      return state
  }
}

export default characterReducer