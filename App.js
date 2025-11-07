import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./components/TodoList";
import AddTodo from "./components/Addtodo";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get("http://localhost:5000/todos");
        setTodos(res.data);
      } catch (err) {
        console.error("Error fetching todos:", err);
      }
    };
    fetchTodos();
  }, []);

  const handleAdd = (newTodo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const handleUpdate = (updatedTodo) => {
    setTodos(prevTodos => {
      if (updatedTodo.deleted) {
        return prevTodos.filter(t => t._id !== updatedTodo._id);
      } else {
        return prevTodos.map(t => t._id === updatedTodo._id ? updatedTodo : t);
      }
    });
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "All") return true;
    if (filter === "Completed") return todo.completed;
    if (filter === "Pending") return !todo.completed;
    return true;
  });

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Todo App</h1>

      <div className="mb-3">
        <button className="btn btn-outline-primary me-2" onClick={() => setFilter("All")}>All</button>
        <button className="btn btn-outline-success me-2" onClick={() => setFilter("Completed")}>Completed</button>
        <button className="btn btn-outline-warning" onClick={() => setFilter("Pending")}>Pending</button>
      </div>

      <AddTodo onAdd={handleAdd} />
      <TodoList todos={filteredTodos} onUpdate={handleUpdate} />
    </div>
  );
}

export default App;
