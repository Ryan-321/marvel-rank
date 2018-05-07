import mainReducer from './mainReducer'
import {
  setValue,
  marvelLoad,
  marvelLoadSuccess,
  marvelLoadError,
  getCharacter,
  deleteCharacter,
  marvelNoData,
} from '../actionCreators'

const DEFAULT_STATE = {
  value: '',
  characters: [],
  rank: [],
  selected: {},
  stats: [],
  loading: false,
  noData: false,
}

describe('mainReducer', () => {
  it('should handle SET_VALUE', () => {
    const valueState = {...DEFAULT_STATE, value: 'Peant Butter'}
    const action = setValue('Peant Butter')

    expect(mainReducer(DEFAULT_STATE, action)).toEqual({...valueState})
  })

  it('should handle MARVEL_LOAD', () => {
    const loadState = {...DEFAULT_STATE, loading: true}
    const action = marvelLoad(true)

    expect(mainReducer(DEFAULT_STATE, action)).toEqual({...loadState})
  })

  it('should handle MARVEL_NO_DATA', () => {
    const noDataState = {...DEFAULT_STATE, noData: true}
    const action = marvelNoData(true)

    expect(mainReducer(DEFAULT_STATE, action)).toEqual({...noDataState})
  })


})
