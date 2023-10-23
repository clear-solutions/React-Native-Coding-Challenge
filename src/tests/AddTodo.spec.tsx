import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import AddTodoField from '../components/AddTodoField/AddTodoField';
test('renders AddTodoField and adds a new todo', () => {
  const { getByPlaceholderText, getByText, getByDisplayValue } = render(
    <AddTodoField />,
  );

  const inputElement = getByPlaceholderText('Add todo');
  expect(inputElement).toBeInTheDocument();

  const addButton = getByText('Add');
  expect(addButton).toBeInTheDocument();

  fireEvent.change(inputElement, { target: { value: 'Test todo' } });

  const inputValue = getByDisplayValue('Test todo');
  expect(inputValue).toBeInTheDocument();

  fireEvent.click(addButton);
});
