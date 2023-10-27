import { View, Text } from "react-native";
import React, { useState } from "react";
import CustomText from "./CustomText";
import RadioButton from "./Buttons/RadioButton";
import { useAppDispatch, useAppSelector } from "../services/hooks";
import {
  filterTasksByDate,
  filterTasksByPriority,
  selectCurrentFilter,
  setCurrentFilter,
} from "../store/listSlice";

export default function FilterRadioGroup() {
  const dispatch = useAppDispatch();

  const currentFilter = useAppSelector(selectCurrentFilter);
  const [selectedOption, setSelected] = useState(currentFilter);
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
          selected={option.label === selectedOption}
          onPress={() => {
            if (option.label === selectedOption) return;
            setSelected(option.label);
            option.action();
          }}
        />
      ))}
    </View>
  );
}
