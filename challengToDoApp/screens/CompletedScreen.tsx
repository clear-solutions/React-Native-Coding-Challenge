// CompletedTodosScreen.tsx
import React from 'react';
import ToDoList from '../components/ToDoList';

const CompletedTodosScreen: React.FC = () => {
  return <ToDoList filterCompleted={true} />;
};


export default CompletedTodosScreen;
