import { TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import React from "react";
import Shadow from "../../styles/Shadow";
import COLORS from "../../constants/Colors";

const AddTodoButton = () => {
  return (
    <TouchableOpacity
      onPress={() => {}}
      style={Shadow.box}
      //className="rounded-full h-16 w-16 p-0 items-center self-center text-center content-center justify-center bg-white"
    >
      <AntDesign name="pluscircle" size={64} color={COLORS.white} />
    </TouchableOpacity>
  );
};

export default AddTodoButton;
