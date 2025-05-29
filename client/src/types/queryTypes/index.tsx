type Status = 'Backlog' | 'InProgress' | 'Done';
type Priority = 'Low' | 'Medium' | 'High';
type StatusName = 'Todo' | 'In Progress' | 'Completed';
export type Board = {
  id: number;
  name: string;
  description: string;
  taskCount: number;
};

export type Assignee = {
  id: number;
  fullName: string;
  email: string;
  avatarUrl: string;
};
export type AssigneeProps = {
  assignee: Assignee;
};

export type Task = {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  boardId: number;
  boardName: string;
  assignee: Assignee;
};

export type ApiResponse<T> = {
  data: T[];
};

export type BoardsResponse = ApiResponse<Board>;
export type TasksResponse = ApiResponse<Task>;

export type TaskListProps = {
  status?: StatusName;
  tasks: Task[];
};
