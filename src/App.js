import ToDoList from "./component/ToDoList";
import ItemForm from "./component/ItemForm";
import { useState } from "react";
import { TodoContext } from "./data/TodoContext";
import './App.css';

export default function App() {
  const [editing, setEditing] = useState(null);
  const [todos, setTodos] = useState([]);

  function addToDo(todo) {
    const updatedTodoList = [...todos, todo];
    setTodos(updatedTodoList);

    setEditing(null);
  }

  function updateTodo(todo) {
    setTodos(
      todos.map(function (td) {
        if (td.id === todo.id) {
          return todo;
        } else {
          return td;
        }
      })
    );
    setEditing(null);
  }

  function removeTodo(item) {
    const updatedTodoList = todos.filter(function (todo) {
      return todo.id !== item.id;
    });

    setTodos(updatedTodoList);
  }

  function toggleSelected(item) {
    const updatedTodoList = todos.map(function (todo) {
      if (todo.id === item.id) {
        todo.played = !todo.played;
        return todo;
      } else {
        return todo;
      }
    });
    setTodos(updatedTodoList);
  }

  function getTime() {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return hours + ":" + minutes + ":" + seconds + " " + ampm;
  }

  return (
    <div className="App">
      <TodoContext.Provider
        value={{
          editing,
          setEditing,
          updateTodo,
          todos,
          addToDo,
          removeTodo,
          toggleSelected,
          getTime
        }}
      >
        <h2 className="title">Task Manager</h2>
        {!editing ? (
          <>
            <ToDoList />
            <button className="add-btn" onClick={() => setEditing("new")}>
              ADD TASK
            </button>
          </>
        ) : (
          <ItemForm addToDo={addToDo} />
        )}
      </TodoContext.Provider>
    </div>
  );
}
