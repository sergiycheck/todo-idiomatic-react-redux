import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getTodosByVisibilityFilter } from "../redux/selectors";
import { todoActionTypes } from "../redux/actionTypes";
import TodoList from "./TodoList";
import { filterTypes } from "../redux/actionTypes";

const mapStateToProps = (state, { match }) => ({
  todos: getTodosByVisibilityFilter(state, match.params.filter || filterTypes.All),
});

//if the args passed to the callback are passed through to the action creator with the same order
// we can use shorter configuration object. Config object maps the names of the callback props
//to the corresponding action creator function

export const toggleTodo = (id) => ({ type: todoActionTypes.TOGGLE, payload: id });

const VisibleTodoList = withRouter(connect(mapStateToProps, { onTodoClick: toggleTodo })(TodoList));

export default VisibleTodoList;
