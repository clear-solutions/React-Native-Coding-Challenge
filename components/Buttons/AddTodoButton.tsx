import { TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import React from "react";
import COLORS from "../../constants/Colors";
import { useAppDispatch, useCustomNavigation } from "../../services/hooks";
import { openOrCloseModal } from "../../store/layoutSlice";

const AddTodoButton = ({styles}: {styles?:string}) => {  const navigation = useCustomNavigation();
  const dispatch = useAppDispatch();

  return (
    <TouchableOpacity
      className={styles}
      onPress={() => {dispatch(openOrCloseModal("open"))}}
    >
      <AntDesign name="pluscircle" size={58} color={COLORS.white} />
    </TouchableOpacity>
  );
};

export default AddTodoButton;
