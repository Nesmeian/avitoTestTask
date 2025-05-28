import { TaskListProps } from '@/types/quertTypes';
import { HStack, Text, VStack } from '@chakra-ui/react';

export const TaskList = ({ data }: TaskListProps) => {
  return (
    <VStack>
      {data.map((e) => (
        <HStack>
          <Text>{e.title}</Text>
        </HStack>
      ))}
    </VStack>
  );
};
