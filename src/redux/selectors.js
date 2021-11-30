export const selectTodoById = (state, todoId) => state.byId[todoId];

export const getTodosByVisibilityFilter = (state, visibilityFilter) => {
  const ids = state.idsByFilter[visibilityFilter];
  return ids.map((id) => selectTodoById(state, id));
};
