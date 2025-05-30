import {
  useGetBoardsQuery,
  useGetTasksQuery,
} from '@/query/get/getBoardsSlice';
import { useGetUsersQuery } from '@/query/get/getUsers';
import { setBoard, setBoardMap } from '@/store/boardStore';
import { setTasks } from '@/store/tasksStore';
import { setAssigneeMap, setUsers } from '@/store/usersStore';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useTaskReferenceData = () => {
  const { data: boardsResponse, isLoading: boardsLoading } =
    useGetBoardsQuery();
  const { data: usersResponse, isLoading: usersLoading } = useGetUsersQuery();
  const { data: tasksResponse, isLoading: taskLoading } = useGetTasksQuery();

  const boardsMap = Object.fromEntries(
    boardsResponse?.data.map(({ id, name }) => [id, name]) || [],
  );

  const assigneesMap = Object.fromEntries(
    usersResponse?.data.map(({ id, fullName }) => [id, fullName]) || [],
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (boardsResponse?.data) {
      dispatch(setBoard(boardsResponse.data));
      dispatch(setBoardMap(boardsMap));
    }
  }, [dispatch, boardsResponse, boardsMap]);

  useEffect(() => {
    if (tasksResponse?.data) {
      dispatch(setTasks(tasksResponse?.data));
    }
  }, [dispatch, tasksResponse]);

  useEffect(() => {
    if (usersResponse?.data) {
      dispatch(setUsers(usersResponse.data));
      dispatch(setAssigneeMap(assigneesMap));
    }
  }, [dispatch, usersResponse, assigneesMap]);
  const loading = boardsLoading || usersLoading || taskLoading;

  return { loading };
};
