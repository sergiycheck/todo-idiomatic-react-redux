import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducer";
import { loadState, saveState } from "./localStorage";
import { throttle } from "lodash";
import { createLogger } from "redux-logger";
import promise from "redux-promise";

const configureStore = () => {
  const preloadedState = loadState();

  const middlewares = [promise];

  if (process.env.NODE_ENV === "development") {
    middlewares.push(createLogger());
  }

  const store = createStore(rootReducer, preloadedState, applyMiddleware(...middlewares));

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
