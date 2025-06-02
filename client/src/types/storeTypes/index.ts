import { Board, Task, User } from '../queryTypes';

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
