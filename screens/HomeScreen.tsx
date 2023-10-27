import React, { useState } from "react";
import ListsScreen from "./ListsScreen";
import { View } from "react-native";
import EmptyListScreen from "./EmptyListScreen";
import AddTodoButton from "../components/Buttons/AddTodoButton";
import { useAppSelector } from "../services/hooks";
import {
  getListError,
  getListStatus,
  selectCompletedTasks,
  selectOngoingTasks,
  selectSelectedCompleted,
  selectSelectedOngoing,
} from "../store/listSlice";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";
import CircularButton from "../components/Buttons/CircularButton";
import COLORS from "../constants/Colors";
import { isSelecting } from "../store/layoutSlice";
import {
  ActivateSelectionButton,
  CloseSelectionButton,
  MarkAllCompletedButton,
  MarkAllUncompletedButton,
} from "../components/Buttons";
import SearchBar from "../components/SearchBar";

export default function HomeScreen() {
  const ongoingTasks = useAppSelector(selectOngoingTasks);
  const completedTasks = useAppSelector(selectCompletedTasks);
  const [searchInput, setSearchInput] = useState("");
  const [searching, setSearching] = useState(false);
  const selectedOngoingTasks = useAppSelector(selectSelectedOngoing);
  const selectedCompletedTasks = useAppSelector(selectSelectedCompleted);
  const error = useAppSelector(getListError);
  const status = useAppSelector(getListStatus);
  const selecting = useAppSelector(isSelecting);
  const taskExists = ongoingTasks.length > 0 || completedTasks.length > 0;

  if (status === "pending") {
    return <LoadingScreen />;
  }
  
  const close = () => {
    setSearching(false);
    setSearchInput("");
  }

  return (
    <View className="flex-1  w-full bg-purple items-center justify-center">
      {error ? (
        <ErrorScreen />
      ) : !ongoingTasks.length && !completedTasks.length ? (
        <EmptyListScreen />
      ) : (
        <View className="flex-1 w-full">
          {searching && (
            <SearchBar close={close} input={searchInput} setInput={setSearchInput} />
          )}
          <ListsScreen
            searching={searching}
            ongoingTasks={
              searching
                ? ongoingTasks.filter((task) =>
                    task.title.toLowerCase().includes(searchInput.toLowerCase())
                  )
                : ongoingTasks
            }
            completedTasks={
              searching
                ? completedTasks.filter((task) =>
                    task.title.toLowerCase().includes(searchInput.toLowerCase())
                  )
                : completedTasks
            }
          />
        </View>
      )}
      {!error && !searching && (
        <View className="items-center flex-row justify-center w-full">
          {!selecting && taskExists && (
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
          {!selecting && <AddTodoButton />}
          {taskExists && (
            <View className="ml-3">
              {selecting ? (
                <CloseSelectionButton />
              ) : (
                <ActivateSelectionButton />
              )}
            </View>
          )}
        </View>
      )}
    </View>
  );
}
