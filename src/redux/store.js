import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducer";

export const loggerMiddleware = (storeAPI) => (next) => (action) => {
  console.log("dispatching", action);
  let result = next(action);
  console.log("next state", storeAPI.getState());
  return result;
};

const preloadedState = {
  todos: {
    entities: {
      myCustomId1: {
        id: "myCustomId1",
        text: "initial text 1",
        completed: false,
      },
    },
  },
  filters: {
    filterType: "all",
  },
};

const store = createStore(rootReducer, preloadedState, applyMiddleware(loggerMiddleware));

console.log(store.getState());

export default store;
