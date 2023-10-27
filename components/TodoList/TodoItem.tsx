import React, { useEffect, useLayoutEffect } from "react";
import { Pressable } from "react-native";
import CustomText from "../CustomText";
import type { ITodo } from "../../types";
import { Priorities } from "../../constants/Priorities";
import Checkbox from "../Checkbox";
import LIST from "../../constants/List";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import {
  selectSelectedCompleted,
  selectSelectedOngoing,
  selectOrRemoveTask,
} from "../../store/listSlice";
import { isSelecting } from "../../store/layoutSlice";
import COLORS from "../../constants/Colors";
import AntDesign from "react-native-vector-icons/AntDesign";

function TodoItem({
  todo,
  index,
  listTitle,
}: {
  todo: ITodo;
  index: number;
  listTitle: LIST;
}) {
  const { title, completed } = todo;
  const selectedOngoingTasks = useAppSelector(selectSelectedOngoing);
  const dispatch = useAppDispatch();
  const selectedCompletedTasks = useAppSelector(selectSelectedCompleted);
  const selecting = useAppSelector(isSelecting);

  const selected =
    LIST.ONGOING === listTitle
      ? selectedOngoingTasks.includes(index)
      : selectedCompletedTasks.includes(index);
  const isSelectable =
    (listTitle === LIST.ONGOING && selectedCompletedTasks.length === 0) ||
    (listTitle === LIST.FINISHED && selectedOngoingTasks.length === 0);

  const select = () => {
    if (!isSelectable || !selecting) return;
    dispatch(selectOrRemoveTask({ listTitle, index}));
  };

  const {
    tier,
    color: priorityColor,
    icon: priorityIcon,
  } = Priorities[todo.priorityTier];

  return (
    <Pressable
      onPress={select}
      className={`mt-2 h-16 items-center  justify-between flex-row mb-1 rounded-lg px-5 ${
        completed ? "bg-[#14b8a6]" : "bg-white"
      }`}
    >
      <CustomText
        numberOfLines={2}
        ellipsizeMode="tail"
        weight="medium"
        styles={`text-base w-[90%] ${
          completed ? "line-through" : "text-purple"
        }`}
      >
        {title}
      </CustomText>
      {!selecting && (
        <AntDesign
          name={priorityIcon}
          size={24}
          style={{
            color: completed ? COLORS.purple : priorityColor,
            margin: 0,
          }}
        />
      )}
      {selecting && <Checkbox selected={selected} listTitle={listTitle} />}
    </Pressable>
  );
}

export default TodoItem;
