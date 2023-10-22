import {FC, useEffect, useState} from 'react';

import {FlatList, View} from 'react-native';

import Greeting from '@/components/Greeting';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';
import TaskInput from '@/components/TaskInput';
import TaskItem from '@/components/TasksItem';
import {AppDispatch, RootState} from '@/store';
import {
  addTodo,
  deleteTodo,
  fetchInitialData,
  toggleTodo,
} from '@/store/todosSlice';
import {ITask} from '@/types';
import {getRandomFloat} from '@/utils/helpers/randomizer';
import {Box} from '@/utils/theme';
import {useDispatch, useSelector} from 'react-redux';

const HomeScreen: FC = () => {
  const [task, setTask] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchInitialData());
  }, []);

  const onAdd = () => {
    if (task.trim() !== '') {
      const newTaskData: ITask = {
        userId: 10,
        id: getRandomFloat(200, 300),
        title: task,
        completed: false,
      };
      console.log('New task added:', newTaskData);
      dispatch(addTodo(newTaskData));

      setTask('');
    }
  };

  const todos = useSelector((state: RootState) => state.todos);

  const toggleTaskStatus = (taskId: number, type: 'delete' | 'toggle') => {
    if (type === 'toggle') {
      dispatch(toggleTodo({id: taskId}));
    } else {
      dispatch(deleteTodo({id: taskId}));
    }
  };

  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="4">
        <Greeting />
        <Box height={26} />

        <TaskInput
          placeholder="Create a new task"
          buttonText="Add new Task"
          value={task}
          onChangeText={setTask}
          onSubmitEditing={onAdd}
        />

        <Box height={26} />

        <FlatList
          data={todos}
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

export default HomeScreen;
