import React from "react";
import ListsScreen from "./ListsScreen";
import { View } from "react-native";
import EmptyListScreen from "./EmptyListScreen";
import Wordmark from "../components/Wordmark";
import AddTodoButton from "../components/Buttons/AddTodoButton";

export default function HomeScreen() {
  const data = [];

  return (
    <View className="flex-1  w-full bg-blue items-center justify-center">
      <View className="my-5">
        <Wordmark />
      </View>
      {!data.length ? <EmptyListScreen /> : <ListsScreen />}
      <AddTodoButton/>
    </View>
  );
}
