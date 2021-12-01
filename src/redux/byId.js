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
    case todoActionTypes.ADD:
    case todoActionTypes.TOGGLE:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };

    default:
      return state;
  }
};

export default byId;

export const getTodo = (state, id) => state[id];
