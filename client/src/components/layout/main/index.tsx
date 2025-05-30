import { Header } from '@/components/layout/Header';
import { HStack, Stack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { mainStyles } from './styles';
import { DrawerProvider } from '@/context/drawerProvider';

export const Main = () => (
  <DrawerProvider>
    <Stack gap="0px">
      <Header />
      <HStack as="main" {...mainStyles}>
        <Outlet />
      </HStack>
    </Stack>
  </DrawerProvider>
);
