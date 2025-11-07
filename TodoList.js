import React from "react";
import axios from "axios";

function TodoList({ todos, onUpdate }) {
  const toggleComplete = async (todo) => {
    try {
      const res = await axios.put(`http://localhost:5000/todos/${todo._id}`, {
        completed: !todo.completed,
      });
      onUpdate(res.data); // res.data must be the updated object
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      onUpdate({ _id: id, deleted: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <li
          key={todo._id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            {todo.title} - {todo.completed ? "Done" : "Pending"}
          </span>
          <div>
            <button
              className={`btn btn-sm me-2 ${todo.completed ? "btn-secondary" : "btn-success"}`}
              onClick={() => toggleComplete(todo)}
            >
              {todo.completed ? "Undo" : "Complete"}
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => deleteTodo(todo._id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
