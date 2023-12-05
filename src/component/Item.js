import deleteIcon from "../delete.png";
import editIcon from "../pen.png"
import { useContext } from "react";
import { TodoContext } from "../data/TodoContext";

export default function Item(props) {
  const todo = props.todo;
  const { setEditing, getTime } = useContext(TodoContext);

  function handleDelete() {
    props.remove(todo);
  }

  function handleStatusChange() {
    props.toggleSelected(todo);
    if (todo.played) {
      todo.completedTime = getTime();
    } else {
      todo.completedTime = "";
    }
  }

  return (
    <li className="todo">
      <div className="todo_details">
        <p>
          <input
            type="checkbox"
            onChange={handleStatusChange}
            value={todo.played}
          />
          <span className="todo_item">
            {todo.played ? <del>{todo.title}</del> : todo.title}
          </span>
        </p>
      </div>
      <p>Started at: {todo.startTime}</p>
      {todo.completedTime !== "" && <p>Completed at: {todo.completedTime}</p>}
      <div className="itemBtn">
        <div onClick={() => setEditing(todo.id)}>
          <img className="edit_button" src={editIcon} alt="edit icon" /> 
        </div>
        <div onClick={handleDelete}>
          <img className="delete_button" src={deleteIcon} alt="delete icon" />
        </div>
      </div>
    </li>
  );
}
