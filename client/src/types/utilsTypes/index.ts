import { useUpdateTaskStatusMutation } from '@/query/put';
import { ColumnsState } from '../storeTypes';
import { Dispatch, SetStateAction } from 'react';

type UpdateTaskStatusTrigger = ReturnType<
  typeof useUpdateTaskStatusMutation
>[0];
export type UseTaskDragAndDropProps = {
  columns: ColumnsState;
  setColumns: Dispatch<SetStateAction<ColumnsState>>;
  updateTaskStatus: UpdateTaskStatusTrigger;
};
