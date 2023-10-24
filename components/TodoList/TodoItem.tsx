import React from "react";
import { View } from "react-native";
import CustomText from "../CustomText";
import type { ITodo } from "../../types";
import Shadow from "../../styles/Shadow";

export default function TodoItem({todo}: {todo: ITodo}) {
  const {title, id, completed} = todo; 
  
  return (
    <View
      style={Shadow.box}
      className={`mx-3 mt-2 h-16 justify-center  border-[#6db0bc] mb-1 rounded-lg px-6 ${
        completed ? "bg-secondaryBlue border-[1px]" : "bg-white"
      }`}
    >
      <CustomText numberOfLines={2} weight="medium" styles={`text-base ${completed ? "text-white line-through		" : "text-black"}`}>
        {`${id}. ${title}`}
      </CustomText>
    </View>
  );
}
