import { Loader } from '@/components/ui/loader';
import { useGetBoardsQuery } from '@/query/get';
import { Button, Grid, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { boardItemStyles } from './style';

export const BoardsList = () => {
  const { data, isLoading } = useGetBoardsQuery();

  if (isLoading || !data) {
    return <Loader />;
  }
  return data.data.map((board) => (
    <Grid {...boardItemStyles} key={board.id}>
      <Heading as="h3" size="xl">
        {board.name}
      </Heading>
      <Text fontSize="xl">{board.description}</Text>
      <Button as={Link} to={String(board.id)}>
        Перейти к доске
      </Button>
    </Grid>
  ));
};
