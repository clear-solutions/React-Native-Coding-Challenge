import { View, Text } from "react-native";
import React, { useState } from "react";
import CustomText from "./CustomText";
import { TextInput } from "react-native";
import CustomButton from "./Buttons/CustomButton";
import PriorityBadge from "./Buttons/PriorityBadge";
import { Priorities } from "../constants/Priorities";
import { useAppDispatch, useAppSelector } from "../services/hooks";
import { openOrCloseModal, selectIsModalOpen } from "../store/layoutSlice";

export default function AddTodoModal() {
  const [chosenPriority, setPriority] = useState(0);
  const isModalOpen = useAppSelector(selectIsModalOpen);
  const dispatch = useAppDispatch();

  return (
    <View
      className={`w-full bg-[#0000007e] items-center justify-center h-full z-[100] flex-1 ${
        isModalOpen ? "absolute" : "hidden"
      }`}
    >
      <View className="bg-white w-[85%] h-[256px] items-center justify-between  rounded-lg p-5">
        <CustomText weight="medium" styles={"text-xl"}>
          Create new to-do
        </CustomText>
        <TextInput className="w-full h-10 mt-4 p-2 text-[20px] rounded-md border-[#d4d3d3] items-center justify-center border " />
        <View className="flex-row justify-between items-center w-full">
          {Priorities.map((option, index) => (
            <PriorityBadge
              onPress={() => setPriority(index)}
              {...option}
              isChosen={chosenPriority === index}
              key={index}
            />
          ))}
        </View>
        <View className="flex-row">
          <CustomButton
            onPress={() => {
              dispatch(openOrCloseModal("close"));
            }}
            styles="bg-[#999999] flex-1 p-3 items-center justify-center rounded-md mr-1"
            textStyle="text-white text-md"
          >
            Cancel
          </CustomButton>
          <CustomButton
            styles="bg-blue flex-1 p-3 items-center justify-center  rounded-md ml-1"
            textStyle="text-white text-md"
          >
            Create
          </CustomButton>
        </View>
      </View>
    </View>
  );
}
