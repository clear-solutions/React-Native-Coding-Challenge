import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CircularButton from "./Buttons/CircularButton";
import COLORS from "../constants/Colors";
import { RowMap } from "react-native-swipe-list-view";
import { ITodo } from "../types";
import { useAppDispatch } from "../services/hooks";
import { deleteTodo, setEditingTodoIndex } from "../store/listSlice";
import { openOrCloseModal } from "../store/layoutSlice";

export default function HiddenRow({
  rowMap,
  rowIndex,
  listTitle,
}: {
  rowMap: RowMap<ITodo>;
  rowIndex: number;
  listTitle: string;
}) {
  const dispatch = useAppDispatch();
  const closeRow = () => {
    if (rowMap[rowIndex]) {
      rowMap[rowIndex].closeRow();
    }
  };
  const deleteRow = () => {
    dispatch(deleteTodo({ index: rowIndex, listTitle }));
  };
  const editTodo = () => {
    dispatch(setEditingTodoIndex(rowIndex));
    dispatch(openOrCloseModal("open"));
  }

  return (
    <View className="items-center w-full h-full justify-end flex-row">
      {listTitle === "ONGOING" && <CircularButton
        size={42}
        bgColor={COLORS.gray}
        onPress={editTodo}
        innerIconName="edit"
        innerIconColor={COLORS.purple}
      />}
      <CircularButton
        onPress={deleteRow}
        size={42}
        bgColor={COLORS.primaryRed}
        innerIconName="close"
        innerIconColor={COLORS.purple}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
