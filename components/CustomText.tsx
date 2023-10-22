import React from "react";
import { Text, ViewStyle, TextStyle } from "react-native";

interface ICustomText {
  children: string | JSX.Element;
  styles?: string;
  weight?: string;
}

export default function CustomText({
  children,
  styles,
  weight,
}: ICustomText) {
  switch (weight) {
    case "bold":
      return (
        <Text
          className={styles}
          style={[{ fontFamily: "Montserrat-Bold" }]}
        >
          {children}
        </Text>
      );
    case "medium":
      return (
        <Text
          className={styles}
          style={[{ fontFamily: "Montserrat-Medium" }]}
        >
          {children}
        </Text>
      );
    case "light":
      return (
        <Text
          className={styles}
          style={[{ fontFamily: "Montserrat-Light" }]}
        >
          {children}
        </Text>
      );
    default:
      return (
        <Text
          className={styles}
          style={[{ fontFamily: "Montserrat-Regular" }]}
        >
          {children}
        </Text>
      );
  }
}
