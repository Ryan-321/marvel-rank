import { updateCharacter, deleteCharacter } from '../utils/characterHelper'

const DEFAULT_STATE = {
  characters: [],
  rank: [],
  selected: {}
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