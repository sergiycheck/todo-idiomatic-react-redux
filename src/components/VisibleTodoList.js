import { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { getTodosByVisibilityFilter } from "../redux/selectors";
import { toggleTodo, filterTypes, receiveTodos } from "../redux/actionsData";

import { fetchTodos } from "../api/server";
import TodoList from "./TodoList";

const VisibleTodoList = ({ todos, filter, toggleTodo, receiveTodos }) => {
  useEffect(() => {
    async function fetchData() {
      const response = await fetchTodos(filter);
      receiveTodos(filter, response);
    }
    fetchData();
  }, [filter, receiveTodos]);
  return <TodoList todos={todos} onTodoClick={toggleTodo}></TodoList>;
};

VisibleTodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, text: PropTypes.string, completed: PropTypes.bool })
  ),
  filter: PropTypes.oneOf([...Object.values(filterTypes)]).isRequired,
  toggleTodo: PropTypes.func.isRequired,
  receiveTodos: PropTypes.func.isRequired,
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

const VisibleTodoListWithRouter = withRouter(connect(mapStateToProps, { toggleTodo, receiveTodos })(VisibleTodoList));

export default VisibleTodoListWithRouter;
