import React from "react";
import { View } from "react-native";
import TodoList from "../components/TodoList/TodoList";
import Wordmark from "../components/Wordmark";

const ListsScreen: React.FC = () => {
  return (
    <View className="w-[90%] flex-1">
      <TodoList title="UPCOMING" todos={[]}></TodoList>
    </View>
  );
};

export default ListsScreen;
