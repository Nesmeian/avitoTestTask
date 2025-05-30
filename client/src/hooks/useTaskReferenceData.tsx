import { useGetBoardsQuery } from '@/query/get/getBoardsSlice';
import { useGetUsersQuery } from '@/query/get/getUsers';
import { setBoard, setBoardMap } from '@/store/boardStore';
import { setAssigneeMap, setUsers } from '@/store/usersStore';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useTaskReferenceData = () => {
  const dispatch = useDispatch();
  const { data: boardsResponse, isLoading: boardsLoading } =
    useGetBoardsQuery();
  const { data: usersResponse, isLoading: usersLoading } = useGetUsersQuery();

  const boardsMap = Object.fromEntries(
    boardsResponse?.data.map(({ id, name }) => [id, name]) || [],
  );

  const assigneesMap = Object.fromEntries(
    usersResponse?.data.map(({ id, fullName }) => [id, fullName]) || [],
  );

  useEffect(() => {
    if (boardsResponse?.data) {
      dispatch(setBoard(boardsResponse.data));
      dispatch(setBoardMap(boardsMap));
    }
  }, [dispatch, boardsResponse, boardsMap]);

  useEffect(() => {
    if (usersResponse?.data) {
      dispatch(setUsers(usersResponse.data));
      dispatch(setAssigneeMap(assigneesMap));
    }
  }, [dispatch, usersResponse, assigneesMap]);
  const loading = boardsLoading || usersLoading;

  return { loading };
};
