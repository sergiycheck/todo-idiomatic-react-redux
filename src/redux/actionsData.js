import * as api from "../api/server";

export const todoActionTypes = {
  ADD: "ADD",
  TOGGLE: "TOGGLE",
  SET_FILTER: "SET_FILTER",
  RECEIVE_TODOS: "RECEIVE_TODOS",
};

export const filterTypes = {
  All: "all",
  Active: "active",
  Completed: "completed",
};

export const toggleTodo = (id) => ({ type: todoActionTypes.TOGGLE, payload: id });

const receiveTodos = (filter, response) => ({
  type: todoActionTypes.RECEIVE_TODOS,
  filter,
  response,
});

export const fetchTodos = async (filter) => {
  const response = await api.fetchTodos(filter);
  return receiveTodos(filter, response);
};