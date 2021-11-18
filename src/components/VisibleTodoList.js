import { connect } from "react-redux";
import { getTodosByVisibilityFilter } from "../redux/selectors";
import { todoActionTypes } from "../redux/actionTypes";
import TodoList from "./TodoList";

const mapStateToProps = (state, ownProps) => ({
  todos: getTodosByVisibilityFilter(state, ownProps.filter),
});

const mapDispatchToProps = (dispatch) => ({
  onTodoClick(id) {
    dispatch({ type: todoActionTypes.TOGGLE, payload: id });
  },
});

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default VisibleTodoList;
