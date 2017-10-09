
export const setSearchTerm = () => ({
  type: 'SET_SEARCH_TERM'
})

export const setValue = (value) => ({
  type: 'SET_VALUE',
  payload: value,
})

export const getCharacter = (value) => ({
  type: 'GET_CHARACTER',
  payload: value
})