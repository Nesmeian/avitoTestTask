import { BoardsResponse, TaskResponse } from '@/types/quertTypes';
import { ApiEndpoints } from '../constants/api';
import { ApiGroupNames } from '../constants/api-group-name';
import { EndpointNames } from '../constants/endpoint-names';
import { Tags } from '../constants/tags';
import { apiSlice } from '../create-api';

export const getBoardsSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: [Tags.BOARDS_TASK, Tags.BOARDS],
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
      getBoardsById: builder.query<TaskResponse, string>({
        query: (id) => ({
          url: `${ApiEndpoints.BOARDS}/${id}`,
          method: 'GET',
          apiGroupName: ApiGroupNames.BOARDS_TASK,
          name: EndpointNames.BOARDS_TASK,
        }),
        providesTags: [Tags.BOARDS_TASK],
      }),
    }),
  });
export const { useGetBoardsQuery, useGetBoardsByIdQuery } = getBoardsSlice;
