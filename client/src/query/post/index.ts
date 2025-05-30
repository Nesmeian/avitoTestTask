import { IssueFormValues } from '@/types/form';
import { ApiEndpoints } from '../constants/api';
import { ApiGroupNames } from '../constants/api-group-name';
import { EndpointNames } from '../constants/endpoint-names';
import { Tags } from '../constants/tags';
import { apiSlice } from '../create-api';
import { CreateTaskResponse } from '@/types/queryTypes';
import { handleStatusUpdateOnCreate } from '../helpers';

export const tasksApiPost = apiSlice
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
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          await handleStatusUpdateOnCreate(arg, dispatch, queryFulfilled);
        },
      }),
    }),
  });

export const { useCreateTaskIssueMutation } = tasksApiPost;
