import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import { Provider } from 'react-redux';

import { Search } from '../index';
import { setFilteredTasks } from '../../../../store/tasksStore';
import '@testing-library/jest-dom';

type RootState = ReturnType<typeof store.getState>;
const mockStore = configureMockStore();

const tasks = [
  {
    id: 1,
    title: 'Первая задача',
    status: 'todo',
    boardId: 1,
    assignee: { fullName: 'Иван Иванов' },
  },
  {
    id: 2,
    title: 'Другое',
    status: 'in-progress',
    boardId: 2,
    assignee: { fullName: 'Сергей Петров' },
  },
  {
    id: 3,
    title: 'Ещё одна задача',
    status: 'todo',
    boardId: 1,
    assignee: { fullName: 'Анна Смирнова' },
  },
];

describe('Компонент Search', () => {
  let store: MockStoreEnhanced<RootState>;

  // Хелпер для рендера компонента с заданным начальнм состоянием
  function renderWithStore(initialState: any) {
    store = mockStore(initialState);
    // Перехватываем dispatch для проверки вызовов
    store.dispatch = vi.fn();
    return render(
      <Provider store={store}>
        <Search />
      </Provider>,
    );
  }

  it('корректно рендерится и отображает placeholder "Поиск задачи"', () => {
    const initialState = {
      Tasks: {
        allTasks: tasks,
        filteredTasks: [],
        filterStatus: '',
        filterBoard: '1',
      },
    };
    renderWithStore(initialState);

    // Проверяем, что в компоненте есть input с указанным placeholder
    expect(screen.getByPlaceholderText('Поиск задачи')).toBeInTheDocument();
  });

  it('фильтрует задачи по совпадению в поле title', () => {
    const initialState = {
      Tasks: {
        allTasks: tasks,
        filteredTasks: [],
        filterStatus: '',
        filterBoard: '1',
      },
    };
    renderWithStore(initialState);

    // Находим поле ввода по placeholder и вводим подстроку из title
    const input = screen.getByPlaceholderText(
      'Поиск задачи',
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Первая' } }); // вводим 'Первая' (совпадает с title первой задачи)

    // Ожидаем, что вызван dispatch с action setFilteredTasks с массивом отфильтрованных задач
    expect(store.dispatch).toHaveBeenCalledWith(
      setFilteredTasks([tasks[0]]), // только первая задача содержит 'Первая' в title
    );
  });

  it('фильтрует задачи по полю assignee.fullName', () => {
    const initialState = {
      Tasks: {
        allTasks: tasks,
        filteredTasks: [],
        filterStatus: '',
        filterBoard: '',
      },
    };
    renderWithStore(initialState);

    const input = screen.getByPlaceholderText(
      'Поиск задачи',
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Анна' } }); // вводим 'Анна' (совпадает с fullName третьей задачи)

    expect(store.dispatch).toHaveBeenCalledWith(
      setFilteredTasks([tasks[2]]), // ожидаем только третью задачу
    );
  });

  it('возвращает все задачи при пустом поле поиска', () => {
    const initialState = {
      Tasks: {
        allTasks: tasks,
        filteredTasks: [],
        filterStatus: '',
        filterBoard: '',
      },
    };
    renderWithStore(initialState);

    const input = screen.getByPlaceholderText(
      'Поиск задачи',
    ) as HTMLInputElement;
    // Вводим непустое значение, затем очищаем
    fireEvent.change(input, { target: { value: 'Задача' } });
    expect(store.dispatch).toHaveBeenCalled(); // проверяем, что был какой-то вызов

    // Очищаем поле поиска
    fireEvent.change(input, { target: { value: '' } });
    // Должен вызвать setFilteredTasks со всеми задачами из allTasks
    expect(store.dispatch).toHaveBeenCalledWith(setFilteredTasks(tasks));
  });

  it('учитывает filterStatus и filterBoard при фильтрации', () => {
    const store = mockStore({
      Tasks: {
        allTasks: tasks,
        tasks: [],
        filterStatus: 'todo',
        filterBoard: '1', // строка, как ожидается в компоненте
      },
    });

    store.dispatch = vi.fn(); // шпион на dispatch

    render(
      <Provider store={store}>
        <Search />
      </Provider>,
    );

    // Эмулируем ввод в поле поиска
    fireEvent.change(screen.getByPlaceholderText('Поиск задачи'), {
      target: { value: 'задача' },
    });

    const expected = [tasks[0], tasks[2]];

    // Ждём вызов useEffect
    expect(store.dispatch).toHaveBeenLastCalledWith(setFilteredTasks(expected));
  });
});
let store: ReturnType<typeof mockStore>;

describe('Компонент Search – edge cases и поведение', () => {
  const renderWithStore = (
    initialTasks: Task[],
    filterStatus = '',
    filterBoard = '',
  ) => {
    store = mockStore({
      Tasks: {
        allTasks: initialTasks,
        tasks: initialTasks,
        filterStatus,
        filterBoard,
      },
      Board: {} as BoardStore,
      users: {} as UsersStore,
      api: {} as any,
      queryState: {} as QueryStateType,
    });

    store.dispatch = vi.fn(); // мок

    render(
      <Provider store={store}>
        <Search />
      </Provider>,
    );
  };

  it('ничего не делает, если список задач пустой', () => {
    renderWithStore([]);

    fireEvent.change(screen.getByPlaceholderText('Поиск задачи'), {
      target: { value: 'тест' },
    });

    expect(store.dispatch).toHaveBeenCalledWith(setFilteredTasks([]));
  });

  it('обрезает пробелы и приводит к нижнему регистру строку поиска', () => {
    const tasks = [
      {
        id: 1,
        title: 'Тестовая задача',
        assignee: { fullName: 'Анна' },
        status: 'done',
        boardId: 1,
      },
    ];

    renderWithStore(tasks);

    fireEvent.change(screen.getByPlaceholderText('Поиск задачи'), {
      target: { value: '   тЕсТоВаЯ   ' },
    });

    expect(store.dispatch).toHaveBeenCalledWith(setFilteredTasks(tasks));
  });

  it('обнуляет результат при поиске по отсутствующему слову', () => {
    const tasks = [
      {
        id: 1,
        title: 'Документирование API',
        assignee: { fullName: 'Антон' },
        status: 'todo',
        boardId: 1,
      },
    ];

    renderWithStore(tasks);

    fireEvent.change(screen.getByPlaceholderText('Поиск задачи'), {
      target: { value: 'несуществующее' },
    });

    expect(store.dispatch).toHaveBeenCalledWith(setFilteredTasks([]));
  });
});
