import React, { useRef, useState } from "react";

// toDo-object type
type ToDoProps = {
  id: string;
  text: string;
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

//////////* COMPONENTS *//////////
// ToDo component
const ToDo: React.FC<{ text: string; onChangeToDoStatus: () => void }> = (
  props
) => {
  return <li onClick={props.onChangeToDoStatus}>{props.text}</li>;
};

// List component
const List: React.FC<{
  list: ListProp;
  status: STATUS;
  onChangeToDoStatus: (id: string) => void;
}> = (props) => {
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
      <h1 style={{ background: color }}>{props.status.toUpperCase()}</h1>
      <ul>
        {filteredList.map((toDo) => (
          <ToDo
            key={toDo.id}
            text={toDo.text}
            onChangeToDoStatus={props.onChangeToDoStatus.bind(null, toDo.id)}
          />
        ))}
      </ul>
    </div>
  );
};

// Input component
const NewTodo: React.FC<{ onAddToDo: (text: string) => void }> = (props) => {
  const todoTextInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredText = todoTextInputRef.current!.value;

    if (enteredText.trim().length === 0) {
      return;
    }

    props.onAddToDo(enteredText);
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="text">Enter Todo Text</label>
      <input type="text" id="text" ref={todoTextInputRef}></input>
      <button>Add Todo</button>
    </form>
  );
};

// DUMMMY DATA
// const toDoInitialDummyList: ListProp = [
//   { id: 1, text: "Task 1", status: STATUS.PENDING },
//   { id: 2, text: "Task 2", status: STATUS.DONE },
//   { id: 3, text: "Task 3", status: STATUS.INPROGRESS },
//   { id: 4, text: "Task 4", status: STATUS.PENDING },
//   { id: 5, text: "Task 5", status: STATUS.DONE },
//   { id: 6, text: "Task 6", status: STATUS.INPROGRESS },
//   { id: 7, text: "Task 7", status: STATUS.PENDING },
//   { id: 8, text: "Task 8", status: STATUS.DONE },
//   { id: 9, text: "Task 9", status: STATUS.INPROGRESS },
//   { id: 10, text: "Task 10", status: STATUS.PENDING },
//   { id: 11, text: "Task 11", status: STATUS.DONE },
//   { id: 12, text: "Task 12", status: STATUS.INPROGRESS },
//   { id: 13, text: "Task 13", status: STATUS.PENDING },
//   { id: 14, text: "Task 14", status: STATUS.DONE },
//   { id: 15, text: "Task 15", status: STATUS.INPROGRESS },
// ];

// Root app component
function App() {
  // State
  const [toDoList, setToDoList] = useState<ToDoProps[]>([]);

  // change status handler
  const changeToDoStatus = (id: string) => {
    const toDoListIndex = toDoList.findIndex((toDo) => toDo.id === id);

    const copiedToDoList: ListProp = [...toDoList];

    const existingToDo: ToDoProps = copiedToDoList[toDoListIndex];

    let status: STATUS = STATUS.PENDING;

    if (existingToDo.status === STATUS.PENDING) {
      status = STATUS.INPROGRESS;
    }
    if (existingToDo.status === STATUS.INPROGRESS) {
      status = STATUS.DONE;
    }
    if (existingToDo.status === STATUS.DONE) {
      removeToDo(existingToDo.id);
      return;
    }

    const updatedToDo: ToDoProps = {
      ...existingToDo,
      status: status,
    };

    const updatedToDoList: ListProp = copiedToDoList.filter(
      (toDo) => toDo.id !== updatedToDo.id
    );

    setToDoList([...updatedToDoList, updatedToDo]);
  };

  // add Todo handler
  const addToDo = (toDoText: string) => {
    const newToDo: ToDoProps = {
      id: new Date().toISOString(),
      text: toDoText,
      status: STATUS.PENDING,
    };

    setToDoList((prevTodos) => {
      return prevTodos.concat(newToDo);
    });
  };

  // remove toDo handler
  const removeToDo = (toDoId: string) => {
    const toDoListIndex = toDoList.findIndex((toDo) => toDo.id === toDoId);

    const copiedToDoList = [...toDoList];
    copiedToDoList.splice(toDoListIndex, 1);
    console.log(copiedToDoList);

    setToDoList(copiedToDoList);
  };

  return (
    <>
      <NewTodo onAddToDo={addToDo} />
      <div style={{ display: "flex", height: "1000px", width: "100%" }}>
        <List
          list={toDoList}
          status={STATUS.PENDING}
          onChangeToDoStatus={changeToDoStatus}
        />
        <List
          list={toDoList}
          status={STATUS.INPROGRESS}
          onChangeToDoStatus={changeToDoStatus}
        />
        <List
          list={toDoList}
          status={STATUS.DONE}
          onChangeToDoStatus={changeToDoStatus}
        />
      </div>
    </>
  );
}

export default App;
