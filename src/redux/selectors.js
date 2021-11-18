import { createSelector } from "reselect";
import { filterTypes } from "./actionTypes";

export const selectTodoEntities = (state) => state.todos.entities;

export const selectTodos = createSelector(selectTodoEntities, (entities) => Object.values(entities));

export const selectTodoById = (state, todoId) => selectTodoEntities(state)[todoId];

export const getTodosByVisibilityFilter = (state, visibilityFilter) => {
  const allTodos = selectTodos(state);
  switch (visibilityFilter) {
    case filterTypes.Completed:
      return allTodos.filter((todo) => todo.completed);
    case filterTypes.Active:
      return allTodos.filter((todo) => !todo.completed);
    case filterTypes.All:
    default:
      return allTodos;
  }
};

//all selectors use todos to get theirs data
