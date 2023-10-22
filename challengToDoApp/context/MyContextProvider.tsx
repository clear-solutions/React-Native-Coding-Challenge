// MyContext.ts
import {
  createContext,
  useContext,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { showMessage } from "react-native-flash-message";

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface MyContextProps {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (todoId: number) => void;
  completeTodo: (todoId: number) => void;
  uncompleteTodo: (todoId: number) => void;
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};

export const MyContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const fetchTodos = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error fetching data");
    }
  };

  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (todo: Todo) => {
    setTodos([todo, ...todos]);
    showMessage({
      message: "Task Added",
      description: "You've added a new task.",
      type: "success",
      icon: "success"
    });
  };

  const removeTodo = (todoId: number) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
    showMessage({
      message: "Task Removed",
      description: "You've removed a task.",
      type: "success",
      icon: "success"
    });
  };

  const completeTodo = (todoId: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: true } : todo
      )
    );
    showMessage({
      message: "Task Updated",
      description: "The task status has been changed to completed.",
      type: "success",
      icon: "success"
    });
  };

  const uncompleteTodo = (todoId: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: false } : todo
      )
    );
    showMessage({
      message: "Task Updated",
      description: "The task status has been changed to uncompleted.",
      type: "success",
      icon: "success"
    });
  };

  useEffect(() => {
    fetchTodos().then((data) => setTodos(data));
  }, []);

  return (
    <MyContext.Provider
      value={{ todos, addTodo, removeTodo, completeTodo, uncompleteTodo }}
    >
      {children}
    </MyContext.Provider>
  );
};
