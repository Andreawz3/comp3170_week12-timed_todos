import { useContext } from "react";
import Item from "./Item";
import { TodoContext } from "../data/TodoContext";

export default function ToDoList() {
  const { todos, removeTodo, toggleSelected } = useContext(TodoContext);

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <Item
            key={todo.id}
            todo={todo}
            remove={removeTodo}
            toggleSelected={toggleSelected}
          />
        ))}
      </ul>
    </div>
  );
}
