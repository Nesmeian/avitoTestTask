import { Header } from '@/components/layout/Header';
import { HStack, Stack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { mainStyles } from './styles';
import { ModalProvider } from '@/context/modalProvider';
import { useTaskReferenceData } from '@/hooks/useTaskReferenceData';
import { Loader } from '@/components/ui/loader';
import { useSelector } from 'react-redux';
import { ApplicationState } from '@/store/configure-store';
import { Alert } from '@/components/ui/alert';
import { DrawerProvider } from '@/context/drawerProvider';

export const Main = () => {
  const { loading } = useTaskReferenceData();
  const isError = useSelector(
    (state: ApplicationState) => state.queryState.isError,
  );
  const isSuccess = useSelector(
    (state: ApplicationState) => state.queryState.isSuccess,
  );
  if (loading) {
    return <Loader />;
  }

  return (
    <ModalProvider>
      <DrawerProvider>
        <Stack gap="0px">
          <Header />
          <HStack as="main" {...mainStyles}>
            <Outlet />
          </HStack>
        </Stack>
        {isSuccess.state && <Alert isSuccess message={isSuccess.message} />}
        {isError.state && <Alert isSuccess={false} message={isError.message} />}
      </DrawerProvider>
    </ModalProvider>
  );
};
