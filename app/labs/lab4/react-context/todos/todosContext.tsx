"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Todo = {
  id: string;
  title: string;
};

type TodosContextType = {
  todos: Todo[];
  todo: Todo;
  setTodo: (todo: Todo) => void;
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
};

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export function TodosProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ]);

  const [todo, setTodo] = useState<Todo>({ id: "-1", title: "" });

  const addTodo = (t: Todo) => {
    const newTodo: Todo = {
      ...t,
      id: new Date().getTime().toString(),
    };
    setTodos((prev) => [...prev, newTodo]);
    setTodo({ id: "-1", title: "" });
  };

  const updateTodo = (t: Todo) => {
    setTodos((prev) => prev.map((item) => (item.id === t.id ? t : item)));
    setTodo({ id: "-1", title: "" });
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TodosContext.Provider
      value={{ todos, todo, setTodo, addTodo, updateTodo, deleteTodo }}
    >
      {children}
    </TodosContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodosContext);
  return context;
}
