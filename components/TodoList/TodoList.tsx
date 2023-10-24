import React from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import TodoItem from "./TodoItem";
import CustomText from "../CustomText";
import type { ITodo } from "../../types";
import { useCustomNavigation } from "../../services/hooks";

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
    <View className="w-full">
      <View className="justify-between flex-row px-7 items-end">
        <CustomText weight="bold" styles="tracking-widest my-2 text-white">
          {title}
        </CustomText>
        {!allTasksVisible && <TouchableOpacity
          onPress={() => {
            navigation.navigate("AllTodos", { listName: title });
          }}
          className="justify-between mt-3 flex-row items-center"
        >
          <CustomText styles="tracking-widest  text-white">
            {totalUnvisible! > 100 ? "99+" : `${totalUnvisible}`} MORE
          </CustomText>
        </TouchableOpacity>}
      </View>
      <View className="w-full">
        {!allTasksVisible &&
          tasks.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
        {allTasksVisible && (
          <FlatList
            data={tasks}
            style={{ overflow: "hidden" , maxHeight: "95%"}}

            renderItem={({ item }) => <TodoItem key={item.id} todo={item} />}
          />
        )}
      </View>
    </View>
  );
};

export default TodoList;
