import { Tags } from '../constants/tags';
import { apiSlice } from '../create-api';
import { ApiEndpoints } from '../constants/api';
import { ApiGroupNames } from '../constants/api-group-name';
import { updateReg, UpdateStatusReg } from '@/types/queryTypes';
import { EndpointNames } from '../constants/endpoint-names';
import { handleStatusUpdateOnUpdate } from '../helpers';

export const tasksApiPut = apiSlice
  .enhanceEndpoints({
    addTagTypes: [Tags.TASKS],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      updateTask: builder.mutation<void, updateReg>({
        query: (payload) => ({
          url: `${ApiEndpoints.TASK_UPDATE}/${payload.id}`,
          method: 'PUT',
          apiGroupName: ApiGroupNames.TASKS,
          name: EndpointNames.TASKS,
          body: payload,
        }),
        invalidatesTags: [Tags.TASKS],
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          await handleStatusUpdateOnUpdate(
            { id: arg.id || 0, status: arg.status },
            dispatch,
            queryFulfilled,
          );
        },
      }),
      updateTaskStatus: builder.mutation<void, UpdateStatusReg>({
        query: ({ id, status }) => ({
          url: `${ApiEndpoints.TASK_UPDATE_STATUS}/${id}`,
          method: 'PUT',
          apiGroupName: ApiGroupNames.TASKS,
          name: EndpointNames.TASKS,
          body: { status },
        }),
      }),
    }),
  });

export const { useUpdateTaskStatusMutation, useUpdateTaskMutation } =
  tasksApiPut;
