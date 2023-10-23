// UncompletedTodo.js
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  addTodo,
  completeTodo,
  undoTodo,
} from '../../store/reducers/todo.slice';

import { RootState } from '../../store/store';
import AddTodoField from '../AddTodoField/AddTodoField';
import TodoButtons from '../TodoButtons/TodoButtons';
import styles from './style.module.css';

interface UncompletedTodoProps {
  undoTodoIds: number[];
}

const UncompletedTodo: FC<UncompletedTodoProps> = ({ undoTodoIds }) => {
  const todos = useAppSelector((state: RootState) =>
    state.todos.filter((todo) => !todo.completed),
  );
  const [selectedTodo, setSelectedTodo] = useState<number[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/todos?_start=0&_limit=10',
        );
        if (!response.ok) {
          throw new Error('something wrong with your network');
        }
        const data = await response.json();
        dispatch(addTodo(data));
      } catch (error) {
        console.error('Error occurred while fetching data', error);
      }
    };
    fetchTodos();
  }, []);

  const handleCompleteTodoId = (id: number, isChecked: boolean) => {
    if (isChecked) {
      setSelectedTodo([...selectedTodo, id]);
    } else {
      setSelectedTodo(selectedTodo.filter((selectedId) => selectedId !== id));
    }
  };

  const handleCompleteSelectedTodo = () => {
    dispatch(completeTodo(selectedTodo));
    setSelectedTodo([]);
  };

  const handleUndoSelectedTodo = () => {
    dispatch(undoTodo(undoTodoIds));
    setSelectedTodo([]);
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.box}>
          <AddTodoField />

          {todos?.length > 0 ? (
            <ul className={styles.list}>
              {todos.map((todo) => (
                <div key={todo.id} className={styles.todoContainer}>
                  <input
                    type='checkbox'
                    value={todo.id}
                    id={todo.id}
                    checked={selectedTodo.includes(todo.id)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleCompleteTodoId(todo.id, e.target.checked)
                    }
                  />
                  <label className={styles.todoTitle} htmlFor={todo.id}>
                    {todo.title}
                  </label>
                </div>
              ))}
            </ul>
          ) : (
            <p>No todos available</p>
          )}
        </div>
        <TodoButtons
          completeSelectedTodo={handleCompleteSelectedTodo}
          undoTodo={handleUndoSelectedTodo}
        />
      </div>
    </div>
  );
};

export default UncompletedTodo;
