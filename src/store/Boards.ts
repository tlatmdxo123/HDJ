import { Board } from '../types/board';
import { Post } from '../types/post';
import { deepCopy } from '../utils/deepCopy';
import { BoardStorage } from '../utils/localstorage';

export const ADD_BOARD = 'ADD_BOARD' as const;
export const EDIT_BOARD_NAME = 'EDIT_BOARD_NAME' as const;
export const REMOVE_BOARD = 'REMOVE_BOARD' as const;
export const ADD_POST = 'ADD_POST' as const;
export const EDIT_POST = 'EDIT_POST' as const;
export const REMOVE_POST = 'REMOVE_POST' as const;

//actions
export const addBoard = (board: Board) => {
  return {
    type: ADD_BOARD,
    payload: board,
  };
};

export const editBoardName = (id: string, name: string) => {
  return {
    type: EDIT_BOARD_NAME,
    payload: { id, name },
  };
};

export const removeBoard = (id: string) => {
  return {
    type: REMOVE_BOARD,
    payload: id,
  };
};

export const addPost = (boardId: string, post: Post) => {
  return {
    type: ADD_POST,
    payload: { boardId, post },
  };
};

export const editPost = (boardId: string, post: Post) => {
  return {
    type: EDIT_POST,
    payload: { boardId, post },
  };
};

export const removePost = (boardId: string, id: string) => {
  return {
    type: REMOVE_POST,
    payload: { boardId, id },
  };
};

export type RequestAction =
  | ReturnType<typeof addPost>
  | ReturnType<typeof editPost>
  | ReturnType<typeof removePost>
  | ReturnType<typeof addBoard>
  | ReturnType<typeof editBoardName>
  | ReturnType<typeof removeBoard>;

//reducer
const storedBoardData = BoardStorage.get();
const initialState: Board[] = storedBoardData ? storedBoardData : [];

function boardsReducer(state: Board[] = initialState, action: RequestAction) {
  switch (action.type) {
    case ADD_BOARD:
      return [...deepCopy(state), deepCopy(action.payload)];
    case EDIT_BOARD_NAME:
      return state.map((board) => {
        return board.id === action.payload.id ? { ...deepCopy(board), name: action.payload.name } : board;
      });
    case REMOVE_BOARD:
      return state.filter((board) => board.id !== action.payload);
    case ADD_POST:
      return state.map((board) => {
        return board.id === action.payload.boardId ? { ...deepCopy(board), posts: board.posts.concat(action.payload.post) } : board;
      });
    case EDIT_POST:
      return state.map((board) => {
        return board.id === action.payload.boardId
          ? {
              ...deepCopy(board),
              posts: board.posts.map((post) => (post.id === action.payload.post.id ? { ...action.payload.post } : post)),
            }
          : board;
      });
    case REMOVE_POST:
      return state.map((board) => {
        return board.id === action.payload.boardId
          ? { ...deepCopy(board), posts: board.posts.filter((post) => post.id !== action.payload.id) }
          : board;
      });
    default:
      return state;
  }
}

export default boardsReducer;
