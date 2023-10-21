import { FC } from 'react';
import styles from './style.module.css';

interface TodoButtonsProps {
  completeSelectedTodo: () => void;
  undoTodo: () => void;
}

const TodoButtons: FC<TodoButtonsProps> = ({
  completeSelectedTodo,
  undoTodo,
}) => {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={completeSelectedTodo}>
        complete
      </button>
      <button className={styles.button} onClick={undoTodo}>
        undo
      </button>
    </div>
  );
};

export default TodoButtons;
