// TodoItem.tsx
import React from "react";
// import { ListItem, CheckBox, Icon } from 'react-native-elements';
import { ListItem, CheckBox, Icon } from "@rneui/themed";

interface TodoItemProps {
  todo: {
    id: number;
    title: string;
    completed: boolean;
  };
  onToggle: (todoId: number, completed: boolean) => void;
  onDelete: (todoId: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <ListItem>
      <CheckBox
        checked={todo.completed}
        onPress={() => onToggle(todo.id, todo.completed)}
      />
      <ListItem.Content>
        <ListItem.Title>{todo.title}</ListItem.Title>
      </ListItem.Content>
      <Icon name="delete" type="material" onPress={() => onDelete(todo.id)} />
    </ListItem>
  );
};

export default TodoItem;
