import { TaskListProps } from '@/types/quertTypes';
import { Text, VStack } from '@chakra-ui/react';

export const TaskList = ({ data }: TaskListProps) => {
  return (
    <VStack>
      {data.map(({ id, title, description }) => (
        <VStack key={id}>
          <Text>{title}</Text>
          <Text>{description}</Text>
        </VStack>
      ))}
    </VStack>
  );
};
