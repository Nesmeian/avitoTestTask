import { AppDispatch } from '@/store/configure-store';
import { IssueFormValues } from '@/types/form';
import { CreateTaskResponse } from '@/types/queryTypes';
import { tasksApiPut } from '../put';

export async function handleStatusUpdateOnCreate(
  arg: IssueFormValues,
  dispatch: AppDispatch,
  queryFulfilled: Promise<{ data: CreateTaskResponse }>,
) {
  const { data } = await queryFulfilled;
  await dispatch(
    tasksApiPut.endpoints.updateTaskStatus.initiate({
      id: data.data.id,
      status: arg.status,
    }),
  ).unwrap();
}

export async function handleStatusUpdateOnUpdate(
  arg: { id: number; status: string },
  dispatch: AppDispatch,
  queryFulfilled: Promise<{ data: unknown }>,
) {
  console.log(arg.id);
  await queryFulfilled;
  await dispatch(
    tasksApiPut.endpoints.updateTaskStatus.initiate({
      id: arg.id,
      status: arg.status,
    }),
  ).unwrap();
}
