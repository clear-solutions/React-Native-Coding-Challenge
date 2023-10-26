import React from "react";
import { View } from "react-native";
import CustomText from "../CustomText";
import type { ITodo } from "../../types";
import Shadow from "../../styles/Shadow";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Priorities } from "../../constants/Priorities";
import COLORS from "../../constants/Colors";

export default function TodoItem({
  todo,
  index,
}: {
  todo: ITodo;
  index: number;
}) {
  const { title, completed } = todo;
  const {
    tier,
    color: priorityColor,
    icon: priorityIcon,
  } = Priorities[todo.priorityTier];
  return (
    <View
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
        {`${index + 1}. ${title}`}
      </CustomText>
      <AntDesign
        name={priorityIcon}
        size={24}
        style={{ color: completed ? COLORS.purple : priorityColor, margin: 0 }}
      />
    </View>
  );
}
