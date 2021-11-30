import { todoActionTypes } from "./actionsData";

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

export default byId;

export const getTodo = (state, id) => state[id];
