import { Button, Grid, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { boardItemStyles } from './style';
import { useSelector } from 'react-redux';
import { ApplicationState } from '@/store/configure-store';

export const BoardsList = () => {
  const boards = useSelector((state: ApplicationState) => state.Board.boards);
  return boards.map((board) => (
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
