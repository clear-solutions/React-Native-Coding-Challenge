import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface Button extends TouchableOpacityProps {
  children: string | JSX.Element | JSX.Element[];
  styles?: string;
  textStyle?: string;
}

export default function Button({ children, styles, textStyle, onPress }: Button) {
  return (
    <TouchableOpacity onPress={onPress} className={styles}>
      <Text className={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
}
