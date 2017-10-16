import { extractStats } from './../utils/characterHelper'

const DEFAULT_STATE = {
  stats: [],
};

const statsReducer = (state = DEFAULT_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'GET_STATS':
      return { stats: extractStats(payload) }
    default:
      return state;
  }
}

export default statsReducer