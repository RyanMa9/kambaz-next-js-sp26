"use client";
import { CounterProvider } from "./counter/context";
import CounterContext from "./counter/index";
import ReactContextToDoList from "./todos/ReactContextToDoList";
import { TodosProvider } from "./todos/todosContext";
export default function ReactContextExamples() {
  return (
    <div>
      <h1>React Context Examples</h1>
      <CounterProvider>
        <CounterContext />
      </CounterProvider>
      <TodosProvider>
        <ReactContextToDoList />
      </TodosProvider>
    </div>
  );
}
