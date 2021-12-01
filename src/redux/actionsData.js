import { nanoid } from "nanoid";
import * as api from "../api/server";
import { getIsFetching } from "./todosSlice";

export const todoActionTypes = {
  ADD: "ADD",
  TOGGLE: "TOGGLE",
  SET_FILTER: "SET_FILTER",
  RECEIVE_TODOS: "RECEIVE_TODOS",
  REQUEST_TODOS: "REQUEST_TODOS",
};

export const filterTypes = {
  All: "all",
  Active: "active",
  Completed: "completed",
};

export const toggleTodo = (id) => ({ type: todoActionTypes.TOGGLE, payload: id });

const requestTodos = (filter) => ({
  type: todoActionTypes.REQUEST_TODOS,
  filter,
});

const receiveTodos = (filter, response) => ({
  type: todoActionTypes.RECEIVE_TODOS,
  filter,
  response,
});

export const fetchTodos = (filter) => async (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return;
  }

  dispatch(requestTodos(filter));

  const response = await api.fetchTodos(filter);
  return dispatch(receiveTodos(filter, response));
};

export const addTodo = (text) => ({
  type: todoActionTypes.ADD,
  id: nanoid(),
  text,
});
