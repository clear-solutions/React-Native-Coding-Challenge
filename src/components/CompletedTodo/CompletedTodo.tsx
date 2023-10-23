// CompletedTodo.js
import { FC, useState } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { RootState } from '../../store/store';
import SearchField from '../SearchField/SearchField';
import UncompletedTodo from '../UncompletedTodo/UncompletedTodo';
import styles from './style.module.css';

const CompletedTodo: FC = () => {
  const completedTodos = useAppSelector((state: RootState) =>
    state.todos.filter((todo) => todo.completed),
  );
  const [selectedTodo, setSelectedTodo] = useState<number[]>([]);

  const handleUndoTodoId = (id: number, isChecked: boolean) => {
    if (isChecked) {
      setSelectedTodo([...selectedTodo, id]);
    } else {
      setSelectedTodo(selectedTodo.filter((selectedId) => selectedId !== id));
    }
  };

  return (
    <div>
      <div className={styles.flex}>
        <div className={styles.flex}>
          <div className={styles.box}>
            <SearchField />

            {completedTodos?.length > 0 ? (
              <ul className={styles.list}>
                {completedTodos.map((todo) => (
                  <div key={todo.id} className={styles.todoContainer}>
                    <input
                      type='checkbox'
                      value={todo.title}
                      // checked={selectedTodo.includes(todo.id)}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleUndoTodoId(todo.id, e.target.checked)
                      }
                    />
                    <span className={styles.todoTitle}>{todo.title}</span>
                  </div>
                ))}
              </ul>
            ) : (
              <p>No completed todos available</p>
            )}
          </div>
        </div>
        <UncompletedTodo undoTodoIds={selectedTodo} />
      </div>
    </div>
  );
};

export default CompletedTodo;
