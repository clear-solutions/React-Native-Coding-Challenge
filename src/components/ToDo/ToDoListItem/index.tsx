import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ToDo} from '../../../types';
import {useToDos} from '../../../context/ToDosContext';

interface Props {
  todo: ToDo;
  listType: 'completed' | 'uncompleted';
}

const ToDoListItem: React.FC<Props> = ({todo, listType}) => {
  const {toggleTodoSelection} = useToDos();
  const {title, id} = todo;
  const [checked, setChecked] = useState<boolean>(false);
  const checkStyle = checked ? 'bg-white' : '';

  return (
    <View className="flex-row items-center bg-gray-400 p-4 rounded-lg m-2 shadow-2xl">
      <TouchableOpacity
        onPress={() => {
          setChecked(prev => !prev);
          toggleTodoSelection(id, listType);
        }}
        className="w-6 h-6 border-2 border-gray-300 mr-3 justify-center items-center">
        <View className={`w-4 h-4 ${checkStyle}`} />
      </TouchableOpacity>
      <Text className="">{title}</Text>
    </View>
  );
};

export default ToDoListItem;
