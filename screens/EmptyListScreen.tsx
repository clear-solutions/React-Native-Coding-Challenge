import React from "react";
import { Image, View } from "react-native";
import CustomText from "../components/CustomText";

export default function EmptyListScreen() {
  return (
    <View className="flex-1 mb-10 w-[90%] items-center justify-center">
      <View
        style={{ zIndex: 1 }}
        className="bg-white p-1 rounded-lg mr-10 !rounded-br-none"
      >
        <CustomText styles="text-purple" weight="medium">
          Seems like
        </CustomText>
      </View>
      <View className="bg-white rounded-lg !rounded-tl-none p-1 ml-10 ">
        <CustomText styles="text-purple" weight="medium">
          you have no todo
        </CustomText>
      </View>
      <Image
      testID="empty-list-image"
        resizeMode="contain"
        className="max-w-full h-64"
        source={require("../assets/no-data.png")}
      />
    </View>
  );
}
