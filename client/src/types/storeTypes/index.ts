import { Board, Task, User } from '../queryTypes';
interface SuccessState {
  state: boolean;
  message: string;
}

export type BoardStore = {
  name: string;
  boards: Board[];
  id: string;
  boardMap: Record<number | string, string>;
};
export type UsersStore = {
  users: User[];
  assigneeMap: Record<number | string, string>;
};
export type QueryStateType = {
  isSuccess: SuccessState;
  isError: SuccessState;
};
export type TasksStore = {
  filterStatus: string;
  filterBoard: string;
  allTasks: Task[];
  tasks: Task[];
};
export type ColumnsState = {
  Backlog: Task[];
  InProgress: Task[];
  Done: Task[];
};
