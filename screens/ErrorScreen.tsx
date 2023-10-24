import { View, Text, Image } from 'react-native'
import React from 'react'
import CustomText from '../components/CustomText';
import Shadow from '../styles/Shadow';

export default function ErrorScreen() {
    return (
        <View className="flex-1 mb-10 w-[90%] items-center justify-center">
          <View style={[Shadow.top, {zIndex: 1}]}  className="bg-white p-1 rounded-lg mr-10 !rounded-br-none">
            <CustomText styles="text-black" weight="medium">
              Oops! Seems like there is an issue
            </CustomText>
          </View>
          <View style={Shadow.box} className="bg-white rounded-lg !rounded-tl-none p-1 ml-28 ">
            <CustomText styles="text-black" weight="medium">
              maybe try again ?
            </CustomText>
          </View>
          <Image
            resizeMode="contain"
            className="max-w-full h-64"
            source={require("../assets/have-error.png")}
          />
        </View>
      );
}