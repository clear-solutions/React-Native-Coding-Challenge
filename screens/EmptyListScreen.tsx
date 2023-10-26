import React from "react";
import { Image, View } from "react-native";
import CustomText from "../components/CustomText";
import Shadow from "../styles/Shadow";

export default function EmptyListScreen() {
  return (
    <View className="flex-1 mb-10 w-[90%] items-center justify-center">
      <View style={[Shadow.top, {zIndex: 1}]}  className="bg-white p-1 rounded-lg mr-10 !rounded-br-none">
        <CustomText styles="text-purple" weight="medium">
          Seems like
        </CustomText>
      </View>
      <View style={Shadow.box} className="bg-white rounded-lg !rounded-tl-none p-1 ml-10 ">
        <CustomText styles="text-purple" weight="medium">
          you have no todo
        </CustomText>
      </View>
      <Image
        resizeMode="contain"
        className="max-w-full h-64"
        source={require("../assets/no-data.png")}
      />
    </View>
  );
}
