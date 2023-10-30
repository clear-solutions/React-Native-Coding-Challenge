import LIST from "../constants/List";

export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
  priorityTier: number;
  creationDate: number;
}

export interface CustomNavigationProps {
  navigate: (screenName: string, params?: Record<string, any>) => void;
  goBack: () => void;
}

export type StackParamList = {
  Home: undefined;
  AllTodos: { listName: LIST };
  AddTodoModal: undefined;
};
