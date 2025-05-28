import { Loader } from '@/components/ui/loader';
import { useGetBoardsByIdQuery } from '@/query/get';
import { getFilteredTaskList } from '@/utils/getFilteredTaskList';
import { Heading, HStack, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { TaskList } from './taskList';
import { useSelector } from 'react-redux';
import { ApplicationState } from '@/store/configure-store';

export const Board = () => {
  const { id } = useParams();
  const title = useSelector((state: ApplicationState) => state.Board.name);
  const { data, isLoading } = useGetBoardsByIdQuery(id!);
  if (isLoading) {
    return <Loader />;
  }
  if (!data?.data) {
    return <div>Error: No board data found</div>;
  }
  const { doneList, backlogList, inProgressList } = getFilteredTaskList(
    data.data,
  );
  console.log(data);
  return (
    <VStack>
      <Heading>{title}</Heading>
      <HStack>
        <TaskList tasks={doneList} />
        <TaskList tasks={backlogList} />
        <TaskList tasks={inProgressList} />
      </HStack>
    </VStack>
  );
};
