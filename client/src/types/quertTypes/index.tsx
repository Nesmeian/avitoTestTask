export type Board = {
  id: number;
  name: string;
  description: string;
  taskCount: number;
};
export type BoardsResponse = {
  data: Board[];
};
