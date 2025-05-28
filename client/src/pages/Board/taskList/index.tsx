import { TaskListProps } from '@/types/queryTypes';
import { Text, VStack } from '@chakra-ui/react';

export const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <VStack>
      {tasks.map(({ id, title, description }) => (
        <VStack key={id}>
          <Text>{title}</Text>
          <Text>{description}</Text>
        </VStack>
      ))}
    </VStack>
  );
};
