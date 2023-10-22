import React from "react";
import { View, Text } from "react-native";
import TodoItem from "./TodoItem";
import CustomText from "../CustomText";
import ITodo from "../../interfaces/Todo";

interface IListProps {
  todos: Array<ITodo>,
  title: string;
}

const TodoList = ({ title, todos }: IListProps) => {
  return (
    <View>
      <CustomText weight="bold" styles="tracking-widest ml-4 text-white">{title}</CustomText>
      <View className="mt-3">
        {todos.map(todo => <TodoItem {...todo}/>)}

      </View>
    </View>
  );
};

export default TodoList;
