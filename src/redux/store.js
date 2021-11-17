import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducer";
import { loadState, saveState } from "./localStorage";
import { throttle } from "lodash";
import { loggerMiddleware } from "./middewares";

const configureStore = () => {
  const preloadedState = loadState();

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

  return store;
};

export default configureStore;
