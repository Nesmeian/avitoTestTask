import { IssueFormValues } from '@/types/form';
import { ApiEndpoints } from '../constants/api';
import { ApiGroupNames } from '../constants/api-group-name';
import { EndpointNames } from '../constants/endpoint-names';
import { Tags } from '../constants/tags';
import { apiSlice } from '../create-api';

export const tasksApi = apiSlice
  .enhanceEndpoints({
    addTagTypes: [Tags.TASKS],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createTaskIssue: builder.mutation<void, IssueFormValues>({
        query: (payload) => ({
          url: ApiEndpoints.TASK_CREATE,
          method: 'POST',
          apiGroupName: ApiGroupNames.TASKS,
          name: EndpointNames.TASKS,
          body: payload,
        }),
        invalidatesTags: [Tags.TASKS],
      }),
    }),
  });

export const { useCreateTaskIssueMutation } = tasksApi;
