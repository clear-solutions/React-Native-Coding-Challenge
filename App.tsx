/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import 'react-native-get-random-values';

import RootNavigator from './src/navigation';
import ToDoProvider from './src/context/ToDosContext';

function App(): JSX.Element {
  return (
    <ToDoProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ToDoProvider>
  );
}

export default App;
