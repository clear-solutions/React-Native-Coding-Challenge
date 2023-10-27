import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useAppSelector } from "../services/hooks";
import {
  selectCompletedTasks,
  selectOngoingTasks,
  selectSelectedCompleted,
  selectSelectedOngoing,
} from "../store/listSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../types";
import TodoList from "../components/TodoList/TodoList";
import AddTodoButton from "../components/Buttons/AddTodoButton";
import FilterRadioGroup from "../components/FilterRadioGroup";
import LIST from "../constants/List";
import CircularButton from "../components/Buttons/CircularButton";
import {
  ActivateSelectionButton,
  CloseSelectionButton,
  MarkAllCompletedButton,
  MarkAllUncompletedButton,
} from "../components/Buttons";
import COLORS from "../constants/Colors";
import { isSelecting } from "../store/layoutSlice";
import SearchBar from "../components/SearchBar";
import CustomText from "../components/CustomText";

export default function AllTodosScreen({
  route,
}: NativeStackScreenProps<StackParamList, "AllTodos">) {
  const [searching, setSearching] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { listName } = route.params;
  const selecting = useAppSelector(isSelecting);
  const selectedOngoingTasks = useAppSelector(selectSelectedOngoing);
  const selectedCompletedTasks = useAppSelector(selectSelectedCompleted);

  const allTasks = useAppSelector(
    listName === LIST.ONGOING ? selectOngoingTasks : selectCompletedTasks
  );

  const close = () => {
    setSearching(false);
    setSearchInput("");
  };

  return (
    <View className="bg-purple flex-1 justify-between">
      {searching && (
        <SearchBar
          close={close}
          input={searchInput}
          setInput={setSearchInput}
        />
      )}
      {searching && !allTasks.length && (
        <View className="w-full items-center mt-4">
          <CustomText weight="bold" styles="text-2xl text-white">
            No task found with this title
          </CustomText>
        </View>
      )}
      <View className="flex-1 mb-2 justify-start">
        <TodoList
          title={listName}
          searching={searching}
          tasks={
            searching
              ? allTasks.filter((task) =>
                  task.title.toLowerCase().includes(searchInput.toLowerCase())
                )
              : allTasks
          }
          allTasksVisible
        />
      </View>
      {!searching && (
        <View className="items-center">
          <View className="my-3 w-full px-4">
            <FilterRadioGroup />
          </View>
          <View className="items-center flex-row justify-center w-full">
            {!selecting && (
              <View className="mr-3">
                <CircularButton
                  onPress={() => setSearching(true)}
                  bgColor={COLORS.white}
                  innerIconColor={COLORS.purple}
                  size={58}
                  innerIconSize={36}
                  innerIconName="search1"
                />
              </View>
            )}
            {selectedOngoingTasks.length > 0 && selecting && (
              <MarkAllCompletedButton />
            )}
            {selectedCompletedTasks.length > 0 && selecting && (
              <MarkAllUncompletedButton />
            )}
            {!selecting && listName === LIST.ONGOING && <AddTodoButton />}
            <View className="ml-3">
              {selecting ? (
                <CloseSelectionButton />
              ) : (
                <ActivateSelectionButton />
              )}
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
