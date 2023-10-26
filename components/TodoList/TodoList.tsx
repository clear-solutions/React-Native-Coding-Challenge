import React from "react";
import {
  View,
  TouchableOpacity,
} from "react-native";
import TodoItem from "./TodoItem";
import CustomText from "../CustomText";
import type { ITodo } from "../../types";
import { useCustomNavigation } from "../../services/hooks";
import { SwipeListView } from "react-native-swipe-list-view";
import HiddenRow from "../HiddenRow";

interface IListProps {
  title: string;
  tasks: ITodo[];
  totalUnvisible?: number;
  allTasksVisible?: boolean;
}

const TodoList = ({
  title,
  tasks,
  totalUnvisible,
  allTasksVisible,
}: IListProps) => {
  const navigation = useCustomNavigation();

  return (
    <View className={`w-full ${allTasksVisible && "flex-1"}`}>
      <View className="justify-between flex-row px-7 items-end">
        <CustomText weight="bold" styles="tracking-widest text-white">
          {title}
        </CustomText>
        {!allTasksVisible && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AllTodos", { listName: title });
            }}
            className="justify-between mt-3 flex-row items-center"
          >
            <CustomText styles="tracking-widest  text-white">
              {totalUnvisible! > 100 ? "99+" : `${totalUnvisible}`} MORE
            </CustomText>
          </TouchableOpacity>
        )}
      </View>
      <View className={`w-full ${allTasksVisible && "flex-1"}`}>
        <SwipeListView
          data={tasks}
          extraData={tasks}
          style={{
            overflow: "hidden",
            flex: allTasksVisible ? 1 : 0,
            marginTop: 8,
            paddingHorizontal: 12,
          }}
          renderItem={({ item, index }) => (
            <TodoItem index={index} key={index} todo={item} />
          )}
          stopRightSwipe={title === "ONGOING" ? -130 : -70}
          scrollEnabled={allTasksVisible ?? false}
          closeOnRowPress
          rightOpenValue={title === "ONGOING" ? -110 : -55}
          disableRightSwipe
          renderHiddenItem={(data, rowMap) => (
            <HiddenRow
              listTitle={title}
              rowIndex={data.index}
              rowMap={rowMap}
            />
          )}
        />
      </View>
    </View>
  );
};

export default TodoList;
