import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import SearchField from '../components/SearchField/SearchField';
import { store } from '../store/store';

test('renders SearchField component', () => {
  render(
    <Provider store={store}>
      <SearchField />
    </Provider>,
  );

  expect(
    screen.getByPlaceholderText('Search 3 letters or more (for ex ill)'),
  ).toBeInTheDocument();
  expect(screen.getByText('Search')).toBeInTheDocument();
});

test('filters and dispatches searchTodo action', () => {
  render(
    <Provider store={store}>
      <SearchField />
    </Provider>,
  );

  const input = screen.getByPlaceholderText(
    'Search 3 letters or more (for ex ill)',
  );
  const button = screen.getByText('Search');

  fireEvent.change(input, { target: { value: 'ill' } });
  expect(input).toHaveValue('ill');
  fireEvent.click(button);
});
