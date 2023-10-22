import React from "react";
import { View, StyleSheet } from "react-native";
import CustomText from "./CustomText";

const Wordmark = () => {
  return (
    <View className="w-full items-center justify-center text-center">
      <CustomText weight="bold" styles="tracking-[4px] text-2xl text-white">TODO MANAGER</CustomText>
    </View>
  );
};


export default Wordmark;
