import { combineReducers } from "redux";
import todosReducer from "./todosSlice";
import { getTodosByVisibilityFilter } from "./selectors";

const rootReducer = combineReducers({
  todos: todosReducer,
});

export default rootReducer;

export const getVisibleTodos = (state, filter) => getTodosByVisibilityFilter(state.todos, filter);
