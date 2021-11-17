import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducer";
import { loadState, saveState } from "./localStorage";

const preloadedState = loadState();

export const loggerMiddleware = (storeAPI) => (next) => (action) => {
  console.log("dispatching", action);
  let result = next(action);
  console.log("next state", storeAPI.getState());
  return result;
};
const store = createStore(rootReducer, preloadedState, applyMiddleware(loggerMiddleware));

store.subscribe(() => {
  const state = store.getState();
  saveState({
    // todos: state.todos,
    // filters: state.filters,
    ...state,
  });
});

export default store;
