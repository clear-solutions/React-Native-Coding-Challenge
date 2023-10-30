import {
  View,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React from "react";
import CustomText from "../CustomText";

interface IRadio extends TouchableOpacityProps {
  label: string;
  selected: boolean;
}

export default function RadioButton({ label, selected, onPress }: IRadio) {
  return (
    <TouchableOpacity onPress={onPress} className="flex-row mx-3 items-center">
      <View className="aspect-square bg-purple border-white border items-center justify-center w-4 rounded-full">
        {selected && (
          <View className="aspect-square w-3 bg-white rounded-full" />
        )}
      </View>
      <CustomText weight="medium" styles="ml-1 text-xl text-white">{label}</CustomText>
    </TouchableOpacity>
  );
}
