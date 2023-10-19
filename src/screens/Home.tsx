import React from 'react';
import {View} from 'react-native';
import Todo from '../components/ToDo';

const Home = () => {
  return (
    <View className="flex-1">
      <Todo />
    </View>
  );
};

export default Home;
