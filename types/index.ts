export interface ITodo {
  id: number;
  title: string;
  completed: false;
}

export interface CustomNavigationProps {
  navigate: (listName: string, params?: Record<string, any>) => void;
}

export type StackParamList = {
  Home: undefined;
  AllTodos: { listName: string };
  AddTodoModal: undefined;
};