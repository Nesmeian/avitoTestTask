import { TasksStore } from '@/types/storeTypes';
import { createSlice } from '@reduxjs/toolkit';

const initialState: TasksStore = {
  tasks: [],
};
export const TasksSlice = createSlice({
  name: 'Tasks',
  initialState,
  reducers: {
    setTasks: (state, actions) => {
      state.tasks = actions.payload;
    },
  },
});

export const { setTasks } = TasksSlice.actions;
export default TasksSlice.reducer;
