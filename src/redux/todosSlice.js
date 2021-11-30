import { combineReducers } from "redux";
import { filterTypes, todoActionTypes } from "./actionsData";

const byId = (state = {}, action) => {
  switch (action.type) {
    case todoActionTypes.RECEIVE_TODOS:
      const nextState = { ...state };
      const { response } = action;
      response.forEach((todo) => {
        nextState[todo.id] = todo;
      });
      return nextState;
    default:
      return state;
  }
};

function switchReturnTyActionType(state, action) {
  switch (action.type) {
    case todoActionTypes.RECEIVE_TODOS:
      return action.response.map((todo) => todo.id);
    default:
      return state;
  }
}

const allIds = (state = [], action) => {
  if (action.filter !== filterTypes.All) {
    return state;
  }

  return switchReturnTyActionType(state, action);
};

const activeIds = (state = [], action) => {
  if (action.filter !== filterTypes.Active) {
    return state;
  }

  return switchReturnTyActionType(state, action);
};

const completedIds = (state = [], action) => {
  if (action.filter !== filterTypes.Completed) {
    return state;
  }

  return switchReturnTyActionType(state, action);
};

const idsByFilter = combineReducers({
  all: allIds,
  active: activeIds,
  completed: completedIds,
});

const todos = combineReducers({
  byId,
  idsByFilter,
});

export default todos;
