import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Navbar } from "./src/Navbar";
import { AddTodo } from "./src/AddTodo";
import { Todo } from "./src/Todo";

export default function App() {
  const [todos, setTodos] = useState([
    {id: 1, title: 'test'},
    {id: 2, title: 'test'},
    {id: 3, title: 'test'},
    {id: 4, title: 'test'},
    {id: 5, title: 'test'},
    {id: 6, title: 'test'},
    {id: 7, title: 'test'},
    {id: 8, title: 'test'}
  ]);

  const addTodo = title => {
    // const newTodo = {
    //   id: Date.now().toString(),
    //   title: title
    // }

    // setTodos(todos.concat([newTodo]))
    // setTodos((prevTodos) => {
    //   return [
    //     ...prevTodos,
    //     newTodo
    //   ]
    // })
    setTodos(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        title
      }
    ]);
  };

  return (
    <View>
      <Navbar title="Todo App!" />
      <ScrollView style={styles.container}>
        <AddTodo onSubmit={addTodo} />

        <View>
          {todos.map(todo => (
            <Todo todo={todo} key={todo.id} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20
  }
});
