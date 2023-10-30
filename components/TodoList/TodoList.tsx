import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import TodoItem from "./TodoItem";
import CustomText from "../CustomText";
import type { ITodo } from "../../types";
import { useAppSelector, useCustomNavigation } from "../../services/hooks";
import { SwipeListView } from "react-native-swipe-list-view";
import HiddenRow from "../HiddenRow";
import LIST from "../../constants/List";
import { isSelecting } from "../../store/layoutSlice";

interface IListProps {
  title: LIST;
  tasks: ITodo[];
  totalUnvisible?: number;
  allTasksVisible?: boolean;
  searching?: boolean;
}

const TodoList = ({
  title,
  tasks,
  totalUnvisible,
  allTasksVisible,
  searching,
}: IListProps) => {
  const [visibleCount, setVisibleCount] = useState(10);
  const navigation = useCustomNavigation();
  const selecting = useAppSelector(isSelecting);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const FooterItem =
    visibleCount <= tasks.length ? (
      <View className="w-full items-center mt-3 justify-center">
        <CustomText weight="bold" styles="tracking-[4px] text-white">
          LOADING
        </CustomText>
      </View>
    ) : (
      <></>
    );

  return (
    <View className={`w-full ${allTasksVisible && "flex-1"}`}>
      <View className="justify-between flex-row px-7 items-end">
        <CustomText weight="bold" styles="tracking-widest text-white">
          {title}
        </CustomText>
        {!allTasksVisible && totalUnvisible! > 0 && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AllTodos", { listName: title });
            }}
            className="justify-between mt-3 flex-row items-center"
          >
            {!searching && (
              <CustomText testID="navigation-to-all" styles="tracking-widest  text-white">
                {totalUnvisible! > 100 ? "99+" : `${totalUnvisible}`} MORE
              </CustomText>
            )}
          </TouchableOpacity>
        )}
      </View>
      <View className={`w-full ${allTasksVisible && "flex-1"}`}>
        <SwipeListView
          data={tasks.slice(0, visibleCount)}
          extraData={tasks}
          ListFooterComponent={FooterItem}
          initialNumToRender={10}
          onEndReached={handleLoadMore}
          style={{
            overflow: "hidden",
            flex: allTasksVisible ? 1 : 0,
            marginTop: 8,
            paddingHorizontal: 12,
          }}
          renderItem={({ item, index }) => (
            <TodoItem index={index} listTitle={title} key={index} todo={item} />
          )}
          stopRightSwipe={title === LIST.ONGOING ? -170 : -120}
          scrollEnabled={allTasksVisible ?? false}
          closeOnRowPress
          rightOpenValue={title === LIST.ONGOING ? -155 : -105}
          disableRightSwipe
          disableLeftSwipe={selecting}
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
