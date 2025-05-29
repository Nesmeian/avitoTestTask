import { AssigneeProps } from '@/types/queryTypes';
import { Avatar, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { assigneeEmailStyle } from './style';

export const AssigneeInfo = ({ assignee }: AssigneeProps) => {
  return (
    <HStack gap="10px">
      <Avatar name={assignee.fullName} src={assignee.avatarUrl} />
      <VStack alignItems="start" gap="4px">
        <Heading as="h4" size="xl" fontSize="12px">
          {assignee.fullName}
        </Heading>
        <Text {...assigneeEmailStyle}>{assignee.email}</Text>
      </VStack>
    </HStack>
  );
};
