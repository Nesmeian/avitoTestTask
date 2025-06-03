import { Button, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const NavigationButtons = ({ onClose }: { onClose?: () => void }) => {
  const closeHandler = () => {
    if (onClose) {
      onClose();
    }
  };
  return (
    <Stack
      flexDirection={{ md: 'row', base: 'column' }}
      w={{ base: '100%', md: 'auto' }}
    >
      <Button
        as={Link}
        to="/issues"
        w={{ base: '100%', md: 'auto' }}
        onClick={closeHandler}
      >
        Все задачи
      </Button>
      <Button
        as={Link}
        to="/boards"
        w={{ base: '100%', md: 'auto' }}
        onClick={closeHandler}
      >
        Проекты
      </Button>
    </Stack>
  );
};
