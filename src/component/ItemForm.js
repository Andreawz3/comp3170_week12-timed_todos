import { useContext, useState } from "react";
import { nanoid } from "nanoid";
import { TodoContext } from "../data/TodoContext";

export default function ItemForm() {
  const { addToDo, editing, todos, updateTodo, getTime } = useContext(TodoContext);

  let initialData = {
    title: "",
    task_done: false,
    startTime: "",
    completedTime: "",
  };

  if (editing !== "new") {
    initialData = todos.find((a) => {
      return a.id === editing;
    });
  }

  const [task, setTask] = useState(initialData);

  function handleSubmit(e) {
    e.preventDefault();
    let inputText = document.getElementById("inputText");

    if (inputText.value === "") {
      return;
    } else {
      if (editing === "new") {
        addToDo({
          ...task,
          task_done: false,
          id: nanoid(), 
          startTime: getTime(),
        });
      } else {
        updateTodo(task);
      }
      setTask("");
    }
  }

  function handleInput(e, field) {
    setTask({ ...task, [field]: e.target.value });
  }

  return (
    <div className="edit">
      <form onSubmit={handleSubmit}>
        <label>
          <input
            id="inputText"
            type="text"
            onChange={(e) => handleInput(e, "title")}
            value={task.title}
            placeholder="Add new task..."
          />
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
