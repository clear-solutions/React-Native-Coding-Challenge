import { View, Text } from "react-native";
import React, { useState } from "react";
import { Pressable, TouchableOpacityProps } from "react-native";
import CustomText from "../CustomText";
import COLORS from "../../constants/Colors";

interface Badge extends TouchableOpacityProps {
  title: string;
  color: string;
  isChosen?: boolean;
}

export default function PriorityBadge({
  color,
  isChosen,
  title,
  onPress,
}: Badge) {
  return (
    <Pressable
      onPress={onPress}
      style={{ backgroundColor: isChosen ? color : COLORS.white }}
      className="w-[100px] py-1 px-3 items-center rounded-full text-center"
    >
      <CustomText
        weight={isChosen ? "bold" : "regular"}
        styles={`text-sm ${isChosen ? "text-white" : "text-black"}`}
      >
        {title}
      </CustomText>
    </Pressable>
  );
}
