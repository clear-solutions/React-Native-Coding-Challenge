// App.tsx or your app's entry point
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FlashMessage from "react-native-flash-message";
import { MyContextProvider } from "./context/MyContextProvider";
import AppNavigator from "./navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";

function App() {
  return (
    <SafeAreaProvider>
      <MyContextProvider>
        <NavigationContainer>
          <AppNavigator />
          <FlashMessage position="top" />
        </NavigationContainer>
      </MyContextProvider>
    </SafeAreaProvider>
  );
}

export default App;
