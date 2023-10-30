import { View, Text } from "react-native";
import React, { useState,useEffect } from "react";
import CustomText from "./CustomText";
import {
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import CustomButton from "./Buttons/CustomButton";
import PriorityBadge from "./Buttons/PriorityBadge";
import { Priorities } from "../constants/Priorities";
import { useAppDispatch, useAppSelector } from "../services/hooks";
import { setModalOpen, selectIsModalOpen } from "../store/layoutSlice";
import { createNewTodo, selectEditingTodoIndex, selectOngoingTasks, setEditingTodoIndex, updateTodo } from "../store/listSlice";
import { getNewTodo } from "../services/utils";

export default function AddTodoModal() {
  const [chosenPriority, setPriority] = useState(0);
  const [isEditing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const isModalOpen = useAppSelector(selectIsModalOpen);
  const tasks = useAppSelector(selectOngoingTasks);
  const editingIndex = useAppSelector(selectEditingTodoIndex);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (editingIndex === null) return;
    const {title, priorityTier} = tasks[editingIndex];
    setEditing(true);
    setTitle(title);
    setPriority(priorityTier);
    setError(error);
  }, [editingIndex])

  const close = () => {
    setTitle("");
    setError("");
    setPriority(0);
    setEditing(false);
    Keyboard.dismiss();
    dispatch(setEditingTodoIndex(null));
    dispatch(setModalOpen(false));
  }

  const handleUpdateTodo = () => {
    const todo = getNewTodo(title, chosenPriority);
    dispatch(updateTodo(todo));
    close();
  }

  const handleCreateNewTodo = () => {
    if (!title) {
      setError("Please enter a title to procced");
      return;
    }
    const todo = getNewTodo(title, Priorities[chosenPriority].tier);
    dispatch(createNewTodo(todo));
    close();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className={`w-full bg-[#0000007e] items-center justify-center h-full z-[100] flex-1 ${
        isModalOpen ? "absolute" : "hidden"
      }`}
    >
      <View className="bg-white w-[85%] h-[256px] items-center justify-between  rounded-lg p-5">
        <CustomText weight="medium" styles="text-xl">
          Create new to-do
        </CustomText>
        {error && (
          <CustomText styles={`text-md`}>
            Please enter a title to procced
          </CustomText>
        )}
        <TextInput
          value={title}
          onChangeText={(text) => setTitle(text)}
          className="w-full h-10 mt-2 p-2 text-[20px] rounded-md border-[#d4d3d3] items-center justify-center border"
        />
        <View className="flex-row justify-between items-center w-full">
          {Priorities.map((option, index) => (
            <PriorityBadge
              onPress={() => setPriority(option.tier)}
              {...option}
              isChosen={chosenPriority === option.tier}
              key={index}
            />
          ))}
        </View>
        <View className="flex-row">
          <CustomButton
            onPress={close}
            styles="bg-[#94a3b8] flex-1 p-3 items-center justify-center rounded-md mr-1"
            textStyle="text-white text-md"
          >
            Cancel
          </CustomButton>
          <CustomButton
            onPress={isEditing ?handleUpdateTodo : handleCreateNewTodo}
            styles="bg-[#14b8a6] flex-1 p-3 items-center justify-center  rounded-md ml-1"
            textStyle="text-white text-md"
          >
            {isEditing ? "Update" : "Create"}
          </CustomButton>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
