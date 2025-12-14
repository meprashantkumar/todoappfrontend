import { API_URL } from "../config/constants";

export const apiService = {
  // Auth
  async register(username, email, password) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    return await res.json();
  },

  async login(email, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  },

  async getMe(token) {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },

  // Todos
  async getTodos(token) {
    const res = await fetch(`${API_URL}/todos`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },

  async createTodo(token, title, description) {
    const res = await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });
    return await res.json();
  },

  async updateTodo(token, id, updates) {
    const res = await fetch(`${API_URL}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });
    return await res.json();
  },

  async deleteTodo(token, id) {
    const res = await fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },
};
