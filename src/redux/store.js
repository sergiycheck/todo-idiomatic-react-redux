import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducer";
import { loadState, saveState } from "./localStorage";
import { throttle } from "lodash";

const preloadedState = loadState();

export const loggerMiddleware = (storeAPI) => (next) => (action) => {
  console.log("dispatching", action);
  let result = next(action);
  console.log("next state", storeAPI.getState());
  return result;
};
const store = createStore(rootReducer, preloadedState, applyMiddleware(loggerMiddleware));

const numberOfMillisecondsToSaveTodos = 1000;
store.subscribe(
  throttle(() => {
    const state = store.getState();
    saveState({
      todos: state.todos,
    });
  }, numberOfMillisecondsToSaveTodos)
);

export default store;
