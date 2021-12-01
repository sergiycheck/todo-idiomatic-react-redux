import { combineReducers } from "redux";
import { filterTypes, todoActionTypes } from "./actionsData";

const createList = (filter) => {
  const ids = (state = [], action) => {
    switch (action.type) {
      case todoActionTypes.RECEIVE_TODOS:
        return filter === action.filter ? action.response.map((todo) => todo.id) : state;
      case todoActionTypes.ADD:
        return filter !== filterTypes.Completed ? [...state, action.payload.id] : state;
      //TODO: add  case todoActionTypes.TOGGLE:
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case todoActionTypes.REQUEST_TODOS:
        return true;
      case todoActionTypes.RECEIVE_TODOS:
      case todoActionTypes.FAIL_TODOS:
        return false;
      default:
        return state;
    }
  };

  const errorMessage = (state = null, action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case todoActionTypes.FAIL_TODOS:
        return action.message;
      case todoActionTypes.REQUEST_TODOS:
      case todoActionTypes.RECEIVE_TODOS:
        return null;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetching,
    errorMessage,
  });
};

export default createList;

export const getIds = (state) => state.ids;
export const getIsFetching = (state) => state.isFetching;
export const getErrorMessage = (state) => state.errorMessage;
