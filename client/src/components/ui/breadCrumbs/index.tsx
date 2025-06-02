import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setBoardId, setBoardName } from '@/store/boardStore';
import { useEffect } from 'react';

import { buildCrumbs } from './buildCrumbs';
import { Crumb } from '@/types/uiTypes';
import { Board } from '@/types/queryTypes';
import { ApplicationState } from '@/store/configure-store';
import GetCurrentPath from '@/utils/getCurrentpath';

export const BreadCrumbs = () => {
  const currentPath = GetCurrentPath();
  const dispatch = useDispatch();
  const board = useSelector((state: ApplicationState) => state.Board.boards);
  const idSegment = currentPath.find((seg) => /^\d+$/.test(seg));
  const boardId = idSegment ? Number(idSegment) : undefined;
  const currentBoard = board.find((b: Board) => b.id === boardId);

  useEffect(() => {
    if (currentBoard) {
      dispatch(setBoardName(currentBoard.name));
      dispatch(setBoardId(currentBoard.id));
    } else {
      dispatch(setBoardName(''));
      dispatch(setBoardId(''));
    }
  }, [dispatch, currentBoard, currentPath]);

  const crumbsList: Crumb[] = buildCrumbs(currentPath, currentBoard);
  const singleMode = crumbsList.length === 1;
  return (
    <Breadcrumb
      spacing="8px"
      separator={<ChevronRightIcon color="gray.500" />}
      fontSize="16px"
    >
      {crumbsList.map((crumb, idx) => (
        <BreadcrumbItem
          key={crumb.to}
          isCurrentPage={idx === crumbsList.length - 1}
        >
          <BreadcrumbLink
            as={singleMode ? Text : Link}
            {...(!singleMode ? { to: crumb.to } : {})}
            cursor={singleMode ? 'default' : 'pointer'}
            color={singleMode ? 'gray.600' : undefined}
          >
            {crumb.label}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};
