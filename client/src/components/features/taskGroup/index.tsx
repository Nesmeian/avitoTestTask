import { Task, TaskListProps } from '@/types/queryTypes';
import { Avatar, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { taskGroupItemStyles } from './style';
import { Badge } from '@/components/ui/badge';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { useModal } from '@/context/modalProvider/useModal';
import { IssueForm } from '@/components/forms/IssueForm/IssueForm';

export const TaskGroup = ({ tasks, status }: TaskListProps) => {
  const { open, close } = useModal();
  const handleOpenModal = (task: Task) => {
    open(<IssueForm task={task} onClose={close} />);
  };
  console.log(tasks);
  return (
    <Droppable droppableId={status as string}>
      {(provided) => (
        <VStack
          ref={provided.innerRef}
          {...provided.droppableProps}
          gap="16px"
          p="16px"
          border="1px solid #e5e5e5"
          minHeight="200px"
        >
          <Heading as="h3" size="lg" alignSelf="start">
            {status}
          </Heading>

          {tasks.length === 0 && (
            <Heading m="auto" size="3xl">
              Нет задач
            </Heading>
          )}

          {tasks.map((e, index) => (
            <Draggable draggableId={String(e.id)} index={index} key={e.id}>
              {(provided) => (
                <VStack
                  onClick={() => handleOpenModal(e)}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  {...taskGroupItemStyles}
                >
                  <HStack w="100%" justifyContent="space-between">
                    <Badge status={e.priority} />
                    <Avatar
                      name={e.assignee.fullName}
                      src={e.assignee.avatarUrl}
                    />
                  </HStack>
                  <Heading noOfLines={1} as="h4" size="md">
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
