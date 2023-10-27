import { useNavigation } from "@react-navigation/native";
import { CustomNavigationProps } from "../types";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";

export const useCustomNavigation = () => {
  const navigation = useNavigation<CustomNavigationProps>();

  const navigate = (screenName: string, params?: Record<string, any>) => navigation.navigate(screenName, params);

  return { navigate };
};

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
