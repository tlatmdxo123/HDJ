import { RootState } from '../store';

//selectors
export const selectBoards = (state: RootState) => state.boards;
export const selectBoard = (id: string) => (state: RootState) => state.boards.find((board) => board.id === id);
