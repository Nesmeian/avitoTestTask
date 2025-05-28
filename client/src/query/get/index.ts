import { ApiEndpoints } from '../constants/api';
import { ApiGroupNames } from '../constants/api-group-name';
import { EndpointNames } from '../constants/endpoint-names';
import { Tags } from '../constants/tags';
import { apiSlice } from '../create-api';

export const getBoardsSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: [Tags.BOARDS],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getBoards: builder.query<void, void>({
        query: () => ({
          url: ApiEndpoints.BOARDS,
          method: 'GET',
          apiGroupName: ApiGroupNames.BOARDS,
          name: EndpointNames.BOARDS,
        }),
        providesTags: [Tags.BOARDS],
      }),
    }),
  });
export const { useGetBoardsQuery } = getBoardsSlice;
