import { GestureResponderEvent, KeyboardAvoidingView, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import COLORS from "../constants/Colors";

export default function SearchBar({
  input,
  close,
  setInput,
}: {
  input: string;
  close: (event: GestureResponderEvent) => void;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <KeyboardAvoidingView className="mt-2 bg-white mx-3 h-16 items-center justify-between flex-row mb-1 rounded-lg px-2">
      <TextInput
        onChangeText={(text) => setInput(text)}
        autoFocus
        style={{ fontFamily: "Montserrat-Regular" }}
        className="border-purple flex-1 text-lg text-purple px-2 h-12 border-2 mr-3 justify-center items-center rounded-lg "
      />
      <TouchableOpacity onPress={close} className="bg-red w-14 h-12 items-center justify-center rounded-lg ">
        <AntDesign size={28} name="close" color={COLORS.white} />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
