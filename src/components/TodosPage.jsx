import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { apiService } from "../services/api";
import TodoItem from "./TodoItem";

const TodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const { user, token, logout } = useAuth();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await apiService.getTodos(token);
      setTodos(data.todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newTitle.trim()) return;

    try {
      const data = await apiService.createTodo(token, newTitle, newDescription);
      setTodos([data.todo, ...todos]);
      setNewTitle("");
      setNewDescription("");
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      const data = await apiService.updateTodo(token, id, updates);
      setTodos(todos.map((t) => (t._id === id ? data.todo : t)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this todo?")) return;

    try {
      await apiService.deleteTodo(token, id);
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="todos-container">
      <header className="todos-header">
        <h1>My Todos</h1>
        <div className="user-info">
          <span>Welcome, {user?.username}!</span>
          <button onClick={logout} className="btn-logout">
            Logout
          </button>
        </div>
      </header>

      <div className="todo-form">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="What needs to be done?"
        />
        <textarea
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Add description (optional)"
        />
        <button onClick={handleCreate} className="btn-primary">
          Add Todo
        </button>
      </div>

      <div className="todos-stats">
        <span>Total: {todos.length}</span>
        <span>Completed: {todos.filter((t) => t.completed).length}</span>
        <span>Active: {todos.filter((t) => !t.completed).length}</span>
      </div>

      {loading ? (
        <div className="loading">Loading todos...</div>
      ) : todos.length === 0 ? (
        <div className="empty-state">
          <p>No todos yet. Create one to get started!</p>
        </div>
      ) : (
        <div className="todos-list">
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodosPage;
