import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import React from "react";
import COLORS from "../../constants/Colors";

interface Props extends TouchableOpacityProps {
  innerIconName: string;
  styles?: string;
  innerIconSize?: number;
  bgColor: string;
  innerIconColor: string;
  size: number;
}

const CircularButton = ({
  innerIconName,
  innerIconSize,
  size,
  bgColor,
  innerIconColor,
  ...props
}: Props) => {
  return (
    <TouchableOpacity
      {...props}
      style={{ backgroundColor: bgColor, height: size }}
      className="mx-1 items-center justify-center aspect-square rounded-full"
    >
      <AntDesign
        name={innerIconName}
        size={innerIconSize ?? 25}
        color={innerIconColor ?? COLORS.purple}
      />
    </TouchableOpacity>
  );
};

export default CircularButton;
