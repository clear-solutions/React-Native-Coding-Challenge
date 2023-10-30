import LIST from "../constants/List";
import { ITodo } from "../types";
import { faker } from '@faker-js/faker';

function generateRandomTodo(isCompleted: boolean): ITodo {
  return {
    id: faker.number.int(),
    title: faker.lorem.words(5),
    completed: isCompleted ? true : false,
    priorityTier: faker.number.int({ min: 0, max: 2 }),
    creationDate: faker.date.recent().getTime(),
  };
}

export function generateTasks(count: number, listType: LIST): ITodo[] {
  const todos: ITodo[] = [];
  for (let i = 0; i < count; i++) {
    todos.push(generateRandomTodo(listType === LIST.FINISHED));
  }
  return todos;
}
