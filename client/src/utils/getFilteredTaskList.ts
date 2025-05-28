import { TaskType } from '@/types/quertTypes';
export const getFilteredTaskList = (data: TaskType[]) => {
  return {
    doneList: data.filter((task) => task.status === 'Done'),
    backlogList: data.filter((task) => task.status === 'Backlog'),
    inProgressList: data.filter((task) => task.status === 'InProgress'),
  };
};
