import {
  Button,
  ButtonGroup,
  chakra,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IssueFormValues } from '@/types/form';
import { yupResolver } from '@hookform/resolvers/yup';
import { issueFormSchema } from './resolver';
import { ControlledMenuField } from './components/ControlledMenuField';
import { FORM_STORAGE_KEY, PRIORITIES_MAP, STATUSES_MAP } from './constants';
import { useCreateTaskIssueMutation } from '@/query/post';
import { Loader } from '@/components/ui/loader';
import { useSelector } from 'react-redux';
import { ApplicationState } from '@/store/configure-store';

import { useUpdateTaskMutation } from '@/query/put';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import GetCurrentPath from '@/utils/getCurrentpath';
import { useUnloadFormPersistence } from './hooks/useUnloadFormPersistense';
import { useIssueFormSuccess } from './hooks/useIssueFormSuccess';
import { Task } from '@/types/queryTypes';

export const IssueForm = ({
  task,
  onClose,
}: {
  task?: Task;
  onClose: () => void;
}) => {
  const currentPath = GetCurrentPath();
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

  const savedSession = (() => {
    try {
      const raw = sessionStorage.getItem(FORM_STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw) as IssueFormValues;
      }
    } catch {
      console.log('session storage is empty');
    }
    return null;
  })();

  const methods = useForm<IssueFormValues>({
    resolver: yupResolver(issueFormSchema),
    defaultValues: {
      boardId: currentBoardId === '' ? undefined : Number(currentBoardId),
      ...savedSession,
      ...task,
      assigneeId: task?.assignee.id ?? undefined,
      status: task?.status ?? undefined,
      priority: task?.priority ?? undefined,
    },
  });

  const {
    handleSubmit,
    register,
    control,
    getValues,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<IssueFormValues> = (data) => {
    submittedDataRef.current = data;
    if (!task) {
      const promise = createTaskIssue(data);
      createPromiseRef.current = promise;
    } else {
      const promise = updateTask(data);
      updatePromiseRef.current = promise;
    }
  };

  useIssueFormSuccess(
    createResult.isSuccess,
    updateResult.isSuccess,
    submittedDataRef,
    onClose,
  );

  useEffect(() => {
    return () => {
      if (
        createPromiseRef.current &&
        typeof createPromiseRef.current.abort === 'function'
      ) {
        createPromiseRef.current.abort();
      }
      if (
        updatePromiseRef.current &&
        typeof updatePromiseRef.current.abort === 'function'
      ) {
        updatePromiseRef.current.abort();
      }
    };
  }, []);

  useUnloadFormPersistence(getValues, FORM_STORAGE_KEY, true);

  const loading = createResult.isLoading || updateResult.isLoading;
  const isTasksPage = currentPath[0] === 'issues';
  return (
    <VStack alignItems="start" h="100%">
      <Heading as="h3" size="lg">
        {task ? 'Редактирование задания' : 'Создание задания'}
      </Heading>
      <chakra.form onSubmit={handleSubmit(onSubmit)} width="100%">
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.title}>
            <Input placeholder="Название" {...register('title')} />
            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.description}>
            <Textarea {...register('description')} placeholder="Описание" />
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>

          <ControlledMenuField
            name="boardId"
            label="Проект"
            list={boardsMap}
            control={control}
            error={errors.boardId}
            isDisabled={!!currentBoardId}
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

          <ButtonGroup width="100%" justifyContent="space-between">
            {isTasksPage && (
              <Button
                as={Link}
                to={task ? `/boards/${task.boardId}` : '/boards'}
              >
                Перейти на доску
              </Button>
            )}
            <Button type="submit">{task ? 'Обновить' : 'Создать'}</Button>
          </ButtonGroup>
        </VStack>
      </chakra.form>
      {loading && <Loader />}
    </VStack>
  );
};
