import { useNavigation } from "@react-navigation/native";
import { CustomNavigationProps, ITodo } from "../types";

export const visibleTodos = (
  displayedList: ITodo[],
  secondListSize: number
) => {
  return secondListSize > 0
    ? {
        list: displayedList.slice(0, 4),
        totalUnvisible: displayedList.length - 4,
      }
    : {
        list: displayedList.slice(0, 8),
        totalUnvisible: displayedList.length - 8,
      };
};

