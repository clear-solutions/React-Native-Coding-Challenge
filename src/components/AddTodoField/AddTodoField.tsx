import { FC, useState } from 'react';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { addTodo } from '../../store/reducers/todo.slice';
import styles from './style.module.css';
const AddTodoField: FC = () => {
  const [todo, setTodo] = useState<string>('');
  const dispatch = useAppDispatch();

  const changeTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const handleTodo = () => {
    if (todo.trim()) {
      const newTodo = {
        id: Date.now(),
        title: todo,
        completed: false,
      };
      dispatch(addTodo([newTodo]));
      setTodo('');
    }
  };

  return (
    <div className={styles.container}>
      <input
        type='text'
        placeholder='Add todo'
        onChange={changeTodo}
        className={styles.input}
        value={todo}
      />
      <button onClick={handleTodo} className={styles.button}>
        Add
      </button>
    </div>
  );
};

export default AddTodoField;
