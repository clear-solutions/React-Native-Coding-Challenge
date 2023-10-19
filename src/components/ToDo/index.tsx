import React, {useState} from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import ToDoUncompleted from './ToDoUncompleted';
import ToDoCompleted from './ToDoCompleted';
import {View} from 'react-native';

const renderTabBar = (props: any) => {
  return (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: '#464033'}}
      style={{backgroundColor: '#B1B1B1', height: 100}}
    />
  );
};

const Todo = () => {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {key: 'uncompleted', name: 'UncompletedToDos'},
    {key: 'completed', name: 'CompletedToDos'},
  ]);

  const renderScene = SceneMap({
    uncompleted: ToDoUncompleted,
    completed: ToDoCompleted,
  });
  return (
    <View className="flex-1">
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

export default Todo;
