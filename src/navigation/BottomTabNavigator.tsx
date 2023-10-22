import CompletedTask from '@/screens/CompletedScreen';
import HomeScreen from '@/screens/HomeScreen';
import {Entypo, MaterialIcons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FC} from 'react';

const Tab = createBottomTabNavigator();

const BottomTabNavigator: FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: {
          backgroundColor: '#181818',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Entypo name="home" size={focused ? 30 : 25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CompletedTask"
        component={CompletedTask}
        options={{
          tabBarIcon: ({focused, color}) => (
            <MaterialIcons
              name="done-outline"
              size={focused ? 30 : 25}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
