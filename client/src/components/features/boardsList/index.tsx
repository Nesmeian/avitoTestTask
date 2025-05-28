import { Loader } from '@/components/ui/loader';
import { useGetBoardsQuery } from '@/query/get';
import { Badge, HStack, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const BoardsList = () => {
  const { data, isLoading } = useGetBoardsQuery();

  if (isLoading || !data) {
    return <Loader />;
  }
  return (
    <VStack>
      {data.data.map((board) => (
        <HStack
          as={Link}
          to={String(board.id)}
          key={board.id}
          p={4}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
        >
          <Text fontWeight="bold">{board.name}</Text>
          <Text fontSize="sm">{board.description}</Text>
          <Badge mt={2} colorScheme="green">
            {board.taskCount} задач
          </Badge>
        </HStack>
      ))}
    </VStack>
  );
};
