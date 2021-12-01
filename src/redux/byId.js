const byId = (state = {}, action) => {
  if (action.payload) {
    return {
      ...state,
      ...action.payload.entities.todos,
    };
  }
  return state;
};

export default byId;

export const getTodo = (state, id) => state[id];
