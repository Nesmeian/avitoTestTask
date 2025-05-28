export type BoardType = {
  id: number;
  name: string;
  description: string;
  taskCount: number;
};
export type BoardsResponse = {
  data: BoardType[];
};
export type TaskType = {
  id: number;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Backlog' | 'InProgress' | 'Done';
};
export type TaskResponse = {
  data: TaskType[];
};
export type TaskListProps = {
  data: TaskType[];
};
