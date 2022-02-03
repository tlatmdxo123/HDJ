import { combineReducers } from 'redux';
import boardsReducer from './Boards';

const rootReducer = combineReducers({
  boards: boardsReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
