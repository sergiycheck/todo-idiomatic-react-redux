import { todoActionTypes, filterTypes } from "./actionTypes";

const initialState = {
  filterType: filterTypes.All,
};

export default function filterSlice(state = initialState, action) {
  switch (action.type) {
    case todoActionTypes.SET_FILTER: {
      let filterType = action.payload;
      return {
        ...state,
        filterType: filterType,
      };
    }

    default:
      return state;
  }
}
