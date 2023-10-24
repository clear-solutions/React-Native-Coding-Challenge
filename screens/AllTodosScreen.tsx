import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "../services/hooks";
import { selectCompletedTasks, selectOngoingTasks } from "../store/listSlice";
import { RouteProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../types";
import Wordmark from "../components/Wordmark";
import TodoList from "../components/TodoList/TodoList";
import AddTodoButton from "../components/Buttons/AddTodoButton";

export default function AllTodosScreen({
  route,
}: NativeStackScreenProps<StackParamList, "AllTodos">) {
  const { listName } = route.params;
  const dispatch = useAppDispatch();
  const allTasks = useAppSelector(
    listName === "ONGOING" ? selectOngoingTasks : selectCompletedTasks
  );

  return (
    <View className="bg-blue flex-1 justify-between items-center">
      <View className="flex-1">
        <View className="mb-2 justify-start">
          <TodoList title={listName} tasks={allTasks} allTasksVisible />
        </View>
      </View>
      <View></View>
      <AddTodoButton />
    </View>
  );
}

const styles = StyleSheet.create({});
