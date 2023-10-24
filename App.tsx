import React, { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import HomeScreen from "./screens/HomeScreen";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { fetchAllTodos } from "./store/listSlice";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import AllTodosScreen from "./screens/AllTodosScreen";
import { StackParamList } from "./types";
import AddTodoModal from "./components/AddTodoModal";
import { View } from "react-native";
import Wordmark from "./components/Wordmark";
import { useAppSelector } from "./services/hooks";
import { selectIsModalOpen } from "./store/layoutSlice";

let customFonts = {
  "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
  "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
  "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
  "Montserrat-Light": require("./assets/fonts/Montserrat-Light.ttf"),
};

SplashScreen.preventAutoHideAsync();

store.dispatch(fetchAllTodos());

const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
  const [isLoaded] = useFonts(customFonts);
  //const insets = useSafeAreaInsets();

  const handleLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
      <AddTodoModal />
        <SafeAreaView className="flex-1 bg-blue" onLayout={handleLayout}>
        <View className="my-1">
          <Wordmark />
        </View>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="AllTodos" component={AllTodosScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}
