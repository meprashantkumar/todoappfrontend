import React, { useState } from "react";

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");

  const handleUpdate = async () => {
    await onUpdate(todo._id, { title, description, completed: todo.completed });
    setIsEditing(false);
  };

  const handleToggle = async () => {
    await onUpdate(todo._id, { completed: !todo.completed });
  };

  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      {isEditing ? (
        <div className="todo-edit">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <div className="todo-actions">
            <button onClick={handleUpdate} className="btn-success">
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="todo-content">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggle}
              className="todo-checkbox"
            />
            <div className="todo-text">
              <h3>{todo.title}</h3>
              {todo.description && <p>{todo.description}</p>}
            </div>
          </div>
          <div className="todo-actions">
            <button onClick={() => setIsEditing(true)} className="btn-edit">
              Edit
            </button>
            <button onClick={() => onDelete(todo._id)} className="btn-delete">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
