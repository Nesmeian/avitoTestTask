import { BoardStore } from '@/types/storeTypes';
import { createSlice } from '@reduxjs/toolkit';

const initialState: BoardStore = {
  name: '',
  boards: [],
  id: '',
  boardMap: {},
};
export const BoardSlice = createSlice({
  name: 'Board',
  initialState,
  reducers: {
    setBoardName: (state, actions) => {
      state.name = actions.payload;
    },
    setBoard: (state, actions) => {
      state.boards = actions.payload;
    },
    setBoardMap: (state, actions) => {
      state.boardMap = actions.payload;
    },
    setBoardId: (state, actions) => {
      state.id = actions.payload;
    },
  },
});

export const { setBoardName, setBoard, setBoardMap, setBoardId } =
  BoardSlice.actions;
export default BoardSlice.reducer;
