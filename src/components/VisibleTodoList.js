import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getTodosByVisibilityFilter } from "../redux/selectors";
import { todoActionTypes } from "../redux/actionTypes";
import TodoList from "./TodoList";
import { filterTypes } from "../redux/actionTypes";

const mapStateToProps = (state, { match }) => ({
  todos: getTodosByVisibilityFilter(state, match.params.filter || filterTypes.All),
});

const mapDispatchToProps = (dispatch) => ({
  onTodoClick(id) {
    dispatch({ type: todoActionTypes.TOGGLE, payload: id });
  },
});

const VisibleTodoList = withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoList));

export default VisibleTodoList;
