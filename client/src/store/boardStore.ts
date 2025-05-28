import { BoardStore } from '@/types/storeTypes';
import { createSlice } from '@reduxjs/toolkit';

const initialState: BoardStore = {
  name: '',
};
export const BoardSlice = createSlice({
  name: 'Board',
  initialState,
  reducers: {
    setBoardName: (state, actions) => {
      state.name = actions.payload;
    },
  },
});

export const { setBoardName } = BoardSlice.actions;
export default BoardSlice.reducer;
