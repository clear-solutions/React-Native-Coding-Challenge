import COLORS from "../../constants/Colors";
import LIST from "../../constants/List";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { setSelecting } from "../../store/layoutSlice";
import {
  clearSelections,
  deleteTodo,
  markAsCompleted,
  markAsUncompleted,
  selectSelectedCompleted,
  selectSelectedOngoing,
} from "../../store/listSlice";
import CircularButton from "./CircularButton";
import React from "react";

const closeSelection = (dispatch: Function) => {
  dispatch(setSelecting(false));
  dispatch(clearSelections());
};

export const CloseSelectionButton = () => {
  const dispatch = useAppDispatch();

  return (
    <CircularButton
      onPress={() => closeSelection(dispatch)}
      bgColor={COLORS.gray}
      innerIconColor={COLORS.purple}
      size={58}
      innerIconSize={36}
      innerIconName="back"
    />
  );
};

export const ActivateSelectionButton = () => {
  const dispatch = useAppDispatch();

  return (
    <CircularButton
      onPress={() => {
        dispatch(setSelecting(true));
      }}
      bgColor={COLORS.white}
      innerIconColor={COLORS.purple}
      size={58}
      innerIconSize={36}
      innerIconName="bars"
    />
  );
};

export const MarkAllUncompletedButton = () => {
  const dispatch = useAppDispatch();
  const selectedCompletedTasks = useAppSelector(selectSelectedCompleted);

  const markSelectionsUncompleted = () => {
    selectedCompletedTasks.forEach((taskIndex) => {
      dispatch(markAsUncompleted(taskIndex));
      dispatch(deleteTodo({ index: taskIndex, listTitle: LIST.FINISHED }));
    });

    closeSelection(dispatch);
  };

  return (
    <CircularButton
      bgColor={COLORS.primaryRed}
      innerIconColor={COLORS.purple}
      onPress={markSelectionsUncompleted}
      size={58}
      innerIconSize={36}
      innerIconName="totop"
    />
  );
};

export const MarkAllCompletedButton = () => {
    const dispatch = useAppDispatch();
    const selectedOngoingTasks = useAppSelector(selectSelectedOngoing);
  
    const markSelectionsCompleted = () => {
        selectedOngoingTasks.forEach((taskIndex) => {
          dispatch(markAsCompleted(taskIndex));
          dispatch(deleteTodo({ index: taskIndex, listTitle: LIST.ONGOING }));
        });
        closeSelection(dispatch);
      };
  
    return (
        <CircularButton
        bgColor={COLORS.primaryGreen}
        innerIconColor={COLORS.purple}
        size={58}
        onPress={markSelectionsCompleted}
        innerIconSize={36}
        innerIconName="check"
      />
    );
  };
  