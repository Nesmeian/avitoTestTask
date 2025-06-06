import { Task, TaskListProps } from '@/types/queryTypes';
import { Grid, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { taskItemStyles, taskListWrapperStyles } from './style';
import { truncateText } from '@/utils/truncateText';
import { AssigneeInfo } from '../assigneeInfo';
import { Badge } from '@/components/ui/badge';
import { useModal } from '@/context/modalProvider/useModal';
import { IssueForm } from '@/components/forms/IssueForm/IssueForm';

export const TaskList = ({ tasks }: TaskListProps) => {
  const { open, close } = useModal();
  const handleClick = (e: Task) => {
    open(<IssueForm task={e} onClose={close} />);
  };
  return (
    <Grid {...taskListWrapperStyles}>
      {tasks.map((e) => (
        <VStack {...taskItemStyles} key={e.id} onClick={() => handleClick(e)}>
          <HStack w="100%" justifyContent="space-between">
            <AssigneeInfo assignee={e.assignee} />
            <HStack>
              <Badge status={e.priority} />
              <Badge status={e.status} />
            </HStack>
          </HStack>
          <VStack w="100%" alignItems="flex-start">
            <Heading
              w="100%"
              as="h3"
              size={{ lg: 'sm', base: 'sm' }}
              textAlign="start"
            >
              {truncateText(e.title)}
            </Heading>
            <Text noOfLines={3} w="100%">
              {e.description}
            </Text>
          </VStack>
        </VStack>
      ))}
    </Grid>
  );
};
