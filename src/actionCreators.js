export const marvelLoad = (name) => ({
  type: 'MARVEL_LOAD',
  payload: name,
})

export const marvelLoadSuccess = (data) => ({
  type: 'MARVEL_LOAD_SUCCESS',
  payload: data,
})

export const marvelLoadError = (message) => ({
  type: 'MARVEL_LOAD_FAILED',
  payload: message,
})

export const setValue = (value) => ({
  type: 'SET_VALUE',
  payload: value,
})

export const getCharacter = (value) => ({
  type: 'GET_CHARACTER',
  payload: value,
})

export const deleteCharacter = (id) => ({
  type: 'DELETE_CHARACTER',
  payload: id,
})

export const marvelNoData = () => ({
  type: 'MARVEL_NO_DATA'
})