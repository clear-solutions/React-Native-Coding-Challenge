import React from "react";
import { View } from "react-native";
import TodoList from "../components/TodoList/TodoList";
import { ITodo } from "../types";
import { visibleTodos } from "../services/utils";

interface IListsScreen {
  ongoingTasks: ITodo[];
  completedTasks: ITodo[];
}

const ListsScreen = ({ ongoingTasks, completedTasks }: IListsScreen) => {
  const { totalUnvisible: totalUnvisibleOngoing, list: visibleOngoingTasks } =
    visibleTodos(ongoingTasks, completedTasks.length);
  const {
    totalUnvisible: totalUnvisibleCompleted,
    list: visibleCompletedTasks,
  } = visibleTodos(completedTasks, completedTasks.length);

  return (
    <View className="flex-1 w-full">
      {ongoingTasks.length > 0 && (
        <View className="mt-3">
          <TodoList
            tasks={visibleOngoingTasks}
            title="ONGOING"
            totalUnvisible={totalUnvisibleOngoing}
          />
        </View>
      )}
      {completedTasks.length > 0 && (
        <View className="mt-3">
          <TodoList
            tasks={visibleCompletedTasks}
            title="FINISHED"
            totalUnvisible={totalUnvisibleCompleted}
          />
        </View>
      )}
    </View>
  );
};

export default ListsScreen;
