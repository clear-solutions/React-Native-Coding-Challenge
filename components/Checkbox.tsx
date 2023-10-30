import { View, Text } from "react-native";
import React from "react";
import LIST from "../constants/List";
import COLORS from "../constants/Colors";

export default function Checkbox({
  listTitle,
  selected,
}: {
  listTitle: LIST;
  selected: boolean;
}) {
  return (
    <View className="bg-purple w-6 items-center justify-center aspect-square rounded-full">
      <View
        style={{
          borderColor:
            listTitle === LIST.ONGOING ? COLORS.white : COLORS.primaryGreen,
          backgroundColor: !selected
            ? COLORS.purple
            : listTitle === LIST.ONGOING
            ? COLORS.white
            : COLORS.primaryGreen,
        }}
        className="bg-purple w-5 border aspect-square rounded-full"
      />
    </View>
  );
}
