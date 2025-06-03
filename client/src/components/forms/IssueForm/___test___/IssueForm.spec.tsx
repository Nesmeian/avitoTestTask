import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { IssueForm } from '../IssueForm';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { FORM_STORAGE_KEY } from '../constants';
vi.mock('@/query/post', () => ({
  useCreateTaskIssueMutation: () => [
    () => {},
    { isSuccess: false, isError: false, isLoading: false },
  ],
}));
vi.mock('@/query/put', () => ({
  useUpdateTaskMutation: () => [
    () => {},
    { isSuccess: false, isError: false, isLoading: false },
  ],
}));

vi.mock('@/utils/getCurrentpath', () => ({
  default: () => ['issues'],
}));

vi.mock('./hooks/useUnloadFormPersistense', () => ({
  useUnloadFormPersistence: () => {},
}));
vi.mock('./hooks/useIssueFormSuccess', () => ({
  useIssueFormSuccess: () => {},
}));
vi.mock('./hooks/useIssueFormError', () => ({
  useIssueFormError: () => {},
}));

vi.mock('../components/ControlledMenuField', () => ({
  ControlledMenuField: () => <div data-testid="mock-select" />,
}));

vi.mock('react-redux', async () => {
  const actual = (await vi.importActual<any>('react-redux')) as any;
  return {
    ...actual,
    useSelector: vi.fn(() => {
      return {};
    }),
  };
});

const mockStore = configureStore([]);

describe('IssueForm Тесты', () => {
  it('рендерится с заголовком «Создание задания»', () => {
    const store = mockStore({
      Board: { boardMap: {}, id: '' },
      users: { assigneeMap: {} },
    });

    render(
      <Provider store={store}>
        <ChakraProvider>
          <MemoryRouter>
            <IssueForm onClose={() => {}} />
          </MemoryRouter>
        </ChakraProvider>
      </Provider>,
    );

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading.textContent).toBe('Создание задания');
  });

  it('содержит поля ввода Название и Описание', () => {
    const store = mockStore({
      Board: { boardMap: {}, id: '' },
      users: { assigneeMap: {} },
    });

    render(
      <Provider store={store}>
        <ChakraProvider>
          <MemoryRouter>
            <IssueForm onClose={() => {}} />
          </MemoryRouter>
        </ChakraProvider>
      </Provider>,
    );

    const titleInput = screen.getByPlaceholderText('Название');
    expect(titleInput).toBeDefined();

    const descriptionInput = screen.getByPlaceholderText('Описание');
    expect(descriptionInput).toBeDefined();
  });

  it('отображает кнопки «Перейти на доску» и «Создать»', () => {
    const store = mockStore({
      Board: { boardMap: {}, id: '' },
      users: { assigneeMap: {} },
    });

    render(
      <Provider store={store}>
        <ChakraProvider>
          <MemoryRouter>
            <IssueForm onClose={() => {}} />
          </MemoryRouter>
        </ChakraProvider>
      </Provider>,
    );

    const navigateButton = screen.getByText(/Перейти на доску/i);
    expect(navigateButton).toBeDefined();

    const submitButton = screen.getByRole('button', { name: 'Создать' });
    expect(submitButton).toBeDefined();
  });

  it('при клике в поля ввода меняет свои значения', () => {
    const store = mockStore({
      Board: { boardMap: {}, id: '' },
      users: { assigneeMap: {} },
    });

    render(
      <Provider store={store}>
        <ChakraProvider>
          <MemoryRouter>
            <IssueForm onClose={() => {}} />
          </MemoryRouter>
        </ChakraProvider>
      </Provider>,
    );

    const titleInput = screen.getByPlaceholderText(
      'Название',
    ) as HTMLInputElement;
    const descriptionInput = screen.getByPlaceholderText(
      'Описание',
    ) as HTMLTextAreaElement;

    expect(titleInput.value).toBe('');
    expect(descriptionInput.value).toBe('');

    fireEvent.change(titleInput, { target: { value: 'Тестовое название' } });
    expect(titleInput.value).toBe('Тестовое название');

    fireEvent.change(descriptionInput, {
      target: { value: 'Некоторое описание задачи' },
    });
    expect(descriptionInput.value).toBe('Некоторое описание задачи');
  });

  it('показывает сообщение об ошибке при попытке отправить пустую форму', async () => {
    const store = mockStore({
      Board: { boardMap: {}, id: '' },
      users: { assigneeMap: {} },
    });

    render(
      <Provider store={store}>
        <ChakraProvider>
          <MemoryRouter>
            <IssueForm onClose={() => {}} />
          </MemoryRouter>
        </ChakraProvider>
      </Provider>,
    );

    const submitButton = screen.getByRole('button', { name: 'Создать' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Название обязательно/i)).toBeDefined();
    });
  });
  it('принимает проп task и переключается в режим редактирования', () => {
    const store = mockStore({
      Board: { boardMap: {}, id: '' },
      users: { assigneeMap: {} },
    });

    // Проп task с минимально необходимыми полями
    const task = {
      id: 1,
      title: 'Задача A',
      description: 'Описание A',
      boardId: 42,
      assignee: { id: 7, name: 'UserA' },
      status: 'IN_PROGRESS',
      priority: 'HIGH',
    };

    render(
      <Provider store={store}>
        <ChakraProvider>
          <MemoryRouter>
            <IssueForm task={task as any} onClose={() => {}} />
          </MemoryRouter>
        </ChakraProvider>
      </Provider>,
    );

    // Проверяем, что заголовок изменился на "Редактирование задания"
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading.textContent).toBe('Редактирование задания');

    // Кнопка сабмита теперь "Обновить"
    const updateButton = screen.getByRole('button', { name: 'Обновить' });
    expect(updateButton).toBeDefined();

    const navigateLink = screen.getByRole('link', {
      name: /Перейти на доску/i,
    });
    expect(navigateLink).toBeDefined();

    expect(navigateLink.getAttribute('href')?.endsWith('/boards/42')).toBe(
      true,
    );
  });

  it('рендерит четыре селекта (ControlledMenuField)', () => {
    const store = mockStore({
      Board: { boardMap: {}, id: '' },
      users: { assigneeMap: {} },
    });

    render(
      <Provider store={store}>
        <ChakraProvider>
          <MemoryRouter>
            <IssueForm onClose={() => {}} />
          </MemoryRouter>
        </ChakraProvider>
      </Provider>,
    );

    const selects = screen.getAllByTestId('mock-select');
    expect(selects.length).toBe(4);
  });
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('подгружает значения из sessionStorage в поля Название и Описание', () => {
    // Сохраняем в sessionStorage набор значений
    sessionStorage.setItem(
      FORM_STORAGE_KEY,
      JSON.stringify({
        title: 'Из хранилища',
        description: 'Описание из хранилища',
        boardId: 5,
        assigneeId: 10,
        status: 'DONE',
        priority: 'LOW',
      }),
    );

    const store = mockStore({
      Board: { boardMap: {}, id: '' },
      users: { assigneeMap: {} },
    });

    render(
      <Provider store={store}>
        <ChakraProvider>
          <MemoryRouter>
            <IssueForm onClose={() => {}} />
          </MemoryRouter>
        </ChakraProvider>
      </Provider>,
    );

    const titleInput = screen.getByPlaceholderText(
      'Название',
    ) as HTMLInputElement;
    expect(titleInput.value).toBe('Из хранилища');

    const descriptionInput = screen.getByPlaceholderText(
      'Описание',
    ) as HTMLTextAreaElement;
    expect(descriptionInput.value).toBe('Описание из хранилища');
  });
});
