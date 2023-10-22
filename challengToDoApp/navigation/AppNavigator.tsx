import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UncompletedTodosScreen from "../screens/UncompletedTodosScreen";
import CompletedTodosScreen from "../screens/CompletedScreen";
import { Ionicons } from "@expo/vector-icons"; // Import icons from Expo Vector Icons

const Tab = createBottomTabNavigator();

const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 24,
        },
        headerTitleAlign: "center"
        
      }}
    >
      <Tab.Screen
        name="Uncompleted"
        component={UncompletedTodosScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-list" size={size} color={color} /> // Replace with your preferred icon
          ),
        }}
      />
      <Tab.Screen
        name="Completed"
        component={CompletedTodosScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-checkmark-circle" size={size} color={color} /> // Replace with your preferred icon
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
