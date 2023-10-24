import React from "react";
import { View } from "react-native";
import Wordmark from "../components/Wordmark";

// I could add a new custom loading indicator here, but because of limited time I didn't consider
// Also I think it looks quite good with Wordmark as well, I am planning to add animation if time lets me 

export default function LoadingScreen() {
  return (
    <View className="flex-1  w-full bg-blue items-center justify-center">
      <Wordmark />
    </View>
  );
}
