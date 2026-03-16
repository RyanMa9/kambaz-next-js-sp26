"use client";

import { create } from "zustand";

export type Todo = {
  id: string;
  title: string;
};

type TodoStore = {
  todos: Todo[];
  todo: Todo;
  setTodo: (todo: Todo) => void;
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [
    { id: "1", title: "Learn Zustand" },
    { id: "2", title: "Learn React" },
  ],
  todo: { id: "-1", title: "" },

  setTodo: (t: Todo) => set({ todo: t }),

  addTodo: (t: Todo) => {
    const newTodo = { ...t, id: new Date().getTime().toString() };
    set((state) => ({
      todos: [...state.todos, newTodo],
      todo: { id: "-1", title: "" },
    }));
  },

  updateTodo: (t: Todo) =>
    set((state) => ({
      todos: state.todos.map((item) => (item.id === t.id ? t : item)),
      todo: { id: "-1", title: "" },
    })),

  deleteTodo: (id: string) =>
    set((state) => ({ todos: state.todos.filter((t) => t.id !== id) })),
}));
