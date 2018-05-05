import { call, put, all, takeEvery } from 'redux-saga/effects'
import { fetchDataFromAPI } from './utils/api'
import {
  marvelLoadSuccess,
  marvelLoadError,
  marvelNoData,
} from './actionCreators'



export function* fetchMarvelData(action) {
  try {
    const name = action.payload
    const data = yield call(fetchDataFromAPI, name)
    if (!data) {
      yield put(marvelNoData())
    } else {
      yield put(marvelLoadSuccess(data))
    }
  }
  catch(error) {
    yield put(marvelLoadError(error))
  }
}

export function* watchMarvelAPI() {
  yield takeEvery('MARVEL_LOAD', fetchMarvelData)
}

export default function* rootSaga() {
  yield all([
    watchMarvelAPI(),
    fetchDataFromAPI(),
  ])
}