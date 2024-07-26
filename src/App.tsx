import { useState } from "react";

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

  if (toDoList.length === 0) {
    setToDoList([
      { id: 0, title: "Initial title string", status: STATUS.PENDING },
    ]);
  }
  console.log(toDoList);

  const pendingToDoList: ListProp | [] = toDoList.filter((toDo) => {
    toDo.status === STATUS.PENDING;
  });
  console.log(pendingToDoList);

  // Need an input for strings
  return (
    <>
      <div></div>
      <div style={{ display: "flex", height: "1000px", width: "100%" }}>
        <div
          style={{
            height: "100%",
            width: "33%",
            border: "5px solid black",
          }}
        >
          <h1 style={{ background: "red" }}>PENDING</h1>
        </div>
        <div
          style={{
            height: "100%",
            width: "33%",
            borderTop: "5px solid black",
            borderBottom: "5px solid black",
          }}
        >
          <h1 style={{ background: "yellow" }}>IN PROGRESS</h1>
        </div>
        <div
          style={{
            height: "100%",
            width: "33%",
            border: "5px solid black",
          }}
        >
          <h1 style={{ background: "green" }}>DONE</h1>
        </div>
      </div>
    </>
  );
}

export default App;
