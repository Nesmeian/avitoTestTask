import {
  Button,
  ButtonGroup,
  chakra,
  FormControl,
  Heading,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { IssueFormValues } from '@/types/form';
import { yupResolver } from '@hookform/resolvers/yup';
import { issueFormSchema } from './resolver';
import { ControlledMenuField } from './components/ControlledMenuField';
import { PRIORITIES_MAP, STATUSES_MAP } from './constants';
import { useCreateTaskIssueMutation } from '@/query/post';
import { Loader } from '@/components/ui/loader';
import { useSelector } from 'react-redux';
import { ApplicationState } from '@/store/configure-store';
import { IssuesFormStyles } from './styles';
import { TaskData, updateReg } from '@/types/queryTypes';
import { useUpdateTaskMutation } from '@/query/put';
import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GetCurrentPath from '@/utils/getCurrentpath';

export const IssueForm = ({ task, onClose }: TaskData) => {
  const currentPath = GetCurrentPath();
  const navigate = useNavigate();
  const [createTaskIssue, createResult] = useCreateTaskIssueMutation();
  const [updateTask, updateResult] = useUpdateTaskMutation();
  const submittedDataRef = useRef<IssueFormValues | null>(null);
  const createPromiseRef = useRef<ReturnType<typeof createTaskIssue> | null>(
    null,
  );
  const updatePromiseRef = useRef<ReturnType<typeof updateTask> | null>(null);

  const boardsMap = useSelector(
    (state: ApplicationState) => state.Board.boardMap,
  );
  const assigneesMap = useSelector(
    (state: ApplicationState) => state.users.assigneeMap,
  );
  const currentBoardId = useSelector(
    (state: ApplicationState) => state.Board.id,
  );

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<IssueFormValues>({
    resolver: yupResolver(issueFormSchema),
    defaultValues: {
      boardId: currentBoardId === '' ? undefined : Number(currentBoardId),
      ...task,
      assigneeId: task?.assignee.id,
    },
  });

  const onSubmit = (data: updateReg) => {
    submittedDataRef.current = data;
    if (!task) {
      const promise = createTaskIssue(data);
      createPromiseRef.current = promise;
    } else {
      const promise = updateTask(data);
      updatePromiseRef.current = promise;
    }
  };

  useEffect(() => {
    const wasSuccess = createResult.isSuccess || updateResult.isSuccess;
    if (wasSuccess) {
      onClose();
      const targetBoardId = submittedDataRef.current?.boardId ?? currentBoardId;
      navigate(`/boards/${targetBoardId}`);
    }
  }, [
    createResult.isSuccess,
    updateResult.isSuccess,
    onClose,
    navigate,
    currentBoardId,
  ]);
  useEffect(() => {
    return () => {
      if (
        createPromiseRef.current !== null &&
        typeof createPromiseRef.current.abort === 'function'
      ) {
        createPromiseRef.current.abort();
      }

      if (
        updatePromiseRef.current !== null &&
        typeof updatePromiseRef.current.abort === 'function'
      ) {
        updatePromiseRef.current.abort();
      }
    };
  }, []);

  const loading = createResult.isLoading || updateResult.isLoading;
  const isTasksPage = currentPath[0] === 'issues';
  return (
    <VStack alignItems="start" h="100%">
      <Heading as="h3" size="lg">
        {task ? 'Редактирование рецепта' : 'Создание рецепта'}
      </Heading>
      <chakra.form {...IssuesFormStyles} onSubmit={handleSubmit(onSubmit)}>
        <VStack>
          <FormControl isInvalid={!!errors.title}>
            <Input placeholder="Название" {...register('title')} />
          </FormControl>
          <FormControl isInvalid={!!errors.description}>
            <Textarea {...register('description')} placeholder="Описание" />
          </FormControl>
          <ControlledMenuField
            name="boardId"
            label={'Проект'}
            list={boardsMap}
            control={control}
            error={errors.boardId}
            isDisabled={currentBoardId ? true : false}
          />

          <ControlledMenuField
            name="assigneeId"
            label="Исполнитель"
            list={assigneesMap}
            control={control}
            error={errors.assigneeId}
          />

          <ControlledMenuField
            name="status"
            label="Статус"
            list={STATUSES_MAP}
            control={control}
            error={errors.status}
          />

          <ControlledMenuField
            name="priority"
            label="Приоритет"
            list={PRIORITIES_MAP}
            control={control}
            error={errors.priority}
          />
        </VStack>
        <ButtonGroup width="100%">
          {isTasksPage && (
            <Button as={Link} to={task ? `/boards/${task.boardId}` : '/boards'}>
              Перейти на доску
            </Button>
          )}
          <Button type="submit">{task ? 'Обновить' : 'Создать'}</Button>
        </ButtonGroup>
      </chakra.form>
      {loading && <Loader />}
    </VStack>
  );
};
