import React, { useState } from "react";

// toDo-object type
type ToDoProps = {
  id: number;
  title: string;
  status: string;
};

// array of ToDoProps type
type ListProp = ToDoProps[];

// status values enum
enum STATUS {
  PENDING = "pending",
  INPROGRESS = "inprogress",
  DONE = "done",
}

// ToDo component
const ToDo: React.FC<{ toDo: ToDoProps }> = (props) => {
  return <li key={props.toDo.id}>{props.toDo.title}</li>;
};

// List component
const List: React.FC<{ list: ListProp; status: STATUS }> = (props) => {
  const filteredList: ListProp = props.list.filter(
    (todo) => todo.status === props.status
  );

  const color =
    props.status === STATUS.PENDING
      ? "red"
      : props.status === STATUS.INPROGRESS
      ? "yellow"
      : props.status === STATUS.DONE
      ? "green"
      : undefined;

  return (
    <div
      style={{
        height: "100%",
        width: "33%",
        border: "5px solid black",
      }}
    >
      <h1 style={{ background: `${color}` }}>{props.status.toUpperCase()}</h1>
      <ul>
        {filteredList.map((toDo) => (
          <ToDo toDo={toDo} />
        ))}
      </ul>
    </div>
  );
};

// Root app component
function App() {
  const changeStatus = () => {
    // onClick, take id from clicked toDo  and change status
  };

  const addTodo = () => {
    //
  };

  const removeTodo = () => {};

  // STATE
  const [toDoList, setToDoList] = useState<ListProp | []>([]);

  return (
    // Need an input component for toDo strings data
    <>
      <div style={{ display: "flex", height: "1000px", width: "100%" }}>
        <List list={toDoList} status={STATUS.PENDING} />
        <List list={toDoList} status={STATUS.INPROGRESS} />
        <List list={toDoList} status={STATUS.DONE} />
      </div>
    </>
  );
}

export default App;
