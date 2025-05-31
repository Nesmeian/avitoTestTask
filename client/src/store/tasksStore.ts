import { TasksStore } from '@/types/storeTypes';
import { createSlice } from '@reduxjs/toolkit';

const initialState: TasksStore = {
  tasks: [],
  allTasks: [],
};
export const TasksSlice = createSlice({
  name: 'Tasks',
  initialState,
  reducers: {
    setTasks(state, action) {
      state.allTasks = action.payload;
      state.tasks = action.payload;
    },
    setFilteredTasks(state, action) {
      state.tasks = action.payload;
    },
  },
});

export const { setTasks, setFilteredTasks } = TasksSlice.actions;
export default TasksSlice.reducer;
