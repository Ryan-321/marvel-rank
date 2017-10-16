const DEFAULT_STATE = {
  value: '',
  searchTerm: '',
};

const mainReducer = (state = DEFAULT_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'SET_VALUE':
      const { searchTerm } = state
      return {
        searchTerm,
        value: payload
      }
    case 'SET_SEARCH_TERM':
      const { value } = state
      return {
        searchTerm: value,
        value: '',
      }
    default:
      return state;
  }
}

export default mainReducer