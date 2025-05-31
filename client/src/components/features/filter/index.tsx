import { ApplicationState } from '@/store/configure-store';
import { setFilteredTasks } from '@/store/tasksStore';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonGroup,
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

import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
export const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const STATUS_OPTIONS = {
    BackLog: 'BackLog',
    InProgress: 'InProgress',
    Done: 'Done',
  };
  const BoardsMap = useSelector(
    (state: ApplicationState) => state.Board.boardMap,
  );
  const allTasks = useSelector(
    (state: ApplicationState) => state.Tasks.allTasks,
  );

  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedBoard, setSelectedBoard] = useState<string>('');

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  const handleBoardChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBoard(e.target.value);
  };
  const handleFilter = () => {
    const filtered = allTasks.filter((task) => {
      const matchesStatus = selectedStatus
        ? task.status === selectedStatus
        : true;
      const matchesBoard = selectedBoard
        ? task.boardId == Number(selectedBoard)
        : true;
      return matchesStatus && matchesBoard;
    });
    dispatch(setFilteredTasks(filtered));
  };

  const handleClearFilter = () => {
    setSelectedStatus('');
    setSelectedBoard('');
    dispatch(setFilteredTasks(allTasks));
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
          <ButtonGroup w="100%" gap="8px">
            <Button onClick={handleFilter}>Фильтровать</Button>
            <Button onClick={handleClearFilter}>Сбросить Фильтры</Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
