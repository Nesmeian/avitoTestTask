import { Loader } from '@/components/ui/loader';
import { useGetBoardsByIdQuery } from '@/query/get';
import { getFilteredTaskList } from '@/utils/getFilteredTaskList';
import { Grid, Heading, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ApplicationState } from '@/store/configure-store';
import { TaskGroup } from '@/components/features/taskGroup';

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
  return (
    <VStack gap={8}>
      <Heading>{title}</Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap="16px">
        <TaskGroup status="Todo" tasks={backlogList} />
        <TaskGroup status="In Progress" tasks={inProgressList} />
        <TaskGroup status="Completed" tasks={doneList} />
      </Grid>
    </VStack>
  );
};
