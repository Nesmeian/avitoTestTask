import { Task, TaskListProps } from '@/types/queryTypes';
import { Avatar, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { Badge } from '@/components/ui/badge';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { useModal } from '@/context/modalProvider/useModal';
import { IssueForm } from '@/components/forms/IssueForm/IssueForm';
import { taskGroupItemStyles, taskGroupWrapperStyles } from './style';

export const TaskGroup = ({
  tasks,
  status,
  isDropDisabled,
  highlight,
}: TaskListProps) => {
  const { open, close } = useModal();
  const handleOpenModal = (task: Task) => {
    open(<IssueForm task={task} onClose={close} />);
  };

  return (
    <Droppable droppableId={status} isDropDisabled={isDropDisabled}>
      {(provided, snapshot) => (
        <VStack
          ref={provided.innerRef}
          {...provided.droppableProps}
          {...taskGroupWrapperStyles}
          borderColor={highlight ? 'green' : 'gray'}
          bg={snapshot.isDraggingOver && !isDropDisabled ? 'gray.50' : 'white'}
        >
          <Heading as="h3" size="lg" alignSelf="start">
            {status}
          </Heading>

          {tasks.length === 0 && (
            <Heading m="auto" size="3xl" color="gray.400">
              Нет задач
            </Heading>
          )}

          {tasks.map((e, index) => (
            <Draggable key={e.id} draggableId={String(e.id)} index={index}>
              {(draggableProvided, draggableSnapshot) => (
                <VStack
                  onClick={() => handleOpenModal(e)}
                  ref={draggableProvided.innerRef}
                  {...draggableProvided.draggableProps}
                  {...draggableProvided.dragHandleProps}
                  {...taskGroupItemStyles}
                  borderColor={draggableSnapshot.isDragging ? 'blue' : 'gray'}
                  boxShadow={draggableSnapshot.isDragging ? 'md' : 'none'}
                >
                  <HStack w="100%" justifyContent="space-between">
                    <Badge status={e.priority} />
                    <Avatar
                      name={e.assignee.fullName}
                      src={e.assignee.avatarUrl}
                    />
                  </HStack>
                  <Heading noOfLines={1} as="h4" size="md" w="80%">
                    {e.title}
                  </Heading>
                  <Text noOfLines={3}>{e.description}</Text>
                </VStack>
              )}
            </Draggable>
          ))}

          {provided.placeholder}
        </VStack>
      )}
    </Droppable>
  );
};
