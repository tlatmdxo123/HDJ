import { all } from 'redux-saga/effects';
import storeBoardSaga from './storeBoards';

export default function* rootSaga() {
  yield all([storeBoardSaga()]);
}
