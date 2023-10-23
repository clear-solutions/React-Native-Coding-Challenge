import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import CompletedTodo from '../components/CompletedTodo/CompletedTodo';
import { ITodos } from '../types/Todo';

type SelectorType = (state: { todos: ITodos[] }) => ITodos[];

jest.mock('../hooks/reduxHooks', () => ({
  useAppSelector: (selector: SelectorType) =>
    selector({
      todos: [
        { id: 1, title: 'Todo 1', completed: true },
        { id: 2, title: 'Todo 2', completed: false },
      ],
    }),
}));

test('renders CompletedTodo component', () => {
  render(<CompletedTodo />);

  expect(screen.getByText('Search')).toBeInTheDocument();
  expect(screen.getByText('Todo 1')).toBeInTheDocument();
  expect(screen.queryByText('Todo 2')).toBeNull();
});

test('selects and unselects completed todos', () => {
  render(<CompletedTodo />);

  const checkbox = screen.getByRole('checkbox', { name: 'Todo 1' });
  fireEvent.click(checkbox);

  expect(checkbox).toBeChecked();

  fireEvent.click(checkbox);

  expect(checkbox).not.toBeChecked();
});
