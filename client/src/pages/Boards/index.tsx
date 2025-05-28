import { BoardsList } from '@/components/features/boardsList';
import { Filter } from '@/components/features/filter';
import { Search } from '@/components/features/search';
import { HStack, VStack } from '@chakra-ui/react';

export const Boards = () => {
  return (
    <VStack w="100%">
      <HStack justifyContent="space-between" w="100%">
        <Search />
        <Filter />
      </HStack>
      <BoardsList />
    </VStack>
  );
};
