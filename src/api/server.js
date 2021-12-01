import { nanoid } from "nanoid";

import { filterTypes } from "../redux/actionsData";

const fakeDatabase = {
  todos: [
    {
      id: nanoid(),
      text: "first todo text",
      completed: true,
    },
    {
      id: nanoid(),
      text: "second completed todo",
      completed: true,
    },
    {
      id: nanoid(),
      text: "second todo text",
      completed: false,
    },
    {
      id: nanoid(),
      text: "let's go",
      completed: false,
    },
  ],
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchTodos = async (filter) => {
  await delay(5000);
  switch (filter) {
    case filterTypes.All:
      return fakeDatabase.todos;
    case filterTypes.Active:
      return fakeDatabase.todos.filter((t) => !t.completed);
    case filterTypes.Completed:
      return fakeDatabase.todos.filter((t) => t.completed);
    default:
      throw new Error(`Unknown filter ${filter}`);
  }
};
