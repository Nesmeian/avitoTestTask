import { FormControl, Input } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '@/store/configure-store';
import { ChangeEvent, useEffect, useState } from 'react';
import { setFilteredTasks } from '@/store/tasksStore';
import { searchStyle } from './style';
export const Search = () => {
  const dispatch = useDispatch();
  const allTasks = useSelector(
    (state: ApplicationState) => state.Tasks.allTasks,
  );
  const [query, setQuery] = useState('');

  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    const filtered = allTasks.filter((t) => {
      const title = t.title?.toLowerCase() ?? '';
      const assignee = t.assignee.fullName?.toLowerCase() ?? '';
      return title.includes(trimmed) || assignee.includes(trimmed);
    });
    dispatch(setFilteredTasks(filtered));
  }, [query, allTasks, dispatch]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  console.log(allTasks);
  return (
    <FormControl>
      <Input
        {...searchStyle}
        placeholder="Поиск задачи"
        value={query}
        onChange={handleInput}
      />
    </FormControl>
  );
};
