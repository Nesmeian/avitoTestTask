import { Loader } from '@/components/ui/loader';
import { useGetBoardsByIdQuery } from '@/query/get/getBoardsSlice';
import { getFilteredTaskList } from '@/utils/getFilteredTaskList';
import { Grid, GridItem, Heading, VStack } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ApplicationState } from '@/store/configure-store';
import { TaskGroup } from '@/components/features/taskGroup';
import { useUpdateTaskStatusMutation } from '@/query/put';
import { DragDropContext, DragStart, DropResult } from '@hello-pangea/dnd';
import { useEffect, useRef, useState } from 'react';
import { ColumnsState } from '@/types/storeTypes';
import { useTaskDragAndDrop } from '@/utils/dragAndDrop';

export const Board = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const title = useSelector((state: ApplicationState) => state.Board.name);
  const { data, isLoading } = useGetBoardsByIdQuery(id!);
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const [columns, setColumns] = useState<ColumnsState>({
    Backlog: [],
    InProgress: [],
    Done: [],
  });

  const initializedRef = useRef(false);

  const [dragSource, setDragSource] = useState<string | null>(null);

  const handleDragEnd = useTaskDragAndDrop({
    columns,
    setColumns,
    updateTaskStatus,
  });

  useEffect(() => {
    if (!isLoading && data?.data && !initializedRef.current) {
      const { backlogList, inProgressList, doneList } = getFilteredTaskList(
        data.data,
      );
      setColumns({
        Backlog: backlogList,
        InProgress: inProgressList,
        Done: doneList,
      });
      initializedRef.current = true;
    }
  }, [data, isLoading]);

  if (isLoading) {
    return <Loader />;
  }
  if (!data?.data) {
    navigate('/not-found', { replace: true });
  }
  const onDragStart = (start: DragStart) => {
    setDragSource(start.source.droppableId);
  };

  const onDragComplete = (result: DropResult) => {
    handleDragEnd(result);
    setDragSource(null);
  };
  return (
    <VStack gap={8} w="100%">
      <Heading>{title}</Heading>
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragComplete}>
        <Grid
          templateColumns={{ md: 'repeat(3, 1fr)', base: '1fr' }}
          gap="16px"
          w="100%"
        >
          <GridItem minW={0} w="100%">
            <TaskGroup
              status="Backlog"
              tasks={columns.Backlog}
              isDropDisabled={dragSource === 'Backlog'}
              highlight={!!dragSource && dragSource !== 'Backlog'}
            />
          </GridItem>

          <GridItem minW={0} w="100%">
            <TaskGroup
              status="InProgress"
              tasks={columns.InProgress}
              isDropDisabled={dragSource === 'InProgress'}
              highlight={!!dragSource && dragSource !== 'InProgress'}
            />
          </GridItem>

          <GridItem minW={0} w="100%">
            <TaskGroup
              status="Done"
              tasks={columns.Done}
              isDropDisabled={dragSource === 'Done'}
              highlight={!!dragSource && dragSource !== 'Done'}
            />
          </GridItem>
        </Grid>
      </DragDropContext>
    </VStack>
  );
};
