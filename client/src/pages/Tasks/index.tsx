import { Loader } from '@/components/ui/loader';
import { useGetTasksQuery } from '@/query/get/getBoardsSlice';
import { HStack, VStack } from '@chakra-ui/react';
import { TaskList } from '../../components/features/taskListIssues/taskList';
import { Search } from '@/components/features/search';
import { Filter } from '@/components/features/filter';
import { CreateIssue } from '@/components/buttons/createIssue';

export const Tasks = () => {
  const { data, isLoading, isError } = useGetTasksQuery();
  if (isLoading) return <Loader />;
  if (isError || !data?.data) return <div>Error loading tasks</div>;
  return (
    <VStack width="100%" gap="30px">
      <HStack justifyContent="space-between" w="100%">
        <Search />
        <Filter />
      </HStack>
      <TaskList tasks={data.data} />
      <CreateIssue />
    </VStack>
  );
};
