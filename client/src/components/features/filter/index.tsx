import { ApplicationState } from '@/store/configure-store';
import { setFilterBoard, setFilterStatus } from '@/store/tasksStore';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';

import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
export const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const STATUS_OPTIONS = {
    Backlog: 'BackLog',
    InProgress: 'InProgress',
    Done: 'Done',
  };
  const BoardsMap = useSelector(
    (state: ApplicationState) => state.Board.boardMap,
  );
  const allTasks = useSelector(
    (state: ApplicationState) => state.Tasks.allTasks,
  );

  const selectedStatus = useSelector(
    (state: ApplicationState) => state.Tasks.filterStatus,
  );
  const selectedBoard = useSelector(
    (state: ApplicationState) => state.Tasks.filterBoard,
  );

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilterStatus(e.target.value));
  };

  const handleBoardChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilterBoard(e.target.value));
  };
  console.log(allTasks);
  const handleClearFilter = () => {
    dispatch(setFilterStatus(''));
    dispatch(setFilterBoard(''));
  };
  return (
    <Popover placement="bottom-start" closeOnBlur={true}>
      <PopoverTrigger>
        <Button
          w={{ base: '380px' }}
          justifyContent="space-between"
          rightIcon={<ChevronDownIcon />}
        >
          Выберите фильтры
        </Button>
      </PopoverTrigger>

      <PopoverContent zIndex={30}>
        <PopoverArrow />
        <PopoverBody p="20px">
          <VStack spacing={4}>
            <VStack width="100%" alignItems="flex-start">
              <Text fontSize="sm" mb={1}>
                Выберите статус
              </Text>
              <Select
                placeholder="Все статусы"
                value={selectedStatus}
                onChange={handleStatusChange}
              >
                {Object.entries(STATUS_OPTIONS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
            </VStack>

            <VStack width="100%" alignItems="flex-start">
              <Text fontSize="sm" mb={1}>
                Выберите доску
              </Text>
              <Select
                placeholder="Все доски"
                value={selectedBoard}
                onChange={handleBoardChange}
              >
                {Object.entries(BoardsMap).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
            </VStack>
          </VStack>
        </PopoverBody>
        <PopoverFooter>
          <Button onClick={handleClearFilter}>Сбросить Фильтры</Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
