import {
  createStore,
  // applyMiddleware
} from "redux";
import rootReducer from "./reducer";
import { loadState, saveState } from "./localStorage";
import { throttle } from "lodash";
import { loggerMiddleware } from "./middewares";
import { fetchTodos } from "../api/server";
import { filterTypes } from "./actionTypes";

const configureStore = () => {
  fetchTodos(filterTypes.All).then((todos) => {
    console.log("fetched todos \n", todos);
  });

  const preloadedState = loadState();

  // const store = createStore(rootReducer, preloadedState, applyMiddleware(loggerMiddleware));

  //another way to log action
  const store = createStore(rootReducer, preloadedState);
  if (process.env.NODE_ENV === "development") store.dispatch = loggerMiddleware(store);

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
