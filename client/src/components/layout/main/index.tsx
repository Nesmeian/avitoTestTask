import { Header } from '@/components/layout/Header';
import { HStack, Stack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { mainStyles } from './styles';
import { DrawerProvider } from '@/context/drawerProvider';
import { useTaskReferenceData } from '@/hooks/useTaskReferenceData';
import { Loader } from '@/components/ui/loader';

export const Main = () => {
  const { loading } = useTaskReferenceData();
  if (loading) {
    return <Loader />;
  }
  return (
    <DrawerProvider>
      <Stack gap="0px">
        <Header />
        <HStack as="main" {...mainStyles}>
          <Outlet />
        </HStack>
      </Stack>
    </DrawerProvider>
  );
};
