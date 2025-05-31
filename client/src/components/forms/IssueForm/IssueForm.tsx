import {
  Button,
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
import { TaskData } from '@/types/queryTypes';
import { useUpdateTaskMutation } from '@/query/put';
import { useEffect } from 'react';

export const IssueForm = ({ task, onClose }: TaskData) => {
  const [
    createTaskIssue,
    { isLoading: createLoading, isSuccess: createSuccess },
  ] = useCreateTaskIssueMutation();
  const [updateTask, { isLoading: updateLoading, isSuccess: updateSuccess }] =
    useUpdateTaskMutation();
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
  const onSubmit = (data: IssueFormValues) => {
    if (!task) {
      createTaskIssue(data);
    } else {
      updateTask(data);
    }
  };
  const loading = createLoading || updateLoading;
  useEffect(() => {
    if (createSuccess || updateSuccess) {
      onClose();
    }
  }, [createSuccess, updateSuccess, onClose]);
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
        <Button type="submit">{task ? 'Обновить' : 'Создать'}</Button>
      </chakra.form>
      {loading && <Loader />}
    </VStack>
  );
};
