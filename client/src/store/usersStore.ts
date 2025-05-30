import { UsersStore } from '@/types/storeTypes';
import { createSlice } from '@reduxjs/toolkit';

const initialState: UsersStore = {
  users: [],
  assigneeMap: {},
};
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, actions) => {
      state.users = actions.payload;
    },
    setAssigneeMap: (state, actions) => {
      state.assigneeMap = actions.payload;
    },
  },
});

export const { setUsers, setAssigneeMap } = usersSlice.actions;
export default usersSlice.reducer;
