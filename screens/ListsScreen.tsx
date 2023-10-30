import React from "react";
import { View } from "react-native";
import TodoList from "../components/TodoList/TodoList";
import { ITodo } from "../types";
import { visibleTodos } from "../services/utils";
import LIST from "../constants/List";
import CustomText from "../components/CustomText";

interface IListsScreen {
  ongoingTasks: ITodo[];
  completedTasks: ITodo[];
  searching?: boolean;
}

const ListsScreen = ({
  ongoingTasks,
  completedTasks,
  searching,
}: IListsScreen) => {
  const { totalUnvisible: totalUnvisibleOngoing, list: visibleOngoingTasks } =
    visibleTodos(ongoingTasks, completedTasks.length);
  const {
    totalUnvisible: totalUnvisibleCompleted,
    list: visibleCompletedTasks,
  } = visibleTodos(completedTasks, ongoingTasks.length);
  return (
    <View className="flex-1 w-full">
      {searching && !ongoingTasks.length && !completedTasks.length && (
          <View className="w-full items-center mt-4">
            <CustomText weight="bold" styles="text-2xl text-white">
              No task found with this title
            </CustomText>
          </View>
        )}
      {ongoingTasks.length > 0 && (
        <View className="mt-3">
          <TodoList
            searching={searching}
            tasks={visibleOngoingTasks}
            title={LIST.ONGOING}
            totalUnvisible={totalUnvisibleOngoing}
          />
        </View>
      )}
      {completedTasks.length > 0 && (
        <View className="mt-3">
          <TodoList
            searching={searching}
            tasks={visibleCompletedTasks}
            title={LIST.FINISHED}
            totalUnvisible={totalUnvisibleCompleted}
          />
        </View>
      )}
    </View>
  );
};

export default ListsScreen;
