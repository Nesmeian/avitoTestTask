import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ChakraProvider } from '@chakra-ui/react';

// Предполагаем, что компонент Filter лежит по пути src/components/Filter.tsx.
// Если у вас другая структура, поправьте путь.
import { Filter } from '../index';
import { setFilterStatus, setFilterBoard } from '@/store/tasksStore';

// Мокаем react-redux: useDispatch и useSelector
vi.mock('react-redux', () => {
  return {
    useDispatch: () => mockDispatch,
    useSelector: (selector: any) => selector(mockState),
  };
});

let mockDispatch: ReturnType<typeof vi.fn>;
let mockState: {
  Board: { boardMap: Record<string, string> };
  Tasks: { filterStatus: string; filterBoard: string };
};

describe('Компонент <Filter />', () => {
  beforeEach(() => {
    mockDispatch = vi.fn();

    mockState = {
      Board: {
        boardMap: {
          board1: 'Board One',
          board2: 'Board Two',
        },
      },
      Tasks: {
        filterStatus: '',
        filterBoard: '',
      },
    };
  });

  it('рендерит кнопку-триггер с текстом "Выберите фильтры"', () => {
    render(
      <ChakraProvider>
        <Filter />
      </ChakraProvider>,
    );

    screen.getByRole('button', { name: /Выберите фильтры/i });
  });

  it('открывает Popover и показывает два Select-а с корректными опциями', async () => {
    render(
      <ChakraProvider>
        <Filter />
      </ChakraProvider>,
    );

    const triggerButton = screen.getByRole('button', {
      name: /Выберите фильтры/i,
    });
    fireEvent.click(triggerButton);

    screen.getByText(/Выберите статус/i);
    screen.getByText(/Выберите доску/i);

    const selects = await screen.findAllByRole('combobox');
    expect(selects).toHaveLength(2);

    const statusSelect = selects[0];
    const statusOptions = ['BackLog', 'InProgress', 'Done'];
    statusOptions.forEach((opt) => {
      within(statusSelect).getByRole('option', { name: opt });
    });

    const boardSelect = selects[1];
    const boardOptions = ['Board One', 'Board Two'];
    boardOptions.forEach((opt) => {
      within(boardSelect).getByRole('option', { name: opt });
    });
  });

  it('при выборе статуса диспатчит setFilterStatus с правильным значением', async () => {
    render(
      <ChakraProvider>
        <Filter />
      </ChakraProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: /Выберите фильтры/i }));

    const selects = await screen.findAllByRole('combobox');
    const statusSelect = selects[0];

    fireEvent.change(statusSelect, { target: { value: 'InProgress' } });

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(setFilterStatus('InProgress'));
  });

  it('при выборе доски диспатчит setFilterBoard с правильным значением', async () => {
    render(
      <ChakraProvider>
        <Filter />
      </ChakraProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: /Выберите фильтры/i }));

    const selects = await screen.findAllByRole('combobox');
    const boardSelect = selects[1];

    fireEvent.change(boardSelect, { target: { value: 'board2' } });

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(setFilterBoard('board2'));
  });

  it('при клике на "Сбросить Фильтры" диспатчит обнуление статуса и доски', async () => {
    mockState.Tasks.filterStatus = 'Done';
    mockState.Tasks.filterBoard = 'board1';

    render(
      <ChakraProvider>
        <Filter />
      </ChakraProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: /Выберите фильтры/i }));

    const clearButton = await screen.findByRole('button', {
      name: /Сбросить Фильтры/i,
    });
    fireEvent.click(clearButton);

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, setFilterStatus(''));
    expect(mockDispatch).toHaveBeenNthCalledWith(2, setFilterBoard(''));
  });
});

describe('Дополнительные тесты для <Filter />', () => {
  beforeEach(() => {
    mockDispatch = vi.fn();
  });

  it('отображает корректно выбранные фильтры при инициализированном состоянии', async () => {
    mockState = {
      Board: {
        boardMap: {
          board1: 'Board One',
          board2: 'Board Two',
        },
      },
      Tasks: {
        filterStatus: 'Done',
        filterBoard: 'board2',
      },
    };

    render(
      <ChakraProvider>
        <Filter />
      </ChakraProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: /Выберите фильтры/i }));

    const selects = await screen.findAllByRole('combobox');
    const statusSelect = selects[0];
    const boardSelect = selects[1];

    expect((statusSelect as HTMLSelectElement).value).toBe('Done');
    expect((boardSelect as HTMLSelectElement).value).toBe('board2');
  });
});
