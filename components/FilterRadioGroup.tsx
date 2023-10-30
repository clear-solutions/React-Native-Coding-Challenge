import { View } from "react-native";
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
import FILTERS from "../constants/Filters";

export default function FilterRadioGroup() {
  const dispatch = useAppDispatch();
  const currentFilter = useAppSelector(selectCurrentFilter);
  const [selectedOption, setSelected] = useState<FILTERS>(currentFilter);

  const filterOptions = [
    {
      label: FILTERS.DATE,
      action: () => {
        dispatch(setCurrentFilter(FILTERS.DATE));
        dispatch(filterTasksByDate());
      },
    },
    {
      label: FILTERS.PRIORITY,
      action: () => {
        dispatch(setCurrentFilter(FILTERS.PRIORITY));
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
