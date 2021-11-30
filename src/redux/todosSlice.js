import { nanoid } from "nanoid";
import { todoActionTypes } from "./actionsData";

const nextTodoId = () => nanoid();

const initialState = {
  entities: {},
};

export default function todosSlice(state = initialState, action) {
  switch (action.type) {
    case todoActionTypes.ADD: {
      const nextTodoText = action.payload;
      const nextIdOfTodo = nextTodoId();

      return {
        ...state,
        entities: {
          ...state.entities,
          [nextIdOfTodo]: {
            id: nextIdOfTodo,
            text: nextTodoText,
            completed: false,
          },
        },
      };
    }

    case todoActionTypes.TOGGLE: {
      const targetTodoId = action.payload;
      const todoToToggle = state.entities[targetTodoId];

      return {
        ...state,
        entities: {
          ...state.entities,
          [targetTodoId]: {
            ...todoToToggle,
            completed: !todoToToggle.completed,
          },
        },
      };
    }

    default:
      return state;
  }
}
