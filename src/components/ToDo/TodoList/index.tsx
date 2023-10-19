import React from 'react';
import {FlatList, View} from 'react-native';
import {ToDo} from '../../../types';
import ToDoListItem from '../ToDoListItem';

interface Props {
  todos: ToDo[];
  listType: 'completed' | 'uncompleted';
}

const ToDoList: React.FC<Props> = ({todos, listType}) => {
  return (
    <View className="flex-1">
      <FlatList
        data={todos}
        renderItem={({item}) => (
          <ToDoListItem listType={listType} todo={item} />
        )}
      />
    </View>
  );
};

export default ToDoList;
