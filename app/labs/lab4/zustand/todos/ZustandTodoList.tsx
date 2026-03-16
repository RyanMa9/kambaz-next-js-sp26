"use client";

import React from "react";
import { useTodoStore, Todo } from "./useTodoStore";
import { FormControl, Button, ListGroup, ListGroupItem } from "react-bootstrap";

export default function ZustandTodoList() {
  const { todos, todo, setTodo, addTodo, updateTodo, deleteTodo } =
    useTodoStore();

  return (
    <div id="wd-zustand-todo-list">
      <h2>Zustand Todo List</h2>

      <ListGroup>
        <ListGroupItem className="d-flex gap-2 align-items-center flex-nowrap">
          <FormControl
            className="flex-grow-1"
            style={{ minWidth: 120 }}
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            placeholder="New todo"
          />
          <div className="d-flex gap-2 flex-shrink-0">
            <Button
              variant="warning"
              onClick={() => todo.id !== "-1" && updateTodo(todo)}
            >
              Update
            </Button>
            <Button variant="success" onClick={() => addTodo(todo)}>
              Add
            </Button>
          </div>
        </ListGroupItem>

        {todos.map((t) => (
          <ListGroupItem
            key={t.id}
            className="d-flex gap-2 align-items-center flex-wrap"
          >
            <span className="flex-grow-1">{t.title}</span>
            <Button variant="primary" onClick={() => setTodo(t)}>
              Edit
            </Button>
            <Button variant="danger" onClick={() => deleteTodo(t.id)}>
              Delete
            </Button>
          </ListGroupItem>
        ))}
      </ListGroup>

      <hr />
    </div>
  );
}
