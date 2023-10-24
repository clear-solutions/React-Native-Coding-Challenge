import React from "react";
import ListsScreen from "./ListsScreen";
import { Text, View, ActivityIndicator } from "react-native";
import EmptyListScreen from "./EmptyListScreen";
import Wordmark from "../components/Wordmark";
import AddTodoButton from "../components/Buttons/AddTodoButton";
import { useAppSelector } from "../services/hooks";
import {
  getListError,
  getListStatus,
  selectCompletedTasks,
  selectOngoingTasks,
} from "../store/listSlice";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";
import AddTodoModal from "../components/AddTodoModal";

export default function HomeScreen() {
  const ongoingTasks = useAppSelector(selectOngoingTasks);
  const completedTasks = useAppSelector(selectCompletedTasks);
  const error = useAppSelector(getListError);
  const status = useAppSelector(getListStatus);

  if (status === "pending") {
    return <LoadingScreen />;
  }

  return (
    <View className="flex-1  w-full bg-blue items-center justify-center">
      {error ? (
        <ErrorScreen />
      ) : !ongoingTasks.length && !completedTasks.length ? (
        <EmptyListScreen />
      ) : (
        <ListsScreen
          ongoingTasks={ongoingTasks}
          completedTasks={completedTasks}
        />
      )}
      {!error && <AddTodoButton />}
    </View>
  );
}
