import { Task } from 'redux-saga';
import { cancel, delay, fork, select, take } from 'redux-saga/effects';
import { selectBoards } from '../selectors/boards';
import { ADD_BOARD, EDIT_BOARD_NAME, REMOVE_BOARD, ADD_POST, EDIT_POST, REMOVE_POST } from '../store/Boards';
import { BoardStorage } from '../utils/localstorage';

function* storeBoards() {
  yield delay(500);
  const boardsData: ReturnType<typeof selectBoards> = yield select(selectBoards);
  BoardStorage.set(JSON.stringify(boardsData));
}

function* storeBoardSaga() {
  let task: Task | undefined = undefined;
  while (true) {
    yield take([ADD_BOARD, EDIT_BOARD_NAME, REMOVE_BOARD, ADD_POST, EDIT_POST, REMOVE_POST]);
    if (task) {
      yield cancel(task);
    }
    task = yield fork(storeBoards);
  }
}

export default storeBoardSaga;
