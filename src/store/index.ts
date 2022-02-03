import { combineReducers } from 'redux';
import boardsReducer from './Boards';
import tabReducer from './Tab';

const rootReducer = combineReducers({
  boards: boardsReducer,
  currentTab: tabReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
