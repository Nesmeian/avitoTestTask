import { Filter } from '@/components/filter';
import { Search } from '@/components/search';
import { HStack, VStack } from '@chakra-ui/react';

export const Boards = () => {
  return (
    <VStack w="100%">
      <HStack justifyContent="space-between" w="100%">
        <Search />
        <Filter />
      </HStack>
    </VStack>
  );
};
