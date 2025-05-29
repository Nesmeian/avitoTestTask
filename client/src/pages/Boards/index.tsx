import { BoardsList } from '@/components/features/boardsList';
import { VStack } from '@chakra-ui/react';
export const Boards = () => {
  return (
    <VStack w="100%">
      <BoardsList />
    </VStack>
  );
};
