import { useGetBoardsQuery } from '@/query/get';
import { Loader } from '../loader';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { setBoardName } from '@/store/boardStore';
import GetCurrentPath from '@/utils/getCurrentpath';
import { useEffect } from 'react';
import { BoardType } from '@/types/quertTypes';
import { buildCrumbs } from './buildCrumbs';
import { Crumb } from '@/types/uiTypes';

export const BreadCrumbs = () => {
  const currentPath = GetCurrentPath();
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetBoardsQuery();

  const idSegment = currentPath.find((seg) => /^\d+$/.test(seg));
  const boardId = idSegment ? Number(idSegment) : undefined;
  const board = data?.data.find((b: BoardType) => b.id === boardId);

  useEffect(() => {
    if (board) {
      dispatch(setBoardName(board.name));
    }
  }, [dispatch, board]);

  if (isLoading) return <Loader />;
  if (isError || !data?.data) return <div>Ошибка при загрузке проектов</div>;

  const crumbsList: Crumb[] = buildCrumbs(currentPath, board);

  return (
    <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
      {crumbsList.map((crumb, idx) => (
        <BreadcrumbItem
          key={crumb.to}
          isCurrentPage={idx === crumbsList.length - 1}
        >
          <BreadcrumbLink as={Link} to={crumb.to}>
            {crumb.label}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};
