import { Loader } from '@/components/ui/loader';
import { useGetBoardsByIdQuery } from '@/query/get/getBoardsSlice';
import { getFilteredTaskList } from '@/utils/getFilteredTaskList';
import { Grid, Heading, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ApplicationState } from '@/store/configure-store';
import { TaskGroup } from '@/components/features/taskGroup';
import { useUpdateTaskStatusMutation } from '@/query/put';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { StatusName } from '@/types/queryTypes';

export const Board = () => {
  const { id } = useParams();
  const title = useSelector((state: ApplicationState) => state.Board.name);
  const { data, isLoading } = useGetBoardsByIdQuery(id!);
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  if (isLoading) {
    return <Loader />;
  }
  if (!data?.data) {
    return <div>Error: No board data found</div>;
  }
  const { doneList, backlogList, inProgressList } = getFilteredTaskList(
    data.data,
  );
  const columns = {
    Backlog: backlogList,
    InProgress: inProgressList,
    Done: doneList,
  };
  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination || destination.droppableId === source.droppableId) {
      return;
    }
    await updateTaskStatus({
      id: Number(draggableId),
      status: destination.droppableId as 'BackLog' | 'InProgress' | 'Done',
    });
  };
  return (
    <VStack gap={8}>
      <Heading>{title}</Heading>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid
          templateColumns={{ lg: 'repeat(3, 1fr)', base: '1fr' }}
          gap="16px"
        >
          {Object.entries(columns).map(([status, tasks]) => (
            <TaskGroup
              key={status}
              status={status as StatusName}
              tasks={tasks}
            />
          ))}
        </Grid>
      </DragDropContext>
    </VStack>
  );
};
