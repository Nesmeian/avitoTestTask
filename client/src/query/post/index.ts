import { IssueFormValues } from '@/types/form';
import { ApiEndpoints } from '../constants/api';
import { ApiGroupNames } from '../constants/api-group-name';
import { EndpointNames } from '../constants/endpoint-names';
import { Tags } from '../constants/tags';
import { apiSlice } from '../create-api';
import { CreateTaskResponse, UpdateStatusReg } from '@/types/queryTypes';

export const tasksApi = apiSlice
  .enhanceEndpoints({
    addTagTypes: [Tags.TASKS],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createTaskIssue: builder.mutation<CreateTaskResponse, IssueFormValues>({
        query: (payload) => ({
          url: ApiEndpoints.TASK_CREATE,
          method: 'POST',
          apiGroupName: ApiGroupNames.TASKS,
          name: EndpointNames.TASKS,
          body: payload,
        }),
        invalidatesTags: [Tags.TASKS],
      }),
      updateTaskStatus: builder.mutation<void, UpdateStatusReg>({
        query: ({ id, status }) => ({
          url: `/tasks/updateStatus/${id}`,
          method: 'PUT',
          apiGroupName: ApiGroupNames.TASKS,
          name: EndpointNames.TASKS,
          body: { status },
        }),
        invalidatesTags: [Tags.TASKS],
      }),
    }),
  });

export const { useCreateTaskIssueMutation, useUpdateTaskStatusMutation } =
  tasksApi;
