import React from "react";
import { Text, ViewStyle, TextStyle, TextProps } from "react-native";

interface ICustomText extends TextProps {
  children: string | string[] | JSX.Element;
  styles?: string;
  weight?: string;
}

export default function CustomText({
  children,
  styles,
  weight,
  ...props
}: ICustomText) {
  switch (weight) {
    case "bold":
      return (
        <Text
          {...props}
          className={styles}
          style={[{ fontFamily: "Montserrat-Bold" }]}
        >
          {children}
        </Text>
      );
    case "medium":
      return (
        <Text
          {...props}
          className={styles}
          style={[{ fontFamily: "Montserrat-Medium" }]}
        >
          {children}
        </Text>
      );
    case "light":
      return (
        <Text
          {...props}
          className={styles}
          style={[{ fontFamily: "Montserrat-Light" }]}
        >
          {children}
        </Text>
      );
    default:
      return (
        <Text
          {...props}
          className={styles}
          style={[{ fontFamily: "Montserrat-Regular" }]}
        >
          {children}
        </Text>
      );
  }
}
