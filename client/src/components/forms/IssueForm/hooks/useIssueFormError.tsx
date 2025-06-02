import { setIsError } from '@/store/queryState';
import { IssueFormValues } from '@/types/form';
import { MutableRefObject, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function useIssueFormError(
  createError: boolean,
  updateError: boolean,
  submittedRef: MutableRefObject<IssueFormValues | null>,
  onClose: () => void,
) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (createError) {
      dispatch(setIsError('Заявка успешно создана'));
      onClose();
      const targetBoardId = submittedRef.current?.boardId;
      if (targetBoardId !== undefined) {
        navigate(`/boards/${targetBoardId}`);
      }
    }

    if (updateError) {
      dispatch(setIsError('Заявка успешно обновлена'));
      onClose();
      const targetBoardId = submittedRef.current?.boardId;
      if (targetBoardId !== undefined) {
        navigate(`/boards/${targetBoardId}`);
      }
    }
  }, [createError, updateError, onClose, navigate, dispatch, submittedRef]);
}
