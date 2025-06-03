import { QueryStateType } from '@/types/storeTypes';
import { createSlice } from '@reduxjs/toolkit';

const initialState: QueryStateType = {
  isSuccess: {
    state: false,
    message: '',
  },
  isError: {
    state: false,
    message: '',
  },
};
export const queryState = createSlice({
  name: 'queryState',
  initialState,
  reducers: {
    setIsSuccess: (state, action) => {
      state.isSuccess = {
        state: true,
        message: action.payload,
      };
      state.isError = {
        state: false,
        message: '',
      };
    },
    setIsError: (state, action) => {
      state.isError = {
        state: true,
        message: action.payload,
      };
      state.isSuccess = {
        state: false,
        message: '',
      };
    },
    clearState: (state) => {
      state.isSuccess = {
        state: false,
        message: '',
      };
      state.isError = {
        state: false,
        message: '',
      };
    },
  },
});

export const { setIsSuccess, setIsError, clearState } = queryState.actions;
export default queryState.reducer;
