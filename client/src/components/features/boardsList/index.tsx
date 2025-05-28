import { Loader } from '@/components/ui/loader';
import { useGetBoardsQuery } from '@/query/get';
import { Badge, Box, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const BoardsList = () => {
  const { data, isLoading } = useGetBoardsQuery();

  if (isLoading || !data) {
    return <Loader />;
  }
  return (
    <VStack as={Link} to="id">
      {data.data.map((board) => (
        <Box
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
        </Box>
      ))}
    </VStack>
  );
};
