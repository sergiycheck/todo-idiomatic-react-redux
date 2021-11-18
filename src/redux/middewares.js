// export const loggerMiddleware = (storeAPI) => (next) => (action) => {
//   devLog("dispatching", action);
//   let result = next(action);
//   devLog("next state", storeAPI.getState());
//   return result;
// };

export function devLog(...args) {
  /* eslint-disable no-console */
  if (process.env.NODE_ENV === "development") {
    console.log(...args);
  }
  /* eslint-disable no-console */
}

export const loggerMiddleware = (store) => {
  /* eslint-disable no-console */
  const rawDispatch = store.dispatch;
  if (!console.group) {
    return rawDispatch;
  }
  return (action) => {
    console.group(action.type);
    console.log("%c prev state", "color: gray", store.getState());
    console.log("%c action", "color: blue", action);
    const returnValue = rawDispatch(action);
    console.log("%c next state", "color: green", store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
  /* eslint-disable no-console */
};
