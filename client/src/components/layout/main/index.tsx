import { Header } from '@/components/layout/Header';
import { HStack, Stack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { mainStyles } from './styles';

export const Main = () => (
  <Stack gap="0px">
    <Header />
    <HStack as="main" {...mainStyles}>
      <Outlet />
    </HStack>
  </Stack>
);
