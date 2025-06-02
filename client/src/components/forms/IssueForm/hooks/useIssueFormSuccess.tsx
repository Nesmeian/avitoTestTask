import { setIsSuccess } from '@/store/queryState';
import { IssueFormValues } from '@/types/form';
import { MutableRefObject, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function useIssueFormSuccess(
  createSuccess: boolean,
  updateSuccess: boolean,
  submittedRef: MutableRefObject<IssueFormValues | null>,
  onClose: () => void,
) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (createSuccess) {
      dispatch(setIsSuccess('Заявка успешно создана'));
      onClose();
      const targetBoardId = submittedRef.current?.boardId;
      if (targetBoardId !== undefined) {
        navigate(`/boards/${targetBoardId}`);
      }
    }

    if (updateSuccess) {
      dispatch(setIsSuccess('Заявка успешно обновлена'));
      onClose();
      const targetBoardId = submittedRef.current?.boardId;
      if (targetBoardId !== undefined) {
        navigate(`/boards/${targetBoardId}`);
      }
    }
  }, [createSuccess, updateSuccess, onClose, navigate, dispatch, submittedRef]);
}
