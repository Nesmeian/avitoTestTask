import { HStack, Stack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

export const MainPage = () => (
  <Stack gap="0px">
    <HStack
      className="app"
      alignItems="flex-start"
      gap="12px"
      justify="space-between"
    >
      <Outlet />
    </HStack>
  </Stack>
);
