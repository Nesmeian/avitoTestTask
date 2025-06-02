import * as yup from 'yup';

export const issueFormSchema = yup.object().shape({
  title: yup
    .string()
    .required('Название обязательно')
    .max(500, 'Максимальная длина 500 символов'),
  description: yup
    .string()
    .required('Описание обязательно')
    .max(500)
    .max(500, 'Максимальная длина 500 символов'),
  boardId: yup.number().required('Проект обязателен'),
  assigneeId: yup.number().required('Исполнитель обязателен'),
  priority: yup.string().required(),
  status: yup.string().required(),
});
