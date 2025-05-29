import { TaskListProps } from '@/types/queryTypes';
import { Grid, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { taskItemStyles, taskListWrapperStyles } from './style';
import { truncateText } from '@/utils/truncateText';
import { AssigneeInfo } from '../assigneeInfo';
import { Badge } from '@/components/ui/badge';

export const TaskList = ({ tasks }: TaskListProps) => (
  <Grid {...taskListWrapperStyles}>
    {tasks.map(({ title, id, priority, assignee, description, status }) => (
      <VStack {...taskItemStyles} key={id} gap={4}>
        <HStack w="100%" justifyContent="space-between">
          <AssigneeInfo assignee={assignee} />
          <HStack>
            <Badge status={priority} />
            <Badge status={status} />
          </HStack>
        </HStack>
        <VStack w="100%" alignItems="flex-start">
          <Heading as="h3" size={{ lg: 'sm', base: 'sm' }} textAlign="start">
            {truncateText(title)}
          </Heading>
          <Text>{description}</Text>
        </VStack>
      </VStack>
    ))}
  </Grid>
);
