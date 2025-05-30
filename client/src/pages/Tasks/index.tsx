import { HStack, VStack } from '@chakra-ui/react';
import { TaskList } from '../../components/features/taskListIssues/taskList';
import { Search } from '@/components/features/search';
import { Filter } from '@/components/features/filter';
import { CreateIssue } from '@/components/buttons/createIssue';
import { useSelector } from 'react-redux';
import { ApplicationState } from '@/store/configure-store';

export const Tasks = () => {
  const tasks = useSelector((state: ApplicationState) => state.Tasks.tasks);

  return (
    <VStack width="100%" gap="30px">
      <HStack justifyContent="space-between" w="100%">
        <Search />
        <Filter />
      </HStack>
      <TaskList tasks={tasks} />
      <CreateIssue />
    </VStack>
  );
};
