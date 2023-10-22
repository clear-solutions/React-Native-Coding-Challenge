import React, { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native";
import HomeScreen from "./screens/HomeScreen";

let customFonts = {
  "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
  "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
  "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
  "Montserrat-Light": require("./assets/fonts/Montserrat-Light.ttf")
};

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isLoaded] = useFonts(customFonts);

  const handleLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }
  
  return (
    <SafeAreaView className="flex-1  w-full bg-blue items-center justify-center" onLayout={handleLayout} >
      <HomeScreen/>
    </SafeAreaView>
  );
}