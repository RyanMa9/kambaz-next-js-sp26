"use client";
import Link from "next/link";
import ArrayStateVariable from "./ArrayStateVariable";
import BooleanStateVariables from "./BooleanStateVariables";
import ClickEvent from "./ClickEvent";
import Counter from "./Counter";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import StringStateVariables from "./StringStateVariables";
import store from "./store";
import { Provider } from "react-redux";
import ReduxExamples from "./redux/page";

export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }

  console.log("Hello World!");
  return (
    <Provider store={store}>
      <div id="wd-lab4">
        <h3>Lab 4</h3>

        <ClickEvent />
        <PassingDataOnEvent />
        <PassingFunctions theFunction={sayHello} />
        <Counter />
        <BooleanStateVariables />
        <StringStateVariables />
        <DateStateVariable />
        <ObjectStateVariable />
        <ArrayStateVariable />
        <ParentStateComponent />
        <h3>React Examples</h3>
        <Link href="./lab4/redux">Redux Examples</Link>

        <h3>React Context Examples</h3>
        <Link href="./lab4/react-context">React Context Examples</Link>
        <h3>Zustand Examples</h3>
        <Link href="./lab4/zustand">Zustand Examples</Link>
      </div>
    </Provider>
  );
}
