import { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getTodosByVisibilityFilter } from "../redux/selectors";
import { todoActionTypes } from "../redux/actionTypes";
import { filterTypes } from "../redux/actionTypes";

import { fetchTodos } from "../api/server";
import TodoList from "./TodoList";

const VisibleTodoList = ({ todos, filter, onTodoClick }) => {
  useEffect(() => {
    async function fetchData() {
      const response = await fetchTodos(filter);
      console.log("response \n ", response);
    }
    fetchData();
  }, [filter]);
  return <TodoList todos={todos} onTodoClick={onTodoClick}></TodoList>;
};

const mapStateToProps = (state, { match }) => {
  let filter = match.params.filter || filterTypes.All;
  if (!Object.values(filterTypes).includes(filter.toLowerCase())) filter = filterTypes.All;

  return {
    todos: getTodosByVisibilityFilter(state, filter),
    filter,
  };
};

//if the args passed to the callback are passed through to the action creator with the same order
// we can use shorter configuration object. Config object maps the names of the callback props
//to the corresponding action creator function

export const toggleTodo = (id) => ({ type: todoActionTypes.TOGGLE, payload: id });

const VisibleTodoListWithRouter = withRouter(connect(mapStateToProps, { onTodoClick: toggleTodo })(VisibleTodoList));

export default VisibleTodoListWithRouter;
