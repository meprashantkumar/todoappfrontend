import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const Register = ({ onSwitchToLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    const result = await register(username, email, password);

    if (!result.success) {
      setError(result.error || "Registration failed");
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Register</h1>
        <div>
          {error && <div className="error">{error}</div>}

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="btn-primary"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>

        <p className="auth-switch">
          Already have an account?{" "}
          <button onClick={onSwitchToLogin} className="btn-link">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
