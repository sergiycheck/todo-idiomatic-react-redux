import { nanoid } from "nanoid";
import * as api from "../api/server";
import { getIsFetching } from "./todosSlice";

export const todoActionTypes = {
  ADD: "ADD",
  TOGGLE: "TOGGLE",
  SET_FILTER: "SET_FILTER",
  RECEIVE_TODOS: "RECEIVE_TODOS",
  REQUEST_TODOS: "REQUEST_TODOS",
  FAIL_TODOS: "FAIL_TODOS",
};

export const filterTypes = {
  All: "all",
  Active: "active",
  Completed: "completed",
};

export const toggleTodo = (id) => ({ type: todoActionTypes.TOGGLE, payload: id });

export const fetchTodos = (filter) => async (dispatch, getState) => {
  const currentlyProcessingARequest = Boolean(getIsFetching(getState(), filter));
  if (currentlyProcessingARequest) {
    return Promise.resolve();
  }

  dispatch({
    type: todoActionTypes.REQUEST_TODOS,
    filter,
  });

  try {
    const response = await api.fetchTodos(filter);
    return dispatch({
      type: todoActionTypes.RECEIVE_TODOS,
      filter,
      response,
    });
  } catch (error) {
    return dispatch({
      type: todoActionTypes.FAIL_TODOS,
      filter,
      message: error.message || "There an error occured",
    });
  }
};

export const addTodo = (text) => ({
  type: todoActionTypes.ADD,
  id: nanoid(),
  text,
});
