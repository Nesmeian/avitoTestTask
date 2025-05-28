import { useGetBoardsQuery } from '@/query/get';

export const BoardsList = () => {
  const { data, isLoading, isError } = useGetBoardsQuery();
  console.log(data);
  return <>Jack</>;
};
