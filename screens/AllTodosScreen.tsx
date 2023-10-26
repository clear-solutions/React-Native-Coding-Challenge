import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "../services/hooks";
import { selectCompletedTasks, selectOngoingTasks } from "../store/listSlice";
import { RouteProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../types";
import TodoList from "../components/TodoList/TodoList";
import AddTodoButton from "../components/Buttons/AddTodoButton";
import FilterRadioGroup from "../components/FilterRadioGroup";

export default function AllTodosScreen({
  route,
}: NativeStackScreenProps<StackParamList, "AllTodos">) {
  const { listName } = route.params;
  const allTasks = useAppSelector(
    listName === "ONGOING" ? selectOngoingTasks : selectCompletedTasks
  );

  return (
    <View className="bg-purple flex-1 justify-between">
      <View className="flex-1 mb-2 justify-start">
        <TodoList title={listName} tasks={allTasks} allTasksVisible />
      </View>
      <View className="items-center">
      <View className="my-3 w-full px-4">
        <FilterRadioGroup />
      </View>
      <AddTodoButton /></View>
    </View>
  );
}

const styles = StyleSheet.create({});
