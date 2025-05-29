import { TaskListProps } from '@/types/queryTypes';
import { Avatar, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { taskGroupItemStyles } from './style';
import { Badge } from '@/components/ui/badge';

export const TaskGroup = ({ status, tasks }: TaskListProps) => {
  return (
    <VStack gap="16px" p="16px" border=" 1px solid #e5e5e5">
      <Heading as="h3" size="lg" alignSelf="start">
        {status}
      </Heading>
      {tasks.length === 0 && (
        <Heading m="auto" size="3xl">
          Нет задач
        </Heading>
      )}
      {tasks &&
        tasks.map(({ id, title, description, priority, assignee }) => (
          <VStack {...taskGroupItemStyles} key={id}>
            <HStack w="100%" justifyContent="space-between">
              <Badge status={priority} />
              <Avatar name={assignee.fullName} src={assignee.avatarUrl} />
            </HStack>
            <Heading noOfLines={1} as="h4" size="md">
              {title}
            </Heading>
            <Text noOfLines={3}>{description}</Text>
          </VStack>
        ))}
    </VStack>
  );
};
