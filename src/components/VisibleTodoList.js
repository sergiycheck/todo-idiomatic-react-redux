import { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { getVisibleTodos, getIsFetching } from "../redux/todosSlice";
import { toggleTodo, filterTypes, fetchTodos, requestTodos } from "../redux/actionsData";
import TodoList from "./TodoList";

const VisibleTodoList = ({ todos, isFetching, requestTodos, filter, toggleTodo, fetchTodos }) => {
  useEffect(() => {
    async function fetchData() {
      requestTodos(filter);
      fetchTodos(filter);
    }
    fetchData();
  }, [filter, fetchTodos, requestTodos]);

  if (isFetching && !todos.length) {
    return <p>Loading...</p>;
  }

  return <TodoList todos={todos} onTodoClick={toggleTodo}></TodoList>;
};

VisibleTodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, text: PropTypes.string, completed: PropTypes.bool })
  ),
  filter: PropTypes.oneOf([...Object.values(filterTypes)]).isRequired,
  toggleTodo: PropTypes.func.isRequired,
  fetchTodos: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { match }) => {
  let filter = match.params.filter || filterTypes.All;
  if (!Object.values(filterTypes).includes(filter.toLowerCase())) filter = filterTypes.All;

  return {
    todos: getVisibleTodos(state, filter),
    isFetching: getIsFetching(state, filter),
    filter,
  };
};

//if the args passed to the callback are passed through to the action creator with the same order
// we can use shorter configuration object. Config object maps the names of the callback props
//to the corresponding action creator function

const VisibleTodoListWithRouter = withRouter(
  connect(mapStateToProps, { toggleTodo, fetchTodos, requestTodos })(VisibleTodoList)
);

export default VisibleTodoListWithRouter;
