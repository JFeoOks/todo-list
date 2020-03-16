import React, { useContext, useReducer } from "react";
import { Alert } from "react-native";
import { TodoContext } from "./TodoContext";
import { todoReducer } from "./todoReducer";
import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ERROR,
  CLEAR_ERROR,
  FETCH_TODOS
} from "../types";
import { ScreenContext } from "../screen/screenContext";
import {Http} from "../../http";

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null
  };

  const { changeScreen } = useContext(ScreenContext);

  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = async title => {
    const data = await Http.post("https://rn-todo-app-cf75f.firebaseio.com/todos.json", {title});
    dispatch({ type: ADD_TODO, title, id: data.name });
  };

  const removeTodo = id => {
    const todo = state.todos.find(todo => todo.id === id);
    Alert.alert(
      "Удаление элемента",
      `Вы уверены, что хотите удалить  ${todo.title}`,
      [
        {
          text: "Отмена",
          style: "cancel"
        },
        {
          text: "Удалить",
          onPress: async () => {
            changeScreen(null);
            await Http.delete(`https://rn-todo-app-cf75f.firebaseio.com/todos/${id}.json`);
            dispatch({ type: REMOVE_TODO, id });
          },
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  };

  const fetchTodos = async () => {
    showLoader();
    clearError();
    try {
      let data = await Http.get("https://rn-todo-app-cf75f.firebaseio.com/todos.json");
      if (!data){
        data = {};
      }
      const todos = Object.keys(data).map(key => ({ ...data[key], id: key }));
      dispatch({ type: FETCH_TODOS, todos });
    } catch (e) {
      showError("Что-то пошло не так...");
      console.log(e);
    } finally {
      hideLoader();
    }
  };

  const updateTodo = async (id, title) => {
    clearError();
    try {
      await  Http.patch(`https://rn-todo-app-cf75f.firebaseio.com/todos/${id}.json`, {title});
      dispatch({ type: UPDATE_TODO, id, title });
    } catch (e) {
      showError("Что-то пошло не так...");
      console.log(e);
    }
  };

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const hideLoader = () => dispatch({ type: HIDE_LOADER });

  const showError = error => dispatch({ type: SHOW_ERROR, error });

  const clearError = () => dispatch({ type: CLEAR_ERROR });

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        fetchTodos,
        updateTodo
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
