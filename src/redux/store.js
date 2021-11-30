import {
  createStore,
  // applyMiddleware
} from "redux";
import rootReducer from "./reducer";
import { loadState, saveState } from "./localStorage";
import { throttle } from "lodash";
import { loggerMiddleware } from "./middewares";

// implementing currying pattern
const promiseMiddeware = (store) => (next) => (action) => {
  if (typeof action.then === "function") {
    return action.then(next);
  }
  return next(action);
};

const wrapDispatchWithMiddlewares = (store, middlewares) => {
  middlewares
    .slice()
    .reverse()
    .forEach((middleware) => {
      store.dispatch = middleware(store)(store.dispatch);
    });
};

const configureStore = () => {
  const preloadedState = loadState();

  // const store = createStore(rootReducer, preloadedState, applyMiddleware(loggerMiddleware));

  //another way to log action
  const store = createStore(rootReducer, preloadedState);
  const middlewares = [promiseMiddeware];

  if (process.env.NODE_ENV === "development") {
    middlewares.push(loggerMiddleware);
  }

  wrapDispatchWithMiddlewares(store, middlewares);

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
