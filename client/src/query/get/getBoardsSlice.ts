import { BoardsResponse, TasksResponse } from '@/types/queryTypes';
import { ApiEndpoints } from '../constants/api';
import { ApiGroupNames } from '../constants/api-group-name';
import { EndpointNames } from '../constants/endpoint-names';
import { Tags } from '../constants/tags';
import { apiSlice } from '../create-api';

export const getBoardsSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: [Tags.TASKS, Tags.BOARDS],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getBoards: builder.query<BoardsResponse, void>({
        query: () => ({
          url: ApiEndpoints.BOARDS,
          method: 'GET',
          apiGroupName: ApiGroupNames.BOARDS,
          name: EndpointNames.BOARDS,
        }),
        providesTags: [Tags.BOARDS],
      }),
      getBoardsById: builder.query<TasksResponse, string>({
        query: (id) => ({
          url: `${ApiEndpoints.BOARDS}/${id}`,
          method: 'GET',
          apiGroupName: ApiGroupNames.BOARDS,
          name: EndpointNames.BOARDS,
        }),
        providesTags: [Tags.BOARDS],
      }),
      getTasks: builder.query<TasksResponse, void>({
        query: () => ({
          url: ApiEndpoints.TASKS,
          method: 'GET',
          apiGroupName: ApiGroupNames.TASKS,
          name: EndpointNames.TASKS,
        }),
        providesTags: [Tags.TASKS],
      }),
    }),
  });
export const { useGetBoardsQuery, useGetBoardsByIdQuery, useGetTasksQuery } =
  getBoardsSlice;
