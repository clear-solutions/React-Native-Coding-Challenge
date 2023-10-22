import {FC, useEffect, useState} from 'react';

import {FlatList, View} from 'react-native';

import SafeAreaWrapper from '@/components/SafeAreaWrapper';
import TaskInput from '@/components/TaskInput';
import TaskItem from '@/components/TasksItem';
import {RootState} from '@/store';
import {deleteTodo, toggleTodo} from '@/store/todosSlice';
import {ITask} from '@/types';
import {Box} from '@/utils/theme';
import {useDispatch, useSelector} from 'react-redux';

const CompletedTask: FC = () => {
  const [filteredData, setFilteredData] = useState<ITask[]>([]);
  const [searchText, setSearchText] = useState('');

  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);

  const onSearchPress = () => {
    if (searchText.length > 2) {
      const filteredTasks = filteredData?.filter((task: ITask) =>
        task.title.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredData(filteredTasks || []);
    } else {
      setFilteredData(todos?.filter(task => task.completed) || []);
    }
  };

  const toggleTaskStatus = (taskId: number, type: 'delete' | 'toggle') => {
    if (type === 'toggle') {
      dispatch(toggleTodo({id: taskId}));
    } else {
      dispatch(deleteTodo({id: taskId}));
    }

    setFilteredData(filteredData.filter(task => task.id !== taskId));
  };

  useEffect(() => {
    const isSearchEmpty = searchText.trim().length === 0;

    const filteredTasks = todos?.filter((task: ITask) => {
      const isMatch =
        isSearchEmpty ||
        task.title.toLowerCase().includes(searchText.toLowerCase());

      return task.completed && isMatch;
    });

    setFilteredData(filteredTasks || []);
  }, [todos.length]);

  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="4">
        <Box height={26} />
        <TaskInput
          placeholder="Search..."
          buttonText="Search"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={onSearchPress}
        />

        <Box height={26} />

        <FlatList
          data={filteredData}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TaskItem task={item} toggleTaskStatus={toggleTaskStatus} />
          )}
          ItemSeparatorComponent={() => <View style={{height: 14}} />}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
        />
      </Box>
    </SafeAreaWrapper>
  );
};

export default CompletedTask;
