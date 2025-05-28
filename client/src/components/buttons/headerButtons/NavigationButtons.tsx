import { Button, ButtonGroup } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const NavigationButtons = () => (
  <ButtonGroup>
    <Button as={Link} to="/issues">
      Все задачи
    </Button>
    <Button as={Link} to="/boards">
      Проекты
    </Button>
  </ButtonGroup>
);
