import { UserResponse } from '@/types/queryTypes';
import { ApiEndpoints } from '../constants/api';
import { ApiGroupNames } from '../constants/api-group-name';
import { EndpointNames } from '../constants/endpoint-names';
import { Tags } from '../constants/tags';
import { apiSlice } from '../create-api';

export const getBoardsSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: [Tags.USERS],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUsers: builder.query<UserResponse, void>({
        query: () => ({
          url: ApiEndpoints.USERS,
          method: 'GET',
          apiGroupName: ApiGroupNames.USERS,
          name: EndpointNames.USERS,
        }),
        providesTags: [Tags.USERS],
      }),
    }),
  });
export const { useGetUsersQuery } = getBoardsSlice;
