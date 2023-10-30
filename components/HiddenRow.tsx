import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CircularButton from "./Buttons/CircularButton";
import COLORS from "../constants/Colors";
import { RowMap } from "react-native-swipe-list-view";
import { ITodo } from "../types";
import { useAppDispatch } from "../services/hooks";
import {
  deleteTodo,
  markAsCompleted,
  markAsUncompleted,
  setEditingTodoIndex,
} from "../store/listSlice";
import { setModalOpen } from "../store/layoutSlice";
import LIST from "../constants/List";

export default function HiddenRow({
  rowIndex,
  listTitle,
}: {
  rowMap: RowMap<ITodo>;
  rowIndex: number;
  listTitle: LIST;
}) {
  const dispatch = useAppDispatch();

  const deleteRow = () => {
    dispatch(deleteTodo({ index: rowIndex, listTitle }));
  };
  const editTodo = () => {
    dispatch(setEditingTodoIndex(rowIndex));
    dispatch(setModalOpen(true));
  };
  const completeTodo = () => {
    dispatch(markAsCompleted(rowIndex));
    deleteRow();
  };
  const undoneTodo = () => {
    dispatch(markAsUncompleted(rowIndex));
    deleteRow();
  }

  return (
    <View className="items-center w-full h-full justify-end flex-row">
      <CircularButton
        onPress={deleteRow}
        size={42}
        bgColor={COLORS.primaryRed}
        innerIconName="close"
        innerIconColor={COLORS.purple}
      />
      {listTitle === LIST.FINISHED && (
        <CircularButton
          size={42}
          bgColor={COLORS.primaryOrange}
          onPress={undoneTodo}
          innerIconName="totop"
          innerIconColor={COLORS.purple}
        />
      )}
      {listTitle === LIST.ONGOING && (
        <CircularButton
          size={42}
          bgColor={COLORS.gray}
          onPress={editTodo}
          innerIconName="edit"
          innerIconColor={COLORS.purple}
        />
      )}
      {listTitle === LIST.ONGOING && (
        <CircularButton
          size={42}
          bgColor={COLORS.primaryGreen}
          onPress={completeTodo}
          innerIconName="check"
          innerIconColor={COLORS.purple}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
