import { Stack } from '@chakra-ui/react';
import { Search } from '../features/search';
import { Filter } from '../features/filter';

export const ControlPanel = ({ isDrawer }: { isDrawer?: boolean }) => (
  <Stack
    flexDir={isDrawer ? 'column' : 'row'}
    justifyContent="space-between"
    w="100%"
  >
    <Search />
    <Filter />
  </Stack>
);
