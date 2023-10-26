import { ITodo } from "../types";

export const visibleTodos = (
  displayedList: ITodo[],
  secondListSize: number
) => {
  return secondListSize > 0
    ? {
        list: displayedList.slice(0, 4),
        totalUnvisible: displayedList.length - 4,
      }
    : {
        list: displayedList.slice(0, 8),
        totalUnvisible: displayedList.length - 8,
      };
};

export const sortByCreationDate = (data: ITodo[]) => {
  const newData = [...data];
  return newData.sort(
    (a, b) => b.creationDate - a.creationDate
  );
};

export const sortByPriority = (data: ITodo[]) => {
  const newData = [...data]; 
  return newData.sort((a, b) => b.priorityTier - a.priorityTier);
};

export const addTodoOnPriorityFilter = (data: ITodo[], todo: ITodo) => {
  const newData = [...data];
  for (let i = 0; i < newData.length; i++) {
    if (newData[i].priorityTier <= todo.priorityTier) {
      newData.splice(i, 0, todo);
      return newData;
    }
  }
  newData.unshift(todo); 
}

export const deleteTodoFunction = (data: ITodo[], index:number) => {
  const newData = [...data];
  newData.splice(index, 1);
  return newData;
}


export const getNewTodo = (title:string, priorityTier:number):ITodo => {
  const date = new Date();

  return {
    title: title,
    id: Math.ceil(Math.random() * 1000),
    completed: false,
    creationDate: date.getTime(),
    priorityTier: priorityTier,
  };
}
