import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useMyContext } from "../context/MyContextProvider";
import TodoItem from "./TodoItem";
import SearchInput from "react-native-search-filter";

interface TodoListScreenProps {
  filterCompleted: boolean;
  isSearchIconVisible?: boolean;
}

const ToDoList: React.FC<TodoListScreenProps> = ({
  filterCompleted,
  isSearchIconVisible = false,
}) => {
  const { todos, completeTodo, uncompleteTodo, removeTodo, addTodo } =
    useMyContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [newTodoText, setNewTodoText] = useState("");

  const todosToDisplay = todos.filter(
    (todo) => todo.completed === filterCompleted
  );

  useEffect(() => {
    if (!filterCompleted) {
      setSearchTerm("");
    }
  }, [isSearchIconVisible]);

  const handleToggleTodo = (todoId: number) => {
    if (filterCompleted) {
      uncompleteTodo(todoId);
    } else {
      completeTodo(todoId);
    }
  };

  const handleDeleteTodo = (todoId: number) => {
    removeTodo(todoId);
  };

  const handleAddTodo = () => {
    if (newTodoText) {
      addTodo({
        userId: 1, // Replace with the appropriate user ID
        id: Math.floor(Math.random() * 100000), // Generate a unique ID
        title: newTodoText,
        completed: false,
      });
      setNewTodoText(""); // Clear the input field
    }
  };

  return (
    <View style={styles.container}>
      {(isSearchIconVisible || filterCompleted) && (
        <SearchInput
          inputViewStyles={styles.searchInput}
          onChangeText={(term: string) => setSearchTerm(term)}
          placeholder={`Search ${
            filterCompleted ? "completed" : "uncompleted"
          } todos`}
        />
      )}

      {!filterCompleted && !isSearchIconVisible && (
        <View style={styles.addTodoContainer}>
          <TextInput
            style={styles.addTodoInput}
            placeholder="Add a new todo"
            value={newTodoText}
            onChangeText={setNewTodoText}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
            <Text style={styles.addButtonLabel}>Add</Text>
          </TouchableOpacity>
        </View>
      )}

      {todosToDisplay.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.noTodosMessage}>No todos to display</Text>
        </View>
      ) : (
        <FlatList
          data={todosToDisplay.filter((todo) => {
            // Apply filtering after three or more characters are entered
            if (searchTerm.length >= 3) {
              return todo.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            }
            return true; // No filter applied if less than three characters
          })}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TodoItem
              todo={item}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "95%",
    alignSelf: "center",
  },
  searchInput: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "blue",
    marginVertical: 20,
  },
  noTodosMessage: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  addTodoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  addTodoInput: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "blue",
    marginVertical: 20,
  },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  addButtonLabel: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ToDoList;
