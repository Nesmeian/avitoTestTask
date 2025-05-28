import { Task } from '@/types/queryTypes';

export const getFilteredTaskList = (data: Task[]) => {
  return {
    doneList: data.filter((task) => task.status === 'Done'),
    backlogList: data.filter((task) => task.status === 'Backlog'),
    inProgressList: data.filter((task) => task.status === 'InProgress'),
  };
};
