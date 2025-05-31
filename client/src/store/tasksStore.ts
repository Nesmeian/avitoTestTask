import { TasksStore } from '@/types/storeTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: TasksStore = {
  tasks: [],
  allTasks: [],
  filterStatus: '',
  filterBoard: '',
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
    setFilterStatus(state, action: PayloadAction<string>) {
      state.filterStatus = action.payload;
    },
    setFilterBoard(state, action: PayloadAction<string>) {
      state.filterBoard = action.payload;
    },
  },
});

export const { setTasks, setFilteredTasks, setFilterStatus, setFilterBoard } =
  TasksSlice.actions;
export default TasksSlice.reducer;
