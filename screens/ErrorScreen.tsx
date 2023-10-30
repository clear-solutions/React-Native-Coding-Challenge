import { View, Text, Image } from "react-native";
import React from "react";
import CustomText from "../components/CustomText";

export default function ErrorScreen() {
  return (
    <View className="flex-1 mb-10 w-[90%] items-center justify-center">
      <View
        style={{ zIndex: 1 }}
        className="bg-white p-1 rounded-lg mr-10 !rounded-br-none"
      >
        <CustomText styles="text-purple" weight="medium">
          Oops! Seems like there is an issue
        </CustomText>
      </View>
      <View className="bg-white rounded-lg !rounded-tl-none p-1 ml-28 ">
        <CustomText styles="text-purple" weight="medium">
          maybe try again ?
        </CustomText>
      </View>
      <Image
        testID="error-image"
        resizeMode="contain"
        className="max-w-full h-64"
        source={require("../assets/have-error.png")}
      />
    </View>
  );
}
