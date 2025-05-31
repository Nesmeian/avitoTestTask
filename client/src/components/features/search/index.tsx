import { FormControl, Input } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '@/store/configure-store';
import { ChangeEvent, useEffect, useState } from 'react';
import { setFilteredTasks } from '@/store/tasksStore';
import { searchStyle } from './style';
import { Task } from '@/types/queryTypes';
export const Search = () => {
  const dispatch = useDispatch();
  const allTasks = useSelector(
    (state: ApplicationState) => state.Tasks.allTasks,
  );
  const filterStatus = useSelector(
    (state: ApplicationState) => state.Tasks.filterStatus,
  );
  const filterBoard = useSelector(
    (state: ApplicationState) => state.Tasks.filterBoard,
  );
  const [searchQuery, setQuery] = useState('');

  useEffect(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    const filtered = allTasks.filter((task: Task) => {
      const matchesStatus = filterStatus ? task.status === filterStatus : true;
      const matchesBoard = filterBoard
        ? task.boardId === Number(filterBoard)
        : true;
      let matchesSearch = true;
      if (trimmed) {
        const inTitle = task.title?.toLowerCase().includes(trimmed);
        const inAssignee =
          task.assignee?.fullName?.toLowerCase().includes(trimmed) ?? false;
        matchesSearch = inTitle || inAssignee;
      }

      return matchesStatus && matchesBoard && matchesSearch;
    });
    dispatch(setFilteredTasks(filtered));
  }, [searchQuery, filterStatus, filterBoard, allTasks, dispatch]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  return (
    <FormControl>
      <Input
        {...searchStyle}
        placeholder="Поиск задачи"
        value={searchQuery}
        onChange={handleInput}
      />
    </FormControl>
  );
};
