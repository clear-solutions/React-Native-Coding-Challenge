import React from "react";
import { View } from "react-native";
import CustomText from "../CustomText";
import ITodo from "../../interfaces/Todo";
import Shadow from "../../styles/Shadow";

export default function TodoItem({ title, completed }: ITodo) {
  return (
    <View style={Shadow.box} className="w-full h-16 justify-center bg-white rounded-lg px-6">
      <CustomText weight="medium" styles="text-black text-base">
       {title}
      </CustomText>
    </View>
  );
}
