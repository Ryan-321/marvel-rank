import {
  createCharacter,
  extractStats, rank,
} from '../utils/characterHelper'


const DEFAULT_STATE = {
  value: '',
  characters: [],
  rank: [],
  selected: {},
  stats: [],
}

const mainReducer = (state = DEFAULT_STATE, action) => {
  const { payload } = action
  switch (action.type) {
    case 'SET_VALUE': {
      return {
        ...state,
        value: payload,
      }
    }
    case 'MARVEL_LOAD_SUCCESS':
      const character = createCharacter(action.payload)
      const [...characters] = state.characters
      characters.unshift(character)
      const characterRank = rank(characters);
      const stats = extractStats(character)

      return {
        value: '',
        rank: characterRank,
        selected: character,
        stats,
        characters,
      }
    case 'MARVEL_LOAD_FAILED':
      console.log('failure :0(')
      return DEFAULT_STATE
    case 'GET_CHARACTER': {
      const [...characters] = state.characters
      const character = characters.find(c => c.id === payload)
      const stats = extractStats(character)

      return {
        ...state,
        stats,
        selected: character,
      }
    }
    case 'DELETE_CHARACTER': {
      const id = payload
      const [...characters] = state.characters
      const filteredCharacters = characters.filter((c) => c.id !== id);
      const charRank = rank(filteredCharacters);

      return {
        ...state,
        characters: filteredCharacters,
        rank: charRank,
      }
    }
    default:
      return state
  }
}

export default mainReducer