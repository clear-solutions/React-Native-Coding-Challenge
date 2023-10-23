import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import UncompletedTodo from '../components/UncompletedTodo/UncompletedTodo';
import { completeTodo, undoTodo } from '../store/reducers/todo.slice';
import { store } from '../store/store';

jest.mock('../../hooks/reduxHooks', () => ({
  useAppDispatch: () => jest.fn(),
}));

test('renders UncompletedTodo component', () => {
  render(
    <Provider store={store}>
      <UncompletedTodo undoTodoIds={[]} />
    </Provider>,
  );

  expect(screen.getByText('No todos available')).toBeInTheDocument();
  expect(screen.getByText('Add')).toBeInTheDocument();
  expect(screen.getByText('Complete Selected')).toBeInTheDocument();
  expect(screen.getByText('Undo')).toBeInTheDocument();
});

test('selects and unselects todo items', () => {
  render(
    <Provider store={store}>
      <UncompletedTodo undoTodoIds={[]} />
    </Provider>,
  );

  const checkbox1 = screen.getByRole('checkbox', { name: /Todo 1/i });
  const checkbox2 = screen.getByRole('checkbox', { name: /Todo 2/i });

  fireEvent.click(checkbox1);
  expect(checkbox1).toBeChecked();

  fireEvent.click(checkbox2);
  expect(checkbox2).not.toBeChecked();
});

test('dispatches completeTodo and undoTodo actions', () => {
  const mockDispatch = jest.fn();
  jest.mock('../hooks/reduxHooks', () => ({
    useAppDispatch: () => mockDispatch,
  }));

  render(
    <Provider store={store}>
      <UncompletedTodo undoTodoIds={[]} />
    </Provider>,
  );

  const checkbox1 = screen.getByRole('checkbox', { name: /Todo 1/i });
  const checkbox2 = screen.getByRole('checkbox', { name: /Todo 2/i });
  const completeSelectedButton = screen.getByText('Complete Selected');
  const undoButton = screen.getByText('Undo');

  fireEvent.click(checkbox1);
  fireEvent.click(checkbox2);

  fireEvent.click(completeSelectedButton);
  expect(mockDispatch).toHaveBeenCalledWith(completeTodo([1, 2]));

  fireEvent.click(undoButton);
  expect(mockDispatch).toHaveBeenCalledWith(undoTodo([]));
});
