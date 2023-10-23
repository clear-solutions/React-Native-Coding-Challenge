import { FC } from 'react';
import styles from './App.module.css';
import CompletedTodo from './components/CompletedTodo/CompletedTodo';
import './normalize.css';

const App: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <CompletedTodo />
      </div>
    </div>
  );
};

export default App;
