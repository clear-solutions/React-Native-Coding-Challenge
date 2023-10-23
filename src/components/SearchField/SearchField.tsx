import { FC, useState } from 'react';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { searchTodo } from '../../store/reducers/todo.slice';
import styles from './style.module.css';
const SearchField: FC = () => {
  const [filter, setFilter] = useState<string>('');
  const dispatch = useAppDispatch();

  const filterWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const searchTodos = () => {
    if (filter.length >= 3) {
      dispatch(searchTodo(filter));
    }
  };

  return (
    <div className={styles.container}>
      <input
        type='text'
        placeholder='Search 3 letters or more (for ex ill)'
        className={styles.input}
        onChange={filterWord}
      />
      <button className={styles.button} onClick={searchTodos}>
        Search
      </button>
    </div>
  );
};

export default SearchField;
