import { View, Text } from "react-native";
import React, { useState } from "react";
import CustomText from "./CustomText";
import RadioButton from "./Buttons/RadioButton";
import { useAppDispatch } from "../services/hooks";
import {
  filterTasksByDate,
  filterTasksByPriority,
  setCurrentFilter,
} from "../store/listSlice";

export default function FilterRadioGroup() {
  const [selectedOptionIndex, setSelected] = useState(0);
  const dispatch = useAppDispatch();

  const filterOptions = [
    {
      label: "Date",
      action: () => {
        dispatch(setCurrentFilter("Date"));
        dispatch(filterTasksByDate());
      },
    },
    {
      label: "Priority",
      action: () => {
        dispatch(setCurrentFilter("Priority"));
        dispatch(filterTasksByPriority());
      },
    },
  ];

  return (
    <View className="w-full items-center flex-row">
      <CustomText styles="text-white text-xl" weight="medium">
        Filter by:
      </CustomText>
      {filterOptions.map((option, index) => (
        <RadioButton
          key={index}
          label={option.label}
          selected={index === selectedOptionIndex}
          onPress={() => {
            if (index === selectedOptionIndex) return;
            setSelected(index);
            option.action();
          }}
        />
      ))}
    </View>
  );
}
